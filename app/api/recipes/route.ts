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

  const userLocale = req.cookies.get("NEXT_LOCALE")?.value || "en";
  const isAm = userLocale === "am";

  try {
    type PrismaWhereInput = Record<string, unknown>;
    
    // Build OR clauses for search
    const orClauses: PrismaWhereInput[] = [];

    if (q.length >= 2) {
      const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
      const ingredientTerms = [q.toLowerCase(), ...tokens];
      
      orClauses.push({ name: { contains: q, mode: "insensitive" } });
      orClauses.push({ ingredients: { hasSome: ingredientTerms } });
      
      if (isAm) {
        orClauses.push({ recipeAm: { name: { contains: q, mode: "insensitive" } } });
        orClauses.push({ recipeAm: { ingredients: { hasSome: ingredientTerms } } });
      }
    }

    const andClauses: PrismaWhereInput[] = [];
    if (orClauses.length > 0) {
      andClauses.push({ OR: orClauses });
    }

    if (difficulty) {
      andClauses.push({ difficulty: { equals: difficulty, mode: "insensitive" } });
    }

    const where: PrismaWhereInput = andClauses.length > 0 ? { AND: andClauses, generatedBy: null } : { generatedBy: null };

    const [recipes, total] = await Promise.all([
      db.recipe.findMany({
        where,
        take: limit,
        skip,
        orderBy: { createdAt: "desc" },
        // omit select to allow including relation
        include: {
          recipeAm: isAm,
        },
      }),
      db.recipe.count({ where }),
    ]);

    const results = recipes.map((r: any) => {
      // Fallback to English if Amharic translation missing
      const source = isAm && r.recipeAm ? r.recipeAm : r;
      const data = source.recipeData as Record<string, unknown> | null;
      
      // We always return the English primary `id` so client routing doesn't break
      return {
        id: r.id,
        name: source.name,
        difficulty: source.difficulty,
        prepTime: source.prepTime,
        cookTime: source.cookTime,
        servings: source.servings,
        ingredients: source.ingredients.slice(0, 5),
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
    const error = err as { message?: string; meta?: unknown };
    console.error("[GET /api/recipes] message:", error?.message);
    console.error("[GET /api/recipes] meta:", error?.meta);
    console.error("[GET /api/recipes] full:", err);
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}
