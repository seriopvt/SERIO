import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  // 1. Authenticate
  const session = await auth();
  
  if (!session) {
    console.error("[/api/recipes/save] No session found");
    return NextResponse.json({ error: "Unauthorized - No Session" }, { status: 401 });
  }

  if (!session?.user?.id) {
    console.error("[/api/recipes/save] Session found but no user ID:", session);
    return NextResponse.json({ error: "Unauthorized - No ID" }, { status: 401 });
  }


  // 2. Parse payload
  let body: { recipeId?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { recipeId } = body;
  if (!recipeId || typeof recipeId !== "number") {
    return NextResponse.json({ error: "Valid recipeId is required" }, { status: 400 });
  }

  // 3. Save to Cookbook
  try {
    await db.savedRecipe.create({
      data: {
        userId: session.user.id,
        recipeId,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    // Prisma unique constraint error code is P2002 (meaning they already saved it)
    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "Recipe is already in your cookbook" },
        { status: 409 }
      );
    }

    console.error("[/api/recipes/save]", err);
    return NextResponse.json(
      { error: "Failed to save recipe" },
      { status: 500 }
    );
  }
}
