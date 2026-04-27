import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET /api/recipes/random?count=3 — returns N random recipes from the catalog
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const count = Math.min(10, Math.max(1, parseInt(searchParams.get("count") ?? "3", 10)));
  
  const userLocale = req.cookies.get("NEXT_LOCALE")?.value || "en";
  const isAm = userLocale === "am";

  try {
    const total = await db.recipe.count({ where: { generatedBy: null } });
    if (total === 0) return NextResponse.json({ results: [] });

    // Pick `count` random offsets without replacement
    const offsets = new Set<number>();
    while (offsets.size < Math.min(count, total)) {
      offsets.add(Math.floor(Math.random() * total));
    }

    const recipes = await Promise.all(
      [...offsets].map((skip) =>
        db.recipe.findFirst({
          where: { generatedBy: null },
          skip,
          orderBy: { id: "asc" },
          include: {
            recipeAm: isAm,
          },
        })
      )
    );

    const results = recipes
      .filter(Boolean)
      .map((r: any) => {
        const source = isAm && r.recipeAm ? r.recipeAm : r;
        const data = source.recipeData as Record<string, unknown> | null;
        return {
          id: r.id,
          name: source.name,
          difficulty: source.difficulty,
          prepTime: source.prepTime,
          cookTime: source.cookTime,
          servings: source.servings,
          ingredients: source.ingredients.slice(0, 4),
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
