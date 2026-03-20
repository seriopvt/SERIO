import React from "react";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
}

function TestimonialCard({ quote, name, role }: TestimonialCardProps) {
  return (
    <div
      className="
        bg-white rounded-[var(--radius-2xl)] p-6
        border border-[var(--color-neutral-100)]
        shadow-[var(--shadow-xs)]
      "
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className="text-[var(--color-warning)] fill-[var(--color-warning)]"
          />
        ))}
      </div>
      <p className="text-[var(--text-base)] text-[var(--color-neutral-600)] leading-relaxed mb-5">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-300 to-[var(--color-brand-primary)] flex items-center justify-center text-white text-[var(--text-xs)] font-semibold">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-[var(--text-base)] font-semibold text-[var(--color-neutral-900)]">
            {name}
          </p>
          <p className="text-[var(--text-xs)] text-[var(--color-neutral-400)]">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[var(--text-sm)] font-semibold text-[var(--color-brand-primary)] uppercase tracking-wider mb-2">
            Testimonials
            </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-neutral-900)] mb-4">
            Loved by Home Cooks
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <TestimonialCard
            quote="Serio helped me reconnect with my grandmother's recipes. The AI suggestions are incredibly accurate!"
            name="Meron K."
            role="Home Cook"
          />
          <TestimonialCard
            quote="I never knew I could make Doro Wat with what I already had in my pantry. This app is a game changer."
            name="Daniel A."
            role="Food Enthusiast"
          />
          <TestimonialCard
            quote="The chef's tips alone are worth it. I've learned techniques I couldn't find anywhere else online."
            name="Sara T."
            role="Pro Member"
          />
        </div>
      </div>
    </section>
  );
}
