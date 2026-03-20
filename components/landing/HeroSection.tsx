import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-[var(--color-brand-primary-light)] text-[var(--color-brand-primary)] rounded-full px-4 py-1.5 text-[var(--text-sm)] font-semibold mb-6">
          <Flame size={14} />
          Powered by Ethiopian Culinary Tradition
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-[var(--color-neutral-900)] leading-tight mb-6 max-w-3xl mx-auto">
          Cook Authentic Ethiopian
          <span className="text-[var(--color-brand-primary)]"> Recipes</span> from Your Pantry
        </h1>

        <p className="text-[var(--text-lg)] text-[var(--color-neutral-500)] max-w-xl mx-auto mb-10 leading-relaxed">
          Enter what you have, and Serio instantly generates traditional Ethiopian recipes — personalized, authentic, and ready to cook.
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
            Start Cooking Free
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
            See How It Works
          </a>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-[var(--radius-2xl)] shadow-[var(--shadow-lg)] border border-[var(--color-neutral-100)] p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 flex items-center bg-[var(--color-neutral-50)] rounded-full px-5 py-3.5 border border-[var(--color-neutral-100)]">
                <span className="text-[var(--color-neutral-300)] text-[var(--text-base)]">
                  e.g. teff flour, berbere, garlic, onions...
                </span>
              </div>
              <div className="bg-[var(--color-brand-primary)] text-white px-6 py-3.5 rounded-full text-[var(--text-base)] font-semibold">
                Inspire Me
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-left">
              {[
                { name: "Doro Wat", time: "2h", rating: "4.8" },
                { name: "Teff Injera", time: "24h", rating: "4.7" },
                { name: "Misir Wot", time: "45m", rating: "4.8" },
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
