import { NextRequest, NextResponse } from "next/server";
import { generateEthiopianRecipe as generateWithGemini, GeneratedRecipe, RecipePreferences } from "@/lib/gemini";
import { generateEthiopianRecipe as generateWithOpenRouter } from "@/lib/openrouter";
import { db } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { decrypt } from "@/lib/encryption";

export async function POST(req: NextRequest) {
  // ── Auth ─────────────────────────────────────────────────────────────
  const session = await auth();

  // ── Resolve user's Gemini API key ────────────────────────────────────
  // Priority: user's own DB key → server env key
  let resolvedApiKey: string | undefined;

  if (session?.user?.id) {
    try {
      const userRecord = await db.user.findUnique({
        where: { id: session.user.id },
        select: { geminiApiKey: true },
      });
      if (userRecord?.geminiApiKey) {
        resolvedApiKey = decrypt(userRecord.geminiApiKey);
      }
    } catch {
      // If decryption fails, fall through to env key
    }
  }

  // Fall back to env key if user hasn't set one
  // if (!resolvedApiKey) {
  //   resolvedApiKey = process.env.GEMINI_API_KEY;
  // }

  // If there's genuinely no key anywhere, return a friendly error
  if (!resolvedApiKey) {
    return NextResponse.json(
      {
        error: "no_api_key",
        message:
          "You haven't added a Gemini API key yet. Head to Account Settings to add yours — it only takes a second!",
      },
      { status: 403 }
    );
  }

  // ── Parse body ──────────────────────────────────────────────────────
  let body: { ingredients?: unknown; preferences?: RecipePreferences };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // ── Validate ────────────────────────────────────────────────────────
  const { ingredients, preferences } = body;

  if (
    !Array.isArray(ingredients) ||
    ingredients.length === 0 ||
    ingredients.some((i) => typeof i !== "string")
  ) {
    return NextResponse.json(
      { error: "ingredients must be a non-empty array of strings" },
      { status: 400 }
    );
  }

  // Sanitise — trim whitespace, lowercase for matching, cap at 20 items
  const cleanIngredients: string[] = (ingredients as string[])
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 20);

  if (cleanIngredients.length === 0) {
    return NextResponse.json(
      { error: "ingredients array is required and must not be empty" },
      { status: 400 }
    );
  }

  // ── 1. DB Cache Check (Similarity Search) ──────────────────────────
  try {
    const candidates = await db.recipe.findMany({
      where: {
        ingredients: {
          hasSome: cleanIngredients,
        },
      },
      take: 50,
    });

    const matchedRecipes = candidates
      .map((r: any) => {
        const dbIngs = (r.ingredients as string[]) || [];
        const intersection = cleanIngredients.filter((i) => dbIngs.includes(i));
        const union = new Set([...cleanIngredients, ...dbIngs]);
        const similarity = intersection.length / union.size;
        return { ...r, similarity };
      })
      .filter((r) => r.similarity >= 0.5)
      .sort((a, b) => b.similarity - a.similarity);

    const bestMatch = matchedRecipes.find((r) => {
      const data = r.recipeData as any;
      if (preferences?.vegan && !data.isVegan) return false;
      if (preferences?.spicy && !["hot", "extra-hot"].includes(data.spiceLevel)) return false;
      return true;
    });

    if (bestMatch) {
      console.log(`[/api/recipes/generate] Cache Hit (Similarity: ${Math.round(bestMatch.similarity * 100)}%)`);
      return NextResponse.json(
        {
          id: bestMatch.id,
          ...(bestMatch.recipeData as any),
          hitType: "similarity_cache",
        },
        { status: 200 }
      );
    }
  } catch (err) {
    console.error("[/api/recipes/generate] DB Cache Error:", err);
  }

  // ── 2. Generate via Gemini (with user's key) ─────────────────────────
  let generatedRecipe: GeneratedRecipe;
  const rawIngredients = (ingredients as string[]).map((s) => s.trim()).filter(Boolean);

  try {
    generatedRecipe = await generateWithGemini(rawIngredients, preferences ?? {}, resolvedApiKey);
  } catch (geminiErr) {
    const errorMsg = geminiErr instanceof Error ? geminiErr.message : String(geminiErr);

    // If the key is invalid/expired, surface that specifically
    if (
      errorMsg.includes("API_KEY_INVALID") ||
      errorMsg.includes("400") ||
      errorMsg.includes("401")
    ) {
      return NextResponse.json(
        {
          error: "invalid_api_key",
          message:
            "Your Gemini API key seems to be invalid or expired. Please update it in Account Settings.",
        },
        { status: 403 }
      );
    }

    console.warn("[/api/recipes/generate] Gemini failed. Trying OpenRouter fallback...", errorMsg);

    try {
      generatedRecipe = await generateWithOpenRouter(rawIngredients, preferences ?? {}) as unknown as GeneratedRecipe;
    } catch (openRouterErr) {
      const finalMsg =
        openRouterErr instanceof Error ? openRouterErr.message : "AI generation failed";
      console.error("[/api/recipes/generate] OpenRouter fallback also failed:", finalMsg);

      if (finalMsg.includes("429") || finalMsg.includes("quota")) {
        return NextResponse.json(
          { error: "Our chef is a bit busy! Please try again in a few seconds." },
          { status: 429 }
        );
      }
      return NextResponse.json(
        { error: "Failed to generate recipe. Please try again." },
        { status: 500 }
      );
    }
  }

  // ── 3. Save to Cache ───────────────────────────────────────────────
  try {
    const savedInDb = await db.recipe.create({
      data: {
        name: generatedRecipe.title,
        ingredients: cleanIngredients,
        recipeData: generatedRecipe as any,
        nutritionalFacts: generatedRecipe.nutritionalFacts as any,
        generatedBy: session?.user?.id ?? null,
        difficulty:
          generatedRecipe.time > 60 ? "Hard" : generatedRecipe.time > 30 ? "Medium" : "Easy",
        prepTime: `${Math.round(generatedRecipe.time * 0.3)}m`,
        cookTime: `${Math.round(generatedRecipe.time * 0.7)}m`,
        servings: generatedRecipe.servings.toString(),
      },
    });

    // ── 4. Save Amharic translation to RecipeAm ────────────────────────
    const am = generatedRecipe.amharicVersion;
    try {
      await db.recipeAm.upsert({
        where:  { recipeId: savedInDb.id },
        create: {
          recipeId:        savedInDb.id,
          name:            am.title,
          recipeData:      am as any,
          ingredients:     cleanIngredients,
          generatedBy:     session?.user?.id ?? null,
          difficulty:
            am.time > 60 ? "Hard" : am.time > 30 ? "Medium" : "Easy",
          prepTime:        `${Math.round(am.time * 0.3)}m`,
          cookTime:        `${Math.round(am.time * 0.7)}m`,
          servings:        am.servings.toString(),
          nutritionalFacts: am.nutritionalFacts as any,
        },
        update: {
          name:            am.title,
          recipeData:      am as any,
          nutritionalFacts: am.nutritionalFacts as any,
        },
      });
    } catch (amErr) {
      console.error("[/api/recipes/generate] Failed to save Amharic translation:", amErr);
      // Non-fatal — the English recipe is already saved
    }

    return NextResponse.json(
      {
        id: savedInDb.id,
        ...generatedRecipe,
      },
      { status: 200 }
    );
  } catch (dbErr) {
    console.error("[/api/recipes/generate] Failed to cache generated recipe:", dbErr);
    return NextResponse.json(generatedRecipe, { status: 200 });
  }
}
