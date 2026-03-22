import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import {
  ChefHat,
  Sparkles,
  BookOpen,
  ScanLine,
  ArrowRight,
  Star,
  Flame,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--color-surface-page)] font-[var(--font-family-sans)]">
      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-surface-card)]/80 backdrop-blur-md border-b border-[var(--color-neutral-100)]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[var(--color-brand-primary)] rounded-[var(--radius-lg)] flex items-center justify-center">
              <ChefHat size={18} strokeWidth={2.5} className="text-white" />
            </div>
            <div>
              <span className="text-[var(--text-base)] font-bold text-[var(--color-neutral-900)] leading-none">
                SERIO
              </span>
              <span className="text-[10px] text-[var(--color-neutral-600)] tracking-wider uppercase ml-1.5">
                Ethiopian Kitchen
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-[var(--text-base)] text-[var(--color-neutral-500)] hover:text-[var(--color-neutral-900)] transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-[var(--text-base)] text-[var(--color-neutral-500)] hover:text-[var(--color-neutral-900)] transition-colors"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-[var(--text-base)] text-[var(--color-neutral-500)] hover:text-[var(--color-neutral-900)] transition-colors"
            >
              Testimonials
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-[var(--text-base)] font-semibold text-[var(--color-neutral-600)] hover:text-[var(--color-neutral-900)] transition-colors px-4 py-2"
            >
              Log In
            </Link>
            <ThemeToggle />
            <Link
              href="/signup"
              className="
                inline-flex items-center gap-2
                bg-[var(--color-brand-primary)] text-white
                px-5 py-2.5 rounded-full
                text-[var(--text-base)] font-semibold
                hover:bg-[var(--color-brand-primary-hover)]
                transition-colors shadow-[var(--shadow-brand)]
              "
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[var(--color-brand-primary-light)] text-[var(--color-brand-primary)] rounded-full px-4 py-1.5 text-[var(--text-sm)] font-semibold mb-6">
            <Flame size={14} />
            Powered by Ethiopian Culinary Tradition
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-[var(--color-neutral-900)] leading-tight mb-6 max-w-3xl mx-auto">
            Cook Authentic Ethiopian
            <span className="text-[var(--color-brand-primary)]"> Recipes</span>{" "}
            from Your Pantry
          </h1>

          <p className="text-[var(--text-lg)] text-[var(--color-neutral-500)] max-w-xl mx-auto mb-10 leading-relaxed">
            Enter what you have, and Serio instantly generates traditional
            Ethiopian recipes — personalized, authentic, and ready to cook.
          </p>

          {/* CTA Buttons */}
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
                bg-[var(--color-surface-card)] text-[var(--color-neutral-700)]
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

          {/* Hero Visual — Mock Dashboard Preview */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-[var(--color-surface-card)] rounded-[var(--radius-2xl)] shadow-[var(--shadow-lg)] border border-[var(--color-neutral-100)] p-6 md:p-8">
              {/* Mock search bar */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 flex items-center bg-[var(--color-neutral-50)] rounded-full px-5 py-3.5 border border-[var(--color-neutral-100)]">
                  <span className="text-[var(--color-neutral-500)] text-[var(--text-base)]">
                    e.g. teff flour, berbere, garlic, onions...
                  </span>
                </div>
                <div className="bg-[var(--color-brand-primary)] text-white px-6 py-3.5 rounded-full text-[var(--text-base)] font-semibold">
                  Inspire Me
                </div>
              </div>

              {/* Mock recipe cards */}
              <div className="grid grid-cols-3 gap-4">
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

            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-200/30 via-transparent to-orange-200/30 rounded-3xl blur-2xl -z-10" />
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[var(--text-sm)] font-semibold text-[var(--color-brand-primary)] uppercase tracking-wider mb-2">
              Features
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-neutral-900)] mb-4">
              Everything You Need to Cook Ethiopian
            </h2>
            <p className="text-[var(--text-md)] text-[var(--color-neutral-500)] max-w-lg mx-auto">
              From pantry scanning to recipe generation — Serio has it all.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Sparkles size={24} />}
              title="AI Recipe Generator"
              description="Enter your ingredients and get authentic Ethiopian recipes generated instantly."
            />
            <FeatureCard
              icon={<ScanLine size={24} />}
              title="Pantry Scanner"
              description="Scan your pantry with your camera and we'll identify ingredients automatically."
            />
            <FeatureCard
              icon={<BookOpen size={24} />}
              title="Digital Cookbook"
              description="Save, organize, and revisit your favorite recipes in your personal cookbook."
            />
            <FeatureCard
              icon={<ChefHat size={24} />}
              title="Chef's Tips"
              description="Learn traditional cooking secrets from Ethiopian culinary masters."
            />
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[var(--text-sm)] font-semibold text-[var(--color-brand-primary)] uppercase tracking-wider mb-2">
              How It Works
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-neutral-900)] mb-4">
              Three Steps to Authentic Flavor
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              step="01"
              title="Enter Your Ingredients"
              description="Type in or scan what's in your kitchen — teff, berbere, lentils, whatever you have."
            />
            <StepCard
              step="02"
              title="Get Recipes Instantly"
              description="Our AI matches your ingredients to traditional Ethiopian dishes and generates personalized recipes."
            />
            <StepCard
              step="03"
              title="Cook & Enjoy"
              description="Follow step-by-step instructions with chef's tips to create authentic Ethiopian meals."
            />
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
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

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-[#3a2a1a] to-[#2a1e12] rounded-[var(--radius-2xl)] p-12 md:p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(232,101,44,0.15),transparent_60%)]" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Ready to Start Cooking?
            </h2>
            <p className="text-[var(--text-md)] text-white/70 mb-8 max-w-md mx-auto">
              Join thousands of home cooks discovering authentic Ethiopian
              recipes every day.
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

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-[var(--color-neutral-100)] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[var(--color-brand-primary)] rounded-md flex items-center justify-center">
              <ChefHat size={14} strokeWidth={2.5} className="text-white" />
            </div>
            <span className="text-[var(--text-base)] font-bold text-[var(--color-neutral-900)]">
              SERIO
            </span>
          </div>
          <p className="text-[var(--text-sm)] text-[var(--color-neutral-400)]">
            © 2026 Serio Ethiopian Kitchen. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ===== Sub-Components ===== */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        bg-[var(--color-surface-card)] rounded-[var(--radius-2xl)] p-6
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

function StepCard({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
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

function TestimonialCard({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role: string;
}) {
  return (
    <div
      className="
        bg-[var(--color-surface-card)] rounded-[var(--radius-2xl)] p-6
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
