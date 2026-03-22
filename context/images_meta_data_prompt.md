Good question — this is worth thinking through properly before you generate anything.

---

## Recipe Image Spec Guide

### 📐 Sizes & Aspect Ratios

You only need **one master image per recipe**. Next.js `<Image fill />` handles cropping to fit different containers. Here's what each surface crops to:

| Surface                   | Rendered size | Aspect ratio         |
| ------------------------- | ------------- | -------------------- |
| Catalog card header       | ~380 × 140px  | ~2.7 : 1 (wide)      |
| Recipe detail hero banner | ~900 × 280px  | ~3.2 : 1 (very wide) |
| QuickRecs thumbnail       | 44 × 44px     | 1 : 1 (square)       |
| Dashboard RecipeCard      | ~300 × 160px  | ~1.9 : 1             |

**Recommended master size: `1200 × 800px` (3:2)**

- Wide enough for the hero banner crop
- Square crop of any centered region works for thumbnails
- Not so large it becomes slow to load

**Format: `WebP`** — best compression/quality tradeoff for web. Aim for **~150–250KB** per image.

---

### 🪣 Storage: Bucket, not `/public`

Don't commit them as local assets. You have ~hundreds of recipes in the DB seed and images will grow. Use a **cloud bucket**:

| Option               | Recommendation                                                                          |
| -------------------- | --------------------------------------------------------------------------------------- |
| **Supabase Storage** | Best if you're already on Supabase (matches your Postgres) — free tier, public CDN URLs |
| **Cloudflare R2**    | Zero egress cost, fast global CDN — great for production                                |
| **Vercel Blob**      | Easiest if you deploy on Vercel, native Next.js integration                             |

Then add an `imageUrl` column to the `Recipe` model:

```prisma
imageUrl  String?  @map("image_url") @db.Text
```

Next.js `<Image>` works natively with any `https://` URL — just add the bucket hostname to `next.config.ts`:

```ts
images: {
  remotePatterns: [{ hostname: "your-bucket.supabase.co" }];
}
```

---

### 🎨 AI Generation Prompt Template

For **visual consistency**, use this as your base prompt for every recipe, just swap `[DISH NAME]`:

```
Overhead food photography of [DISH NAME], served in a traditional Ethiopian clay pot
or on freshly-made injera bread, rustic dark wooden table surface with a woven
Ethiopian mesob mat accent, warm golden side lighting, terracotta and amber color
palette, artfully scattered whole spices (berbere, cumin, cardamom) and fresh herbs,
no text, no watermarks, professional editorial food photography, sharp focus on dish,
soft bokeh background, 4K quality. [SIZE SHOULD BE `1200 × 800px`]
```

**Style anchors to keep every image consistent:**

- **Angle**: Overhead (top-down 90°) or 45° three-quarter — pick one and stick to it
- **Surface**: Dark wood + woven mat always present
- **Lighting**: Warm golden (not studio white)
- **Color palette**: Earthy — amber, terracotta, deep brown, cream — matches the app's `#e8652c` brand
- **Props**: Scattered raw spices, linen cloth, never forks/knives (stays culturally authentic)
- **No**: Text overlays, logos, watermarks, white studio backgrounds

---

### 🔧 Code changes needed

1. Add `imageUrl String?` to `prisma/schema/recipe.prisma`
2. Run `prisma migrate dev`
3. Populate via a seed script or Prisma Studio
4. Update `RecipeCatalogCard`, the detail page hero, and `QuickRecs` to use `<Image src={imageUrl} />` with a graceful fallback to the current gradient+emoji when `imageUrl` is `null`

The fallback means nothing breaks — images are purely additive.
