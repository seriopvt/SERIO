import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AccountClient from "./AccountClient";
import { db } from "@/lib/prisma";

export const metadata = {
  title: "Account & Settings | SERIO",
};

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/");
  }

  let savedRecipesCount = 0;
  let activityLogCount = 0;
  let hasApiKey = false;
  
  try {
    const [saved, activities, userRecord] = await Promise.all([
      db.savedRecipe.count({ where: { userId: session.user.id } }),
      db.activityLog.count({ where: { userId: session.user.id } }),
      db.user.findUnique({
        where: { id: session.user.id },
        select: { geminiApiKey: true },
      }),
    ]);
    savedRecipesCount = saved;
    activityLogCount = activities;
    hasApiKey = Boolean(userRecord?.geminiApiKey);
  } catch (error) {
    console.error("Failed to fetch user stats (might be missing migration):", error);
  }

  const memberSince = "Joined Recently";

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 relative w-full">
      <h1 className="text-[var(--text-3xl)] font-bold text-[var(--color-neutral-900)] mb-2">
        My Account
      </h1>
      <p className="text-[var(--text-base)] text-[var(--color-neutral-700)] mb-8">
        Manage your profile, data, and preferences.
      </p>

      <AccountClient
        user={{
          name: session.user.name || "User",
          email: session.user.email || "",
          memberSince,
        }}
        stats={{
          savedRecipes: savedRecipesCount,
          activities: activityLogCount,
        }}
        hasApiKey={hasApiKey}
      />
    </div>
  );
}
