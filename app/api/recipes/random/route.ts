import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET /api/recipes/random?count=3 — returns N random recipes from the catalog
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const count = Math.min(10, Math.max(1, parseInt(searchParams.get("count") ?? "3", 10)));

  try {
    const total = await db.recipe.count();
    if (total === 0) return NextResponse.json({ results: [] });

    // Pick `count` random offsets without replacement
    const offsets = new Set<number>();
    while (offsets.size < Math.min(count, total)) {
      offsets.add(Math.floor(Math.random() * total));
    }

    const recipes = await Promise.all(
      [...offsets].map((skip) =>
        db.recipe.findFirst({
          skip,
          orderBy: { id: "asc" },
          select: {
            id: true,
            name: true,
            difficulty: true,
            prepTime: true,
            cookTime: true,
            servings: true,
            ingredients: true,
            recipeData: true,
          },
        })
      )
    );

    const results = recipes
      .filter(Boolean)
      .map((r) => {
        const data = r!.recipeData as Record<string, unknown> | null;
        return {
          id: r!.id,
          name: r!.name,
          difficulty: r!.difficulty,
          prepTime: r!.prepTime,
          cookTime: r!.cookTime,
          servings: r!.servings,
          ingredients: r!.ingredients.slice(0, 4),
          spiceLevel: (data?.spiceLevel as string) ?? "medium",
          isVegan: (data?.isVegan as boolean) ?? false,
          category: (data?.category as string) ?? "",
          time: (data?.time as number) ?? null,
        };
      });

    return NextResponse.json({ results });
  } catch (err) {
    console.error("[GET /api/recipes/random]", err);
    return NextResponse.json({ results: [] });
  }
}
