import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AccountClient from "./AccountClient";
import { db } from "@/lib/prisma";
import { translations } from "@/lib/i18n/translations";
import { cookies } from "next/headers";
import { getTranslation, Locale } from "@/lib/i18n/translations";

export const metadata = {
  title: translations.en["account.metaTitle"],
};

export default async function AccountPage() {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  const locale: Locale = cookieLocale === "am" || cookieLocale === "en" ? (cookieLocale as Locale) : "en";
  const t = (key: string, params?: Record<string, string>) => getTranslation(locale, key, params);

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
    console.error(translations.en["account.error.statsFetchFailed"], error);
  }

  const memberSince = t("account.memberSince");

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 relative w-full">
      <h1 className="text-[var(--text-3xl)] font-bold text-[var(--color-neutral-900)] mb-2">
        {t("account.title")}
      </h1>
      <p className="text-[var(--text-base)] text-[var(--color-neutral-700)] mb-8">
        {t("account.subtitle")}
      </p>

      <AccountClient
        user={{
          name: session.user.name || t("common.user"),
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
