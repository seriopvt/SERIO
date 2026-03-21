import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() ?? "";
  const difficulty = searchParams.get("difficulty")?.trim() ?? "";
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(24, Math.max(1, parseInt(searchParams.get("limit") ?? "12", 10)));
  const skip = (page - 1) * limit;

  try {
    type WhereClause = {
      AND?: Array<
        | { name: { contains: string; mode: "insensitive" } }
        | { ingredients: { hasSome: string[] } }
        | { difficulty: { equals: string; mode: "insensitive" } }
      >;
      difficulty?: { equals: string; mode: "insensitive" };
    };

    const andClauses: NonNullable<WhereClause["AND"]> = [];

    if (q.length >= 2) {
      const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
      const ingredientTerms = [q.toLowerCase(), ...tokens];
      andClauses.push({
        // @ts-expect-error — Prisma OR nested in AND
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { ingredients: { hasSome: ingredientTerms } },
        ],
      });
    }

    if (difficulty) {
      andClauses.push({ difficulty: { equals: difficulty, mode: "insensitive" } });
    }

    const where = andClauses.length > 0 ? { AND: andClauses } : {};

    const [recipes, total] = await Promise.all([
      db.recipe.findMany({
        where,
        take: limit,
        skip,
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
      }),
      db.recipe.count({ where }),
    ]);

    const results = recipes.map((r) => {
      const data = r.recipeData as Record<string, unknown> | null;
      return {
        id: r.id,
        name: r.name,
        difficulty: r.difficulty,
        prepTime: r.prepTime,
        cookTime: r.cookTime,
        servings: r.servings,
        ingredients: r.ingredients.slice(0, 5),
        spiceLevel: (data?.spiceLevel as string) ?? "medium",
        isVegan: (data?.isVegan as boolean) ?? false,
        category: (data?.category as string) ?? "",
        region: (data?.region as string) ?? "",
        time: (data?.time as number) ?? null,
      };
    });

    return NextResponse.json({
      results,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("[GET /api/recipes] Error:", err);
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}
