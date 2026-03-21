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

  try {
    // ── Build OR filter based on search type ──────────────────────────
    type WhereClause = {
      OR?: Array<
        | { name: { contains: string; mode: "insensitive" } }
        | { ingredients: { hasSome: string[] } }
      >;
      name?: { contains: string; mode: "insensitive" };
      ingredients?: { hasSome: string[] };
    };

    let where: WhereClause = {};

    // For ingredient search, split query into tokens so "red lentil" also
    // matches an ingredient array entry of "red lentils".
    const tokens = q
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);
    const ingredientTerms = [q.toLowerCase(), ...tokens];

    if (type === "title") {
      where = { name: { contains: q, mode: "insensitive" } };
    } else if (type === "ingredient") {
      where = { ingredients: { hasSome: ingredientTerms } };
    } else {
      // "all" — search both title and ingredients
      where = {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { ingredients: { hasSome: ingredientTerms } },
        ],
      };
    }

    const recipes = await db.recipe.findMany({
      where,
      take: 10,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        difficulty: true,
        prepTime: true,
        cookTime: true,
        servings: true,
        ingredients: true,
        recipeData: true,
        createdAt: true,
      },
    });

    // Shape the response — pull spiceLevel and isVegan from the JSON blob
    const results = recipes.map((r) => {
      const data = r.recipeData as Record<string, unknown> | null;
      return {
        id: r.id,
        name: r.name,
        difficulty: r.difficulty,
        prepTime: r.prepTime,
        cookTime: r.cookTime,
        servings: r.servings,
        ingredients: r.ingredients.slice(0, 5), // preview only
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
