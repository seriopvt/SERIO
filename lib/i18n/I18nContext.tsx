"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Locale, getTranslation } from "./translations";
import { useRouter } from "next/navigation";

interface I18nContextType {
  locale: Locale;
  setLocale: (loc: Locale) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>("en");

  // Load from cookie on mount
  useEffect(() => {
    const match = document.cookie.match(/(^| )NEXT_LOCALE=([^;]+)/);
    if (match && (match[2] === "en" || match[2] === "am")) {
      setLocaleState(match[2] as Locale);
    }
  }, []);

  const setLocale = useCallback((loc: Locale) => {
    setLocaleState(loc);
    document.cookie = `NEXT_LOCALE=${loc}; path=/; max-age=31536000`;
    // Force a router refresh so server components / API handlers re-fetch with new cookie
    router.refresh();
  }, [router]);

  const t = useCallback((key: string, params?: Record<string, string>) => {
    return getTranslation(locale, key, params);
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
