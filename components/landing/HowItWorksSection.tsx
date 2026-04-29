 "use client";

import React from "react";
import { useI18n } from "@/lib/i18n/I18nContext";

interface StepCardProps {
  step: string;
  title: string;
  description: string;
}

function StepCard({ step, title, description }: StepCardProps) {
  return (
    <div className="text-center">
      <div
        className="
          w-14 h-14 rounded-full mx-auto mb-5
          bg-[var(--color-brand-primary-light)]
          text-[var(--color-brand-primary)]
          flex items-center justify-center
          text-[var(--text-lg)] font-extrabold
        "
      >
        {step}
      </div>
      <h3 className="font-bold text-[var(--text-md)] text-[var(--color-neutral-900)] mb-2">
        {title}
      </h3>
      <p className="text-[var(--text-base)] text-[var(--color-neutral-500)] leading-relaxed max-w-xs mx-auto">
        {description}
      </p>
    </div>
  );
}

export default function HowItWorksSection() {
  const { t } = useI18n();
  return (
    <section id="how-it-works" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[var(--text-sm)] font-semibold text-[var(--color-brand-primary)] uppercase tracking-wider mb-2">
            {t("landing.how.kicker")}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-neutral-900)] mb-4">
            {t("landing.how.title")}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <StepCard
            step="01"
            title={t("landing.how.step1")}
            description={t("landing.how.step1Desc")}
          />
          <StepCard
            step="02"
            title={t("landing.how.step2Alt")}
            description={t("landing.how.step2AltDesc")}
          />
          <StepCard
            step="03"
            title={t("landing.how.step3Alt")}
            description={t("landing.how.step3AltDesc")}
          />
        </div>
      </div>
    </section>
  );
}
