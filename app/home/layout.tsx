import React from "react";
import { Sidebar, Header } from "@/components/layout";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";
import { cookies } from "next/headers";
import { getTranslation, Locale } from "@/lib/i18n/translations";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  const locale: Locale = cookieLocale === "am" || cookieLocale === "en" ? (cookieLocale as Locale) : "en";
  const t = (key: string, params?: Record<string, string>) => getTranslation(locale, key, params);

  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Derive greeting based on server time
  const hour = new Date().getHours();
  const timeOfDay =
    hour >= 5 && hour < 12
      ? "Morning"
      : hour >= 12 && hour < 17
      ? "Afternoon"
      : "Evening";

  const firstName = session.user.name?.split(" ")[0] ?? t("common.chef");

  // Check whether the user has set their Gemini API key
  // Wrapped in try/catch so the layout never crashes if the column doesn't exist yet
  let hasApiKey = false;
  try {
    if (session.user.id) {
      const userRecord = await db.user.findUnique({
        where: { id: session.user.id },
        select: { geminiApiKey: true },
      });
      hasApiKey = Boolean(userRecord?.geminiApiKey);
    }
  } catch {
    // Column may not exist yet (migration pending) — default to false
    hasApiKey = false;
  }

  return (
    <div className="flex min-h-screen bg-[var(--color-surface-page)] transition-colors duration-300">
      <Sidebar
        userName={session.user.name ?? ""}
        userEmail={session.user.email ?? ""}
        hasApiKey={hasApiKey}
      />
      <main className="flex-1 ml-[var(--sidebar-width)] bg-[var(--color-surface-page)] transition-colors duration-300">
        <Header
          timeOfDay={timeOfDay}
          name={firstName}
          hasApiKey={hasApiKey}
        />
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
