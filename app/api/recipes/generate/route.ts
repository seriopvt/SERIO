import { NextRequest, NextResponse } from "next/server";
import { generateEthiopianRecipe as generateWithGemini, RecipePreferences } from "@/lib/gemini";
import { generateEthiopianRecipe as generateWithOpenRouter } from "@/lib/openrouter";
import { db } from "@/lib/prisma";

export async function POST(req: NextRequest) {
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
    // 1. Fetch recipes that share at least SOME ingredients
    // Broadening the pool allows us to find "near matches"
    const candidates = await db.recipe.findMany({
      where: {
        ingredients: {
          hasSome: cleanIngredients,
        },
      },
      take: 50, // Limit pool for efficiency
    });

    // 2. Score candidates using Jaccard Similarity: Intersection / Union
    // This gives us a 0-1 score where 1 is identical and 0 is completely different
    const matchedRecipes = candidates
      .map((r: any) => {
        const dbIngs = (r.ingredients as string[]) || [];
        const intersection = cleanIngredients.filter((i) => dbIngs.includes(i));
        const union = new Set([...cleanIngredients, ...dbIngs]);
        const similarity = intersection.length / union.size;

        return { ...r, similarity };
      })
      // Filter candidates that meet our base similarity threshold
      .filter((r) => r.similarity >= 0.5) // 50% match minimum
      .sort((a, b) => b.similarity - a.similarity);

    // 3. Filter the best matches by user preferences strictly
    const bestMatch = matchedRecipes.find((r) => {
      const data = r.recipeData as any;
      if (preferences?.vegan && !data.isVegan) return false;
      if (preferences?.spicy && !["hot", "extra-hot"].includes(data.spiceLevel)) return false;
      return true;
    });

    if (bestMatch) {
      console.log(`[/api/recipes/generate] Cache Hit (Similarity: ${Math.round(bestMatch.similarity * 100)}%)`);
      return NextResponse.json({
        id: bestMatch.id,
        ...(bestMatch.recipeData as any),
        hitType: "similarity_cache",
      }, { status: 200 });
    }
  } catch (err) {
    console.error("[/api/recipes/generate] DB Cache Error:", err);
    // Fallback to AI if cache fails
  }

  // ── 2. Generate Fallback ─────────────────────────────────────────────
  let generatedRecipe;
  const rawIngredients = (ingredients as string[]).map(s => s.trim()).filter(Boolean);

  try {
    // Attempt with Gemini (default)
    generatedRecipe = await generateWithGemini(rawIngredients, preferences ?? {});
  } catch (geminiErr) {
    const errorMsg = geminiErr instanceof Error ? geminiErr.message : String(geminiErr);
    console.warn("[/api/recipes/generate] Gemini failed/rate-limited. Trying OpenRouter fallback...", errorMsg);
    
    try {
      // Fallback to OpenRouter
      generatedRecipe = await generateWithOpenRouter(rawIngredients, preferences ?? {});
    } catch (openRouterErr) {
      const finalMsg = openRouterErr instanceof Error ? openRouterErr.message : "AI generation failed";
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
        difficulty: generatedRecipe.time > 60 ? "Hard" : generatedRecipe.time > 30 ? "Medium" : "Easy",
        prepTime: `${Math.round(generatedRecipe.time * 0.3)}m`,
        cookTime: `${Math.round(generatedRecipe.time * 0.7)}m`,
        servings: generatedRecipe.servings.toString(),
      }
    });
    
    return NextResponse.json({
      id: savedInDb.id,
      ...generatedRecipe,
    }, { status: 200 });
    
  } catch (dbErr) {
    console.error("[/api/recipes/generate] Failed to cache generated recipe:", dbErr);
    return NextResponse.json(generatedRecipe, { status: 200 });
  }
}
