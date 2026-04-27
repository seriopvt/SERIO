import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET /api/recipes/saved — returns current user's saved recipes
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userLocale = req.cookies.get("NEXT_LOCALE")?.value || "en";
  const isAm = userLocale === "am";

  try {
    const saved = await db.savedRecipe.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      include: {
        recipe: {
          include: {
            recipeAm: isAm,
          },
        },
      },
    });

    const results = saved.map(({ recipe }) => {
      const source = isAm && (recipe as any).recipeAm ? (recipe as any).recipeAm : recipe;
      const data = source.recipeData as Record<string, unknown> | null;
      return {
        id: recipe.id,
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

    return NextResponse.json({ results });
  } catch (err) {
    console.error("[GET /api/recipes/saved] Error:", err);
    return NextResponse.json({ error: "Failed to fetch saved recipes" }, { status: 500 });
  }
}

// DELETE /api/recipes/saved?recipeId=123 — un-save a recipe
export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const recipeIdStr = searchParams.get("recipeId");
  const recipeId = recipeIdStr ? parseInt(recipeIdStr, 10) : NaN;

  if (!recipeId || isNaN(recipeId)) {
    return NextResponse.json({ error: "Valid recipeId is required" }, { status: 400 });
  }

  try {
    await db.savedRecipe.delete({
      where: {
        userId_recipeId: {
          userId: session.user.id,
          recipeId,
        },
      },
    });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    // P2025 = record not found (already unsaved)
    if ((err as { code?: string }).code === "P2025") {
      return NextResponse.json({ error: "Recipe was not saved" }, { status: 404 });
    }
    console.error("[DELETE /api/recipes/saved] Error:", err);
    return NextResponse.json({ error: "Failed to unsave recipe" }, { status: 500 });
  }
}
