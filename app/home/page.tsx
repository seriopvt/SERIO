import {
  RecipeGenerator,
  RecipeSearch,
  SeasonalFavorites,
  QuickRecs,
  ChefSecret,
  CookingStreak,
} from "@/components/home";

export default function HomePage() {
  return (
    <div className="flex gap-6">
      {/* Left Column — Main Content */}
      <div className="flex-1 min-w-0">
        <RecipeSearch />
        <RecipeGenerator />
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
