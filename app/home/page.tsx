import {
  PantrySearch,
  SeasonalFavorites,
  QuickRecs,
  ChefSecret,
  CookingStreak,
} from "@/components/home";
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function HomePage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex gap-6">
      {/* Left Column — Main Content */}
      <div className="flex-1 min-w-0">
        <PantrySearch />
        <SeasonalFavorites />
      </div>

      {/* Right Column — Sidebar Widgets */}
      <div className="w-[260px] flex-shrink-0 flex flex-col gap-6">
        <QuickRecs />
        <ChefSecret />
        <CookingStreak days={3} goal={7} />
      </div>
    </div>
  );
}
