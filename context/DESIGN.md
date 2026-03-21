# Design System Document: The Dark Spice Editorial

## 1. Overview & Creative North Star

### The Creative North Star: "The Culinary Hearth"

This design system moves away from the sterile "SaaS dashboard" aesthetic toward a rich, editorial experience that feels as warm and layered as a slow-cooked Doro Wat. By combining deep charcoal and roasted coffee tones with the vibrant energy of Ethiopian spices (Berbere, Mitmita), we create a high-end atmosphere that prioritizes depth over lines and soul over generic components.

**Breaking the Template:**

To avoid a "boxed-in" feel, this system leverages **intentional asymmetry** and **tonal layering**. We replace traditional grids with a fluid hierarchy of nested surfaces. Large-scale typography acts as a structural anchor, while overlapping glass elements and soft gradients provide a tactile, premium quality that invites exploration.

---

## 2. Colors: Tonal Depth & Spice Accents

The palette is a transition from the cooling earth (`background: #110d0c`) to the heat of the kitchen.

### The "No-Line" Rule

**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section content. Boundaries must be defined through:

1. **Background Shifts:** e.g., A `surface-container-low` card sitting on a `surface` background.

2. **Negative Space:** Using the Spacing Scale (8 to 16 units) to create "invisible" borders.

3. **Tonal Transitions:** Subtle shifts in container brightness to denote priority.

### Surface Hierarchy & Nesting

Treat the UI as a physical stack of materials.

- **Base:** `surface` (#110d0c) – The dark, grounding earth.

- **Sectioning:** `surface-container-low` (#171210) – Subtle differentiation for large content blocks.

- **Interaction/Cards:** `surface-container-high` (#241f1c) – Elevated elements that require user focus.

- **Top-Layer/Popovers:** `surface-bright` (#312b28) – The most prominent surface level.

### The "Glass & Gradient" Rule

Floating elements (e.g., recipe overlays, navigation bars) should utilize **Glassmorphism**. Apply a semi-transparent `surface-variant` with a 20px backdrop-blur.

- **Signature Textures:** Use a subtle linear gradient from `primary` (#ff8f73) to `primary-container` (#ff7856) for high-impact buttons and hero states to simulate the natural shimmer of spice oils.

---

## 3. Typography: Editorial Authority

We utilize **Manrope** across all scales to maintain a modern, clean silhouette, relying on drastic scale shifts rather than font-family changes to create hierarchy.

- **Display (lg/md):** Reserved for "Hero" moments (e.g., Recipe Names). These are the "headlines" of our editorial layout. Use `on-surface` with tight letter-spacing (-0.02em).

- **Headline (lg/md):** Used for section titles. These provide the structure of the page.

- **Title (lg/sm):** For card headers and navigational elements.

- **Body (lg/md):** Optimized for readability in recipes and descriptions. Use `on-surface-variant` for secondary body text to reduce visual noise.

- **Label (md/sm):** Used for spice levels, prep times, and metadata.

---

## 4. Elevation & Depth: Tonal Layering

Traditional drop shadows are too "digital." We use natural ambient light.

- **The Layering Principle:** Instead of a shadow, place a `surface-container-lowest` (#000000) card inside a `surface-container-low` (#171210) area to create "inset" depth.

- **Ambient Shadows:** For floating action buttons or modal windows, use a shadow with a blur of 32px-64px at 6% opacity, tinted with `primary` (#ff8f73) to mimic warm kitchen lighting.

- **The "Ghost Border" Fallback:** If a border is required for accessibility, use `outline-variant` (#4c4744) at **15% opacity**. Never use a 100% opaque border.

- **Glassmorphism:** Use `surface-container` tiers at 80% opacity with `backdrop-filter: blur(12px)` for navigation bars to let the rich background colors bleed through.

---

## 5. Components: Bespoke Elements

### Cards & Lists

- **Forbidden:** Divider lines.

- **Execution:** Separate list items with `2` to `3` units of vertical space or a subtle `surface-container` background shift. Cards use the `md` (0.75rem) or `lg` (1rem) roundedness scale.

### Buttons

- **Primary:** Gradient of `primary` to `primary-dim`. No border. `on-primary` text.

- **Secondary:** `surface-container-highest` background with `primary` text.

- **Tertiary:** Transparent background, `primary` text, no border.

### Chips (Spice & Ingredient Tags)

- **Unselected:** `surface-container-high` background, `on-surface-variant` text.

- **Selected:** `primary-container` background, `on-primary-container` text. Use `full` roundedness for a pill-shaped, organic feel.

### Input Fields

- **States:** Background should be `surface-container-lowest`. On focus, transition the background to `surface-container-low` and add a "Ghost Border" using the `primary` color at 20% opacity.

### Featured Component: "The Spice Meter"

- A custom progress bar using a gradient from `secondary` (warm orange) to `error` (vibrant red) to indicate recipe heat levels, replacing standard "spicy" icons with a visual heat scale.

---

## 6. Do’s and Don’ts

### Do

- **DO** use varying font weights to differentiate "Recipe Title" from "Prep Time" without adding more colors.

- **DO** leave generous white space (Spacing `12` or `16`) between major content sections to let the deep colors "breathe."

- **DO** use high-quality, warm-toned food photography that complements the `surface` palette.

### Don't

- **DON'T** use pure white (#FFFFFF) for body text; use `on-surface` (#fffbff) to avoid harsh contrast that causes eye strain in dark mode.

- **DON'T** use standard Material Design elevation shadows; they feel too "app-like" and ruin the high-end editorial feel.

- **DON'T** use 1px dividers. If you feel the need for a line, increase the spacing scale instead.

- **DON'T** use high-saturation blues or greens; stay within the "Spice Palette" (Oranges, Reds, Browns).
