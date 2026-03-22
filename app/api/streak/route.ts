import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET /api/streak — returns the current streak and today's activity count
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ streak: 0, todayActive: false });
  }

  try {
    // Fetch the last 90 days of distinct active dates for this user
    const logs = await db.activityLog.findMany({
      where: { userId: session.user.id },
      orderBy: { date: "desc" },
      select: { date: true },
      take: 90,
    });

    // Deduplicate dates (normalize to YYYY-MM-DD string)
    const toKey = (d: Date) => d.toISOString().slice(0, 10);
    const dateSet = new Set(logs.map((l) => toKey(l.date)));

    const todayKey = toKey(new Date());
    const todayActive = dateSet.has(todayKey);

    // Count consecutive days ending today (or yesterday if not yet active today)
    let streak = 0;
    const cursor = new Date();
    // If not active today, start counting from yesterday
    if (!todayActive) cursor.setDate(cursor.getDate() - 1);

    while (true) {
      const key = toKey(cursor);
      if (!dateSet.has(key)) break;
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    }

    return NextResponse.json({ streak, todayActive });
  } catch (err) {
    console.error("[GET /api/streak]", err);
    return NextResponse.json({ streak: 0, todayActive: false });
  }
}
