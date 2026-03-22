import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

// POST /api/activity — log a user action (search, generate, save) for streak tracking
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let action = "interaction";
  try {
    const body = await req.json();
    if (typeof body?.action === "string") action = body.action.slice(0, 50);
  } catch {
    // ignore malformed body
  }

  try {
    // Store the date only (no time) so streak grouping is by calendar day
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    await db.activityLog.create({
      data: {
        userId: session.user.id,
        date: today,
        action,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    // Silently swallow — activity logging should never break user flows
    console.error("[POST /api/activity]", err);
    return NextResponse.json({ ok: false });
  }
}
