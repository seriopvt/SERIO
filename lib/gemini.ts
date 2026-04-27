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

export interface NutritionalFacts {
  serving_size:    string;  // e.g. "1 cup (250g)"
  calories:        number;  // kcal
  protein_g:       number;
  carbs_g:         number;
  fat_g:           number;
  fiber_g:         number;
  sugar_g:         number;
  saturated_fat_g: number;
  trans_fat_g:     number;
  cholesterol_mg:  number;
  sodium_mg:       number;
  as_displayed:    string;  // human-readable summary, e.g. "Calories: 320, Protein: 28.5g"
}

/** Full Amharic mirror of the generated recipe, stored in RecipeAm. */
export interface AmharicRecipe {
  title:           string;    // Amharic title (Ethiopic script)
  category:        string;
  region:          string;
  spiceLevel:      string;
  isVegan:         boolean;
  servings:        number;
  time:            number;
  ingredients:     string[];  // Amharic ingredient names
  steps:           string[];  // Amharic cooking steps
  tip?:            string;    // Amharic chef's tip
  nutritionalFacts: NutritionalFacts; // numbers identical; serving_size & as_displayed in Amharic
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
  nutritionalFacts: NutritionalFacts;
  amharicVersion:   AmharicRecipe;
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
- nutritionalFacts: estimated per-serving nutritional breakdown. serving_size as a human-readable English string (e.g. "1 cup (250g)"). as_displayed as a concise English summary (e.g. "Calories: 320, Protein: 28.5g, Carbs: 12.3g, Fat: 18.7g")
- amharicVersion: a COMPLETE translation of the entire recipe into Amharic (Ethiopic script). All text fields (title, category, region, spiceLevel, ingredients, steps, tip) must be in Amharic. nutritionalFacts inside amharicVersion must have the same numeric values, but serving_size and as_displayed translated into Amharic (e.g. as_displayed: "ካሎሪ: 320፣ ፕሮቲን: 28.5 ግ፣ ካርቦሃይድሬት: 12.3 ግ፣ ስብ: 18.7 ግ")`;
}

// ── JSON Schema passed to the model ────────────────────────────────────

const NUTRITIONAL_FACTS_SCHEMA = {
  type: "object",
  properties: {
    serving_size:    { type: "string" },
    calories:        { type: "number" },
    protein_g:       { type: "number" },
    carbs_g:         { type: "number" },
    fat_g:           { type: "number" },
    fiber_g:         { type: "number" },
    sugar_g:         { type: "number" },
    saturated_fat_g: { type: "number" },
    trans_fat_g:     { type: "number" },
    cholesterol_mg:  { type: "number" },
    sodium_mg:       { type: "number" },
    as_displayed:    { type: "string" },
  },
  required: [
    "serving_size", "calories", "protein_g", "carbs_g", "fat_g",
    "fiber_g", "sugar_g", "saturated_fat_g", "trans_fat_g",
    "cholesterol_mg", "sodium_mg", "as_displayed",
  ],
};

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    title:            { type: "string" },
    category:         { type: "string" },
    region:           { type: "string" },
    spiceLevel:       { type: "string", enum: ["mild", "medium", "hot", "extra-hot"] },
    isVegan:          { type: "boolean" },
    servings:         { type: "number" },
    time:             { type: "number" },
    ingredients:      { type: "array", items: { type: "string" } },
    steps:            { type: "array", items: { type: "string" } },
    tip:              { type: "string" },
    nutritionalFacts: NUTRITIONAL_FACTS_SCHEMA,
    amharicVersion: {
      type: "object",
      properties: {
        title:            { type: "string" },
        category:         { type: "string" },
        region:           { type: "string" },
        spiceLevel:       { type: "string" },
        isVegan:          { type: "boolean" },
        servings:         { type: "number" },
        time:             { type: "number" },
        ingredients:      { type: "array", items: { type: "string" } },
        steps:            { type: "array", items: { type: "string" } },
        tip:              { type: "string" },
        nutritionalFacts: NUTRITIONAL_FACTS_SCHEMA,
      },
      required: [
        "title", "category", "region", "spiceLevel", "isVegan",
        "servings", "time", "ingredients", "steps", "nutritionalFacts",
      ],
    },
  },
  required: [
    "title", "category", "region", "spiceLevel", "isVegan",
    "servings", "time", "ingredients", "steps",
    "nutritionalFacts", "amharicVersion",
  ],
};

// ── Main export ────────────────────────────────────────────────────────

export async function generateEthiopianRecipe(
  ingredients: string[],
  preferences: RecipePreferences = {},
  apiKey?: string
): Promise<GeneratedRecipe> {
  // const key = apiKey ?? process.env.GEMINI_API_KEY;
  const key = apiKey;
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
