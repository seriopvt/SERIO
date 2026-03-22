import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET /api/tips/daily — returns a pseudo-random tip based on today's date
export async function GET() {
  try {
    const count = await db.chefTip.count();

    if (count === 0) {
      return NextResponse.json({ tip: null });
    }

    // Rotate by day-of-year so every user sees the same tip each day
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86_400_000
    );
    const skip = dayOfYear % count;

    const tip = await db.chefTip.findFirst({ skip, orderBy: { id: "asc" } });
    return NextResponse.json({ tip });
  } catch (err) {
    console.error("[GET /api/tips/daily]", err);
    return NextResponse.json({ tip: null });
  }
}
