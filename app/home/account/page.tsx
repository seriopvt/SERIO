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

  // Get some user stats
  const savedRecipesCount = await db.savedRecipe.count({
    where: { userId: session.user.id }
  });

  const activityLogCount = await db.activityLog.count({
    where: { userId: session.user.id }
  });



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
      />
    </div>
  );
}
