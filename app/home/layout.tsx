import React from "react";
import { Sidebar, Header } from "@/components/layout";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[var(--color-surface-page)]">
      <Sidebar />
      <main className="flex-1 ml-[var(--sidebar-width)]">
        <Header
          greeting="Good Morning, Abeba!"
          subtitle="Ready to cook something authentic today?"
        />
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
