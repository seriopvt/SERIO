 "use client";

import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nContext";

export default function HeroSection() {
  const { t } = useI18n();
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-[var(--color-brand-primary-light)] text-[var(--color-brand-primary)] rounded-full px-4 py-1.5 text-[var(--text-sm)] font-semibold mb-6">
          <Flame size={14} />
          {t("landing.badge.poweredBy")}
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-[var(--color-neutral-900)] leading-tight mb-6 max-w-3xl mx-auto">
          {t("landing.hero.titleA")}
          <span className="text-[var(--color-brand-primary)]"> {t("landing.hero.titleB")}</span> {t("landing.hero.titleC")}
        </h1>

        <p className="text-[var(--text-lg)] text-[var(--color-neutral-500)] max-w-xl mx-auto mb-10 leading-relaxed">
          {t("landing.hero.subtitle")}
        </p>

        <div className="flex items-center justify-center gap-4 mb-16">
          <Link
            href="/signup"
            className="
              inline-flex items-center gap-2
              bg-[var(--color-brand-primary)] text-white
              px-8 py-3.5 rounded-full
              text-[var(--text-md)] font-semibold
              hover:bg-[var(--color-brand-primary-hover)]
              transition-all shadow-[var(--shadow-brand)]
              hover:shadow-lg
            "
          >
            {t("landing.cta.startFree")}
            <ArrowRight size={18} />
          </Link>
          <a
            href="#how-it-works"
            className="
              inline-flex items-center gap-2
              bg-white text-[var(--color-neutral-700)]
              px-8 py-3.5 rounded-full
              text-[var(--text-md)] font-semibold
              border border-[var(--color-neutral-200)]
              hover:border-[var(--color-neutral-300)]
              transition-all hover:shadow-[var(--shadow-sm)]
            "
          >
            {t("landing.cta.seeHow")}
          </a>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-[var(--radius-2xl)] shadow-[var(--shadow-lg)] border border-[var(--color-neutral-100)] p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 flex items-center bg-[var(--color-neutral-50)] rounded-full px-5 py-3.5 border border-[var(--color-neutral-100)]">
                <span className="text-[var(--color-neutral-300)] text-[var(--text-base)]">
                  {t("landing.mock.placeholder")}
                </span>
              </div>
              <div className="bg-[var(--color-brand-primary)] text-white px-6 py-3.5 rounded-full text-[var(--text-base)] font-semibold">
                {t("landing.mock.inspire")}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-left">
              {[
                { name: t("landing.mock.card1.name"), time: t("landing.mock.card1.time"), rating: t("landing.mock.card1.rating") },
                { name: t("landing.mock.card2.name"), time: t("landing.mock.card2.time"), rating: t("landing.mock.card2.rating") },
                { name: t("landing.mock.card3.name"), time: t("landing.mock.card3.time"), rating: t("landing.mock.card3.rating") },
              ].map((recipe) => (
                <div
                  key={recipe.name}
                  className="bg-[var(--color-neutral-50)] rounded-[var(--radius-xl)] p-4"
                >
                  <div className="h-24 bg-gradient-to-br from-orange-100 to-orange-50 rounded-[var(--radius-lg)] mb-3" />
                  <p className="font-bold text-[var(--text-base)] text-[var(--color-neutral-900)]">
                    {recipe.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-[var(--text-xs)] text-[var(--color-neutral-400)]">
                    <span>{recipe.time}</span>
                    <span>·</span>
                    <span className="text-[var(--color-warning)]">★</span>
                    <span>{recipe.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -inset-4 bg-gradient-to-r from-orange-200/30 via-transparent to-orange-200/30 rounded-3xl blur-2xl -z-10" />
        </div>
      </div>
    </section>
  );
}
