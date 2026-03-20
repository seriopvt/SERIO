import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-[#3a2a1a] to-[#2a1e12] rounded-[var(--radius-2xl)] p-12 md:p-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(232,101,44,0.15),transparent_60%)]" />
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Ready to Start Cooking?
          </h2>
          <p className="text-[var(--text-md)] text-white/70 mb-8 max-w-md mx-auto">
            Join thousands of home cooks discovering authentic Ethiopian recipes every day.
          </p>
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
            Create Free Account
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
