 "use client";

import React from "react";
import { Sparkles, ScanLine, BookOpen, ChefHat } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nContext";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div
      className="
        bg-white rounded-[var(--radius-2xl)] p-6
        border border-[var(--color-neutral-100)]
        shadow-[var(--shadow-xs)]
        hover:shadow-[var(--shadow-md)]
        transition-shadow duration-[var(--transition-base)]
        group
      "
    >
      <div
        className="
          w-12 h-12 rounded-[var(--radius-xl)]
          bg-[var(--color-brand-primary-light)]
          text-[var(--color-brand-primary)]
          flex items-center justify-center mb-4
          group-hover:bg-[var(--color-brand-primary)]
          group-hover:text-white
          transition-colors duration-[var(--transition-base)]
        "
      >
        {icon}
      </div>
      <h3 className="font-bold text-[var(--text-md)] text-[var(--color-neutral-900)] mb-2">
        {title}
      </h3>
      <p className="text-[var(--text-base)] text-[var(--color-neutral-500)] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function FeaturesSection() {
  const { t } = useI18n();
  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[var(--text-sm)] font-semibold text-[var(--color-brand-primary)] uppercase tracking-wider mb-2">
            {t("landing.features.kicker")}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-neutral-900)] mb-4">
            {t("landing.features.title")}
          </h2>
          <p className="text-[var(--text-md)] text-[var(--color-neutral-500)] max-w-lg mx-auto">
            {t("landing.features.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<Sparkles size={24} />}
            title={t("landing.feature.aiTitle")}
            description={t("landing.feature.aiDesc")}
          />
          <FeatureCard
            icon={<ScanLine size={24} />}
            title={t("landing.feature.scanTitle")}
            description={t("landing.feature.scanDesc")}
          />
          <FeatureCard
            icon={<BookOpen size={24} />}
            title={t("landing.feature.cookbookTitle")}
            description={t("landing.feature.cookbookDesc")}
          />
          <FeatureCard
            icon={<ChefHat size={24} />}
            title={t("landing.feature.tipsTitle")}
            description={t("landing.feature.tipsDesc")}
          />
        </div>
      </div>
    </section>
  );
}
