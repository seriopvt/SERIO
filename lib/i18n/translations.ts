export type Locale = "en" | "am";

export const translations = {
  en: {
    "nav.dashboard": "Dashboard",
    "nav.recipes": "Recipes",
    "nav.cookbook": "My Cookbook",
    "header.greeting": "Good {timeOfDay}, {name}!",
    "header.subtitle": "Ready to cook something authentic today?",
    "header.missingKey": "Missing Gemini API Key",
    "sidebar.promember": "Pro Member",
    "sidebar.setupneeded": "Setup needed",
    "sidebar.ethiopiankitchen": "Ethiopian Kitchen",
    // Common
    "lang.en": "EN",
    "lang.am": "አማ",
  },
  am: {
    "nav.dashboard": "ዳሽቦርድ",
    "nav.recipes": "የምግብ አዘገጃጀቶች",
    "nav.cookbook": "የእኔ ማብሰያ መጽሐፍ",
    "header.greeting": "እንደሚን {timeOfDay} {name}!",
    "header.subtitle": "ዛሬ ትክክለኛውን ነገር ለማብሰል ዝግጁ ነዎት?",
    "header.missingKey": "የGemini API ቁልፍ የለም",
    "sidebar.promember": "ፕሮ አባል",
    "sidebar.setupneeded": "ማዋቀር ያስፈልጋል",
    "sidebar.ethiopiankitchen": "የኢትዮጵያ ወጥ ቤት",
    // Common
    "lang.en": "EN",
    "lang.am": "አማ",
  },
};

export function getTranslation(locale: Locale, key: string, params?: Record<string, string>): string {
  let text = translations[locale]?.[key as keyof typeof translations["en"]] || translations["en"][key as keyof typeof translations["en"]] || key;
  
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, v);
    });
  }
  
  // Custom amharic timeOfDay handling if passed
  if (locale === "am" && params?.timeOfDay) {
    const timeMap: Record<string, string> = {
      "Morning": "አረፈዱ",
      "Afternoon": "ዋሉ",
      "Evening": "አመሹ"
    };
    if (timeMap[params.timeOfDay]) {
      text = text.replace(params.timeOfDay, timeMap[params.timeOfDay]);
    }
  }

  return text;
}
