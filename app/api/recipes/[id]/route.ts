import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const recipeId = parseInt(id, 10);

  if (!recipeId || isNaN(recipeId)) {
    return NextResponse.json({ error: "Invalid recipe ID" }, { status: 400 });
  }

  const userLocale = req.cookies.get("NEXT_LOCALE")?.value || "en";
  const isAm = userLocale === "am";

  try {
    const recipe = await db.recipe.findUnique({
      where: { id: recipeId },
      include: {
        recipeAm: isAm,
      },
    });

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    // Optional auth check for isSaved flag
    let isSaved = false;
    const session = await auth();
    if (session?.user?.id) {
      const saved = await db.savedRecipe.findUnique({
        where: {
          userId_recipeId: {
            userId: session.user.id,
            recipeId,
          },
        },
      });
      isSaved = !!saved;
    }

    const source = isAm && recipe.recipeAm ? recipe.recipeAm : recipe;
    const data = source.recipeData as Record<string, unknown> | null;

    return NextResponse.json({
      id: recipe.id,
      name: source.name,
      difficulty: source.difficulty,
      prepTime: source.prepTime,
      cookTime: source.cookTime,
      servings: source.servings,
      ingredients: source.ingredients,
      createdAt: source.createdAt,
      // Fields from recipeData JSON
      title: (data?.title as string) ?? source.name,
      category: (data?.category as string) ?? "",
      region: (data?.region as string) ?? "",
      spiceLevel: (data?.spiceLevel as string) ?? "medium",
      isVegan: (data?.isVegan as boolean) ?? false,
      time: (data?.time as number) ?? null,
      steps: (data?.steps as string[]) ?? [],
      tip: (data?.tip as string) ?? null,
      isSaved,
    });
  } catch (err) {
    console.error("[GET /api/recipes/[id]] Error:", err);
    return NextResponse.json({ error: "Failed to fetch recipe" }, { status: 500 });
  }
}
