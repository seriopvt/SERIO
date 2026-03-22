/**
 * Gemini API helper — ethiopia-first recipe generation.
 *
 * Uses raw fetch (no SDK) against the Gemini REST endpoint with
 * `responseMimeType: "application/json"` so the model is FORCED to
 * return valid, parseable JSON — zero post-processing tokens wasted.
 */

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

// ── Types ──────────────────────────────────────────────────────────────

export interface RecipePreferences {
  vegan?: boolean;
  spicy?: boolean;
  timeLimit?: number; // minutes
}

export interface GeneratedRecipe {
  title: string;
  category: string;         // e.g. "Wot", "Firfir", "Injera", "Tibs"
  region: string;           // e.g. "Amhara", "Tigray", "Oromia", "Harar"
  spiceLevel: "mild" | "medium" | "hot" | "extra-hot";
  isVegan: boolean;
  servings: number;
  time: number;             // total minutes
  ingredients: string[];
  steps: string[];
  tip?: string;             // optional chef's tip
}

// ── Internal helpers ───────────────────────────────────────────────────

function buildPrompt(
  ingredients: string[],
  prefs: RecipePreferences
): string {
  const prefLines: string[] = [];
  if (prefs.vegan) prefLines.push("- Must be fully vegan (no meat, no dairy, no eggs, no honey)");
  if (prefs.spicy) prefLines.push("- Should be spicy (berbere-forward or peppery)");
  if (prefs.timeLimit) prefLines.push(`- Total cook time must be ≤ ${prefs.timeLimit} minutes`);

  const prefBlock =
    prefLines.length > 0
      ? `\nPreferences:\n${prefLines.join("\n")}`
      : "";

  return `You are an expert Ethiopian chef. Generate ONE traditional Ethiopian recipe using ONLY ingredients that are authentic to Ethiopian cuisine.

Available ingredients: ${ingredients.join(", ")}${prefBlock}

Rules:
- The recipe MUST be a real, traditional Ethiopian dish (e.g. Doro Wat, Misir Wot, Tibs, Kitfo, Injera, Gomen, Shiro, etc.)
- You MAY assume the cook has standard Ethiopian pantry staples (berbere, niter kibbeh, mitmita, korarima, black cumin) even if not listed
- category must be one of: Wot, Tibs, Firfir, Injera, Salad, Soup, Snack, Dessert, Beverage
- region must be one of: Amhara, Tigray, Oromia, Harar, Somali, Gurage, Sidama, National
- spiceLevel must be exactly one of: mild, medium, hot, extra-hot
- steps should be clear, numbered cooking instructions (6–10 steps)
- tip is a brief cook's tip (1–2 sentences) — optional but encouraged`;
}

// ── JSON Schema passed to the model ────────────────────────────────────

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    title:       { type: "string" },
    category:    { type: "string" },
    region:      { type: "string" },
    spiceLevel:  { type: "string", enum: ["mild", "medium", "hot", "extra-hot"] },
    isVegan:     { type: "boolean" },
    servings:    { type: "number" },
    time:        { type: "number" },
    ingredients: { type: "array", items: { type: "string" } },
    steps:       { type: "array", items: { type: "string" } },
    tip:         { type: "string" },
  },
  required: ["title", "category", "region", "spiceLevel", "isVegan", "servings", "time", "ingredients", "steps"],
};

// ── Main export ────────────────────────────────────────────────────────

export async function generateEthiopianRecipe(
  ingredients: string[],
  preferences: RecipePreferences = {},
  apiKey?: string
): Promise<GeneratedRecipe> {
  const key = apiKey ?? process.env.GEMINI_API_KEY;
  if (!key) throw new Error("No Gemini API key available. Please add your API key in Account settings.");


  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: buildPrompt(ingredients, preferences) }],
      },
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA,
      temperature: 0.7,
      maxOutputTokens: 4096,
    },
  };

  const res = await fetch(`${GEMINI_API_URL}?key=${key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Gemini returned an empty response");
  }

  try {
    return JSON.parse(text) as GeneratedRecipe;
  } catch (parseErr) {
    console.error("[lib/gemini] Raw text that failed JSON.parse:", text);
    throw parseErr;
  }
}
