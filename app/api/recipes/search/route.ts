import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() ?? "";
  const type = searchParams.get("type") ?? "all"; // "title" | "ingredient" | "all"

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const userLocale = req.cookies.get("NEXT_LOCALE")?.value || "en";
  const isAm = userLocale === "am";

  try {
    // ── Build OR filter based on search type ──────────────────────────
    type PrismaWhereInput = Record<string, unknown>;
    
    const tokens = q
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);
    const ingredientTerms = [q.toLowerCase(), ...tokens];

    const orClauses: PrismaWhereInput[] = [];

    if (type === "title" || type === "all") {
      orClauses.push({ name: { contains: q, mode: "insensitive" } });
      if (isAm) {
        orClauses.push({ recipeAm: { name: { contains: q, mode: "insensitive" } } });
      }
    }
    if (type === "ingredient" || type === "all") {
      orClauses.push({ ingredients: { hasSome: ingredientTerms } });
      if (isAm) {
        orClauses.push({ recipeAm: { ingredients: { hasSome: ingredientTerms } } });
      }
    }

    const where: PrismaWhereInput = {
      OR: orClauses.length > 0 ? orClauses : undefined,
      generatedBy: null,
    };

    const recipes = await db.recipe.findMany({
      where,
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        recipeAm: isAm,
      },
    });

    // Shape the response — pull spiceLevel and isVegan from the JSON blob
    const results = recipes.map((r: any) => {
      const source = isAm && r.recipeAm ? r.recipeAm : r;
      const data = source.recipeData as Record<string, unknown> | null;
      return {
        id: r.id,
        name: source.name,
        difficulty: source.difficulty,
        prepTime: source.prepTime,
        cookTime: source.cookTime,
        servings: source.servings,
        ingredients: source.ingredients.slice(0, 5), // preview only
        spiceLevel: (data?.spiceLevel as string) ?? "medium",
        isVegan: (data?.isVegan as boolean) ?? false,
      };
    });

    return NextResponse.json({ results });
  } catch (err) {
    console.error("[/api/recipes/search] Error:", err);
    return NextResponse.json(
      { error: "Search failed. Please try again." },
      { status: 500 }
    );
  }
}
