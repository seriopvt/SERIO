import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { encrypt, decrypt } from "@/lib/encryption";

// ── GET: check whether the user has a key stored ──────────────────────────
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { geminiApiKey: true },
  });

  return NextResponse.json({ hasKey: Boolean(user?.geminiApiKey) });
}

// ── POST: save / update the user's API key (encrypted) ────────────────────
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { apiKey?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { apiKey } = body;
  if (!apiKey || typeof apiKey !== "string" || apiKey.trim().length === 0) {
    return NextResponse.json({ error: "apiKey is required" }, { status: 400 });
  }

  const trimmed = apiKey.trim();

  // Basic sanity check — Gemini keys start with "AIza"
  if (!trimmed.startsWith("AIza")) {
    return NextResponse.json(
      { error: "That doesn't look like a valid Gemini API key. It should start with 'AIza'." },
      { status: 422 }
    );
  }

  const encrypted = encrypt(trimmed);

  await db.user.update({
    where: { id: session.user.id },
    data: { geminiApiKey: encrypted },
  });

  return NextResponse.json({ success: true });
}

// ── DELETE: remove the user's API key ─────────────────────────────────────
export async function DELETE() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await db.user.update({
    where: { id: session.user.id },
    data: { geminiApiKey: null },
  });

  return NextResponse.json({ success: true });
}

// ── Internal helper: retrieve and decrypt for use in other server routes ──
export async function getUserGeminiApiKey(userId: string): Promise<string | null> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { geminiApiKey: true },
  });
  if (!user?.geminiApiKey) return null;
  try {
    return decrypt(user.geminiApiKey);
  } catch {
    return null;
  }
}
