import Link from "next/link";
import { Home, ChefHat, UtensilsCrossed } from "lucide-react";
import { cookies } from "next/headers";
import { getTranslation, Locale } from "@/lib/i18n/translations";

export default async function NotFound() {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  const locale: Locale = cookieLocale === "am" || cookieLocale === "en" ? (cookieLocale as Locale) : "en";
  const t = (key: string, params?: Record<string, string>) => getTranslation(locale, key, params);

  return (
    <div
      className="
        min-h-screen
        bg-[var(--color-surface-page)]
        flex items-center justify-center
        px-6
      "
    >
      <div className="text-center max-w-md">
        {/* Decorative icon cluster */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div
            className="
              w-16 h-16 rounded-[var(--radius-2xl)]
              bg-[var(--color-brand-primary-light)]
              flex items-center justify-center
              rotate-[-8deg]
            "
          >
            <UtensilsCrossed size={28} className="text-[var(--color-brand-primary)]" />
          </div>
          <div
            className="
              w-20 h-20 rounded-[var(--radius-2xl)]
              bg-[var(--color-brand-primary)]
              flex items-center justify-center
              shadow-[var(--shadow-brand)]
            "
          >
            <ChefHat size={36} className="text-white" />
          </div>
          <div
            className="
              w-16 h-16 rounded-[var(--radius-2xl)]
              bg-[var(--color-brand-primary-light)]
              flex items-center justify-center
              rotate-[8deg]
            "
          >
            <UtensilsCrossed size={28} className="text-[var(--color-brand-primary)]" />
          </div>
        </div>

        {/* 404 number */}
        <p
          className="
            text-[6rem] font-extrabold leading-none
            text-[var(--color-neutral-100)]
            select-none mb-4
          "
          aria-hidden="true"
        >
          404
        </p>

        {/* Heading */}
        <h1
          className="
            text-[var(--text-2xl)] font-bold
            text-[var(--color-neutral-900)]
            mb-3
          "
        >
          {t("notFound.title")}
        </h1>

        {/* Subtext */}
        <p
          className="
            text-[var(--text-base)]
            text-[var(--color-neutral-500)]
            leading-[var(--leading-relaxed)]
            mb-8
          "
        >
          {t("notFound.subtitle")}
        </p>

        {/* CTA */}
        <Link
          href="/home"
          className="
            inline-flex items-center gap-2
            bg-[var(--color-brand-primary)]
            hover:bg-[var(--color-brand-primary-hover)]
            text-white
            text-[var(--text-base)] font-semibold
            px-6 py-3 rounded-[var(--radius-xl)]
            shadow-[var(--shadow-brand)]
            transition-all duration-[var(--transition-base)]
            hover:shadow-lg hover:-translate-y-0.5
          "
        >
          <Home size={16} />
          {t("notFound.cta")}
        </Link>

        {/* Decorative dots */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="rounded-full bg-[var(--color-neutral-200)]"
              style={{
                width: i === 2 ? 10 : 6,
                height: i === 2 ? 10 : 6,
                opacity: i === 2 ? 1 : 0.5,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
