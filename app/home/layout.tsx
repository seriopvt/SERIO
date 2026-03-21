import React from "react";
import { Sidebar, Header } from "@/components/layout";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Derive greeting based on server time
  const hour = new Date().getHours(); // UTC hours (good enough for greeting)
  const timeOfDay =
    hour >= 5 && hour < 12
      ? "Morning"
      : hour >= 12 && hour < 17
      ? "Afternoon"
      : hour >= 17 && hour < 21
      ? "Evening"
      : "Night";

  const firstName = session.user.name?.split(" ")[0] ?? "Chef";

  return (
    <div className="flex min-h-screen bg-[var(--color-surface-page)]">
      <Sidebar
        userName={session.user.name ?? ""}
        userEmail={session.user.email ?? ""}
      />
      <main className="flex-1 ml-[var(--sidebar-width)]">
        <Header
          greeting={`Good ${timeOfDay}, ${firstName}!`}
          subtitle="Ready to cook something authentic today?"
        />
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
