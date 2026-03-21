/**
 * OpenRouter API helper — ethiopia-first recipe generation.
 * Swappable with gemini.ts.
 */

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

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
- tip is a brief cook's tip (1–2 sentences) — optional but encouraged

Return the recipe as a valid JSON object matching this schema:
{
  "title": "string",
  "category": "string",
  "region": "string",
  "spiceLevel": "mild | medium | hot | extra-hot",
  "isVegan": boolean,
  "servings": number,
  "time": number,
  "ingredients": ["string"],
  "steps": ["string"],
  "tip": "string"
}`;
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
  preferences: RecipePreferences = {}
): Promise<GeneratedRecipe> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY environment variable is not set");

  const body = {
    // google/gemini-2.0-flash-exp:free or openrouter/free are good choices
    // model: "google/gemini-2.0-flash-exp:free",
    model: "openrouter/free",
    messages: [
      {
        role: "user",
        content: buildPrompt(ingredients, preferences),
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 4096,
  };

  const res = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": "http://localhost:3000", // Required for free models
      "X-Title": "SERIO Ethiopia Recipe App",      // Required for free models
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const text: string = data?.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error("OpenRouter returned an empty response");
  }

  try {
    return JSON.parse(text) as GeneratedRecipe;
  } catch (parseErr) {
    console.error("[lib/openrouter] Raw text that failed JSON.parse:", text);
    throw parseErr;
  }
}
