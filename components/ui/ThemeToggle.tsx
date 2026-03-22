"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useTheme } from "@/app/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const trackRef = useRef<HTMLButtonElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const sunRef = useRef<SVGSVGElement>(null);
  const moonRef = useRef<SVGSVGElement>(null);

  // Run animation whenever theme changes
  useEffect(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    const sun = sunRef.current;
    const moon = moonRef.current;
    if (!track || !thumb || !sun || !moon) return;

    const tl = gsap.timeline({ defaults: { ease: "back.out(1.7)", duration: 0.45 } });

    if (isDark) {
      // Slide thumb to the right
      tl.to(thumb, { x: 22, backgroundColor: "#241f1c" })
        // Fade + rotate sun out
        .to(sun, { opacity: 0, rotation: 90, scale: 0.4, duration: 0.25 }, "<")
        // Fade + rotate moon in
        .fromTo(
          moon,
          { opacity: 0, rotation: -90, scale: 0.4 },
          { opacity: 1, rotation: 0, scale: 1, duration: 0.35 },
          "-=0.1"
        )
        // Track background
        .to(track, { backgroundColor: "#2a2522" }, "<0.05");
    } else {
      // Slide thumb back to left
      tl.to(thumb, { x: 0, backgroundColor: "#ffffff" })
        // Moon out
        .to(moon, { opacity: 0, rotation: 90, scale: 0.4, duration: 0.25 }, "<")
        // Sun in
        .fromTo(
          sun,
          { opacity: 0, rotation: -90, scale: 0.4 },
          { opacity: 1, rotation: 0, scale: 1, duration: 0.35 },
          "-=0.1"
        )
        // Track background
        .to(track, { backgroundColor: "#e8652c22" }, "<0.05");
    }
  }, [isDark]);

  return (
    <button
      ref={trackRef}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        backgroundColor: isDark ? "#2a2522" : "rgba(232,101,44,0.13)",
      }}
      className="
        relative flex items-center
        w-[52px] h-[30px]
        rounded-full
        p-[4px]
        transition-colors
        cursor-pointer
        border border-transparent
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--color-brand-primary)]
        flex-shrink-0
      "
    >
      {/* Thumb */}
      <span
        ref={thumbRef}
        style={{ backgroundColor: isDark ? "#241f1c" : "#ffffff" }}
        className="
          relative
          w-[22px] h-[22px]
          rounded-full
          flex items-center justify-center
          shadow-sm
          flex-shrink-0
          overflow-hidden
        "
      >
        {/* Sun icon */}
        <svg
          ref={sunRef}
          style={{ opacity: isDark ? 0 : 1 }}
          className="absolute inset-0 w-full h-full p-[5px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#e8652c"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="22" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="2" y1="12" x2="4" y2="12" />
          <line x1="20" y1="12" x2="22" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>

        {/* Moon icon */}
        <svg
          ref={moonRef}
          style={{ opacity: isDark ? 1 : 0 }}
          className="absolute inset-0 w-full h-full p-[5px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ff8f73"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
    </button>
  );
}
