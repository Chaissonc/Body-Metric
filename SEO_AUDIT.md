# Sarx SEO Audit — Fix Session
**Audited:** April 26, 2026 | **Score:** 47/100 | **Target:** 70+

---

## Context for Claude Code

This is a static HTML/CSS/JS site hosted on GitHub Pages. No framework — vanilla JS with localStorage. The site has a health index calculator (homepage), a learning hub (`/learning/`), and 6 topic content pages. All files are in this repo.

**Key architectural fact:** Every `/learning/[topic]/` page serves only ~20 words of navigation shell to crawlers. All article content is JS-injected after page load. Google, Bing, and every AI crawler (GPTBot, ClaudeBot, PerplexityBot) index the raw HTML — they never see the content. This is the single biggest problem on the site.

---

## Fix Priority Order

Work top to bottom. Criticals first — they unblock everything else.

---

## CRITICAL

### 1. Convert learning card links from `div onclick` to `<a href>`
**File:** `learning/learning.js` (or wherever `renderTopics` / card HTML is generated)

The card elements use `onclick="location.href='gut-health/'"` instead of `<a href>`. Google's static HTML pass sees zero links from the learning hub to any topic page.

**Fix:** Change the card wrapper from a `<div onclick=...>` to `<a href="...">`. CSS styling stays the same.

```js
// Before (not crawlable)
`<div class="lib-card" onclick="location.href='${t.href}'">`

// After (crawlable)
`<a class="lib-card" href="${t.href}">`
// close with </a> instead of </div>
```

---

### 2. Convert tab bar navigation from `onclick` to `<a href>` sitewide
**File:** Wherever the bottom tab bar (Index / Plan / Learn) is rendered — likely a shared component or each page's HTML.

Every tab uses `<button onclick="location.href='...'">` or similar. No crawlable internal links exist between the main sections of the site.

**Fix:** Change tab items to `<a href="...">` styled as buttons. Same appearance, crawlable.

```html
<!-- Before -->
<button onclick="location.href='../healthindex/'">Index</button>

<!-- After -->
<a href="../healthindex/" class="tab-btn">Index</a>
```

---

### 3. Move H1 text to static HTML on all topic pages
**Files:** All 6 topic pages under `learning/` — `supplements/index.html`, `gut-health/index.html`, `sleep-recovery/index.html`, `hydration/index.html`, `training/index.html`, `fiber-nutrition/index.html`

Each page has `<h1 id="topic-headline"></h1>` in the HTML. The text is JS-injected. Googlebot sees an empty H1.

**Fix:** Put the headline text directly in the HTML tag. Remove the JS injection of the H1 text.

```html
<!-- Before -->
<h1 class="topic-headline" id="topic-headline"></h1>

<!-- After -->
<h1 class="topic-headline">Supplement Guide — Evidence-Ranked Picks</h1>
```

---

### 4. Convert all 6 topic page content to static HTML
**Files:** All 6 topic pages — the article content (supplement rankings, gut health protocols, etc.) is currently JS-injected.

This is the highest-leverage fix. Every content page returns ~20 words to crawlers right now.

**Fix:** Write the article content directly into the HTML as static `<article>` or `<section>` markup. These pages don't pull from a dynamic API — the content is fixed. Remove the JS that injects it and put it in the HTML instead. The JS can still handle dynamic personalization elements (e.g., protein targets based on stored body weight) but the core educational content should be static.

Structure each page like:
```html
<article>
  <h1>Supplement Guide — Evidence-Ranked Picks</h1>
  <h2>Which Supplements Are Worth Taking?</h2>
  <p>[static content here]</p>
  <!-- ... -->
</article>
```

Note: Change heading style from title-format to question-format where possible (e.g., "Which Supplements Are Worth Taking?" over "Recommended Supplements") — AI engines prioritize question-based headings.

---

### 5. Add `Organization` schema to homepage
**File:** `index.html` (homepage `<head>`)

No `Organization` entity is declared anywhere on the site. The `Article` blocks on content pages reference an author/publisher named "Sarx" but there's nothing for Google to resolve those references to. Blocks Knowledge Panel formation.

**Fix:** Add this as a new `<script type="application/ld+json">` block in the homepage `<head>`:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Sarx",
  "url": "https://sarx.app",
  "logo": "https://sarx.app/assets/logo.png",
  "description": "Free wellness calculator and evidence-based health learning hub.",
  "foundingDate": "2024",
  "sameAs": []
}
```

---

### 6. Add `datePublished` to all 6 Article schema blocks
**Files:** All 6 topic pages — each has a `<script type="application/ld+json">` with an `Article` block.

`datePublished` is a required field for Google Article rich results. Every content page is currently missing it and fails validation.

**Fix:** Add `"datePublished": "2026-04-25"` to each Article block (use actual publish date if you have it, otherwise use the `dateModified` value as a stand-in).

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "datePublished": "2026-04-25",
  "dateModified": "2026-04-25",
  ...
}
```

---

## HIGH

### 7. Rewrite `llms.txt` to proper spec format
**File:** `llms.txt` (root)

Current content is a marketing blurb. The llms.txt spec (Answer.AI / Jeremy Howard) requires a structured Markdown document with a title block, short description, and bullet-point links to key pages. LLMs that fetch the current file get ad copy instead of a site map.

**Fix:** Replace the entire file with:

```
# Sarx

> Free wellness calculator generating BMI, TDEE, and body fat percentage
> using peer-reviewed formulas (Mifflin-St Jeor, Katch-McArdle,
> Harris-Benedict). No account required. Data is never saved.

## Docs

- [Health Index Calculator](https://sarx.app/): Enter age, sex, weight, height, and activity level to receive your Health Index.
- [Supplement Guide](https://sarx.app/learning/supplements/): Evidence-ranked supplement recommendations by priority.
- [Gut Health Guide](https://sarx.app/learning/gut-health/): Microbiome-focused dietary and lifestyle recommendations.
- [Sleep & Recovery Guide](https://sarx.app/learning/sleep-recovery/): Evidence-based sleep habits ranked by impact.
- [Hydration Guide](https://sarx.app/learning/hydration/): Daily water intake targets scaled to body weight.
- [Training Guide](https://sarx.app/learning/training/): Evidence-based resistance and cardio programming.
- [Fiber & Nutrition Guide](https://sarx.app/learning/fiber-nutrition/): Daily fiber targets and food sources.
- [About Sarx](https://sarx.app/about/): Formulas used, methodology, and creator background.

## Optional

- [Sitemap](https://sarx.app/sitemap.xml)
```

---

### 8. Compress and split `favicon.png`
**File:** `assets/favicon.png` (currently 784KB)

The favicon is 803KB and is loaded on every page load. The `manifest.json` also uses this same file for both 192×192 and 512×512 PWA icons.

**Fix:**
1. Export a proper `favicon.ico` (32×32, target <5KB) or a compressed `favicon.png` at 32×32
2. Export `icon-192.webp` (192×192, target <30KB)
3. Export `icon-512.webp` (512×512, target <60KB)
4. Update all `<link rel="icon">` references in every HTML file to point to the new favicon
5. Update `manifest.json`:

```json
{
  "icons": [
    { "src": "/assets/icon-192.webp", "sizes": "192x192", "type": "image/webp", "purpose": "maskable any" },
    { "src": "/assets/icon-512.webp", "sizes": "512x512", "type": "image/webp", "purpose": "maskable any" }
  ]
}
```

---

### 9. Add `BreadcrumbList` + `ItemList` schema to `/learning/` hub
**File:** `learning/index.html` (the `<head>`)

The learning hub has zero schema markup. Add two JSON-LD blocks:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Sarx", "item": "https://sarx.app" },
    { "@type": "ListItem", "position": 2, "name": "Learn", "item": "https://sarx.app/learning/" }
  ]
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Wellness Learning Library",
  "url": "https://sarx.app/learning/",
  "numberOfItems": 6,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Supplements", "url": "https://sarx.app/learning/supplements/" },
    { "@type": "ListItem", "position": 2, "name": "Gut Health", "url": "https://sarx.app/learning/gut-health/" },
    { "@type": "ListItem", "position": 3, "name": "Sleep & Recovery", "url": "https://sarx.app/learning/sleep-recovery/" },
    { "@type": "ListItem", "position": 4, "name": "Hydration", "url": "https://sarx.app/learning/hydration/" },
    { "@type": "ListItem", "position": 5, "name": "Training", "url": "https://sarx.app/learning/training/" },
    { "@type": "ListItem", "position": 6, "name": "Fiber & Nutrition", "url": "https://sarx.app/learning/fiber-nutrition/" }
  ]
}
```

---

### 10. Compress `socialImage.png`
**File:** `assets/socialImage.png` (currently 522KB)

This OG/social preview image is referenced on every page. No functional issue but 522KB is excessive for a social image.

**Fix:** Re-export as WebP at the same dimensions. Target under 80KB. Update any hardcoded references from `.png` to `.webp`.

---

### 11. Route through Cloudflare (free)
**No files to edit — DNS change**

GitHub Pages cannot set custom response headers or override cache-control. Currently all assets are served with `max-age=600` (10 minutes), and there are zero security headers (`Strict-Transport-Security`, `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`).

**Fix:** Add Cloudflare as a proxy in front of GitHub Pages (free plan). Then:
- Set `Cache-Control: max-age=31536000` on versioned static assets (CSS, JS, images)
- Set `Cache-Control: no-cache` on HTML files
- Add security headers via Cloudflare Transform Rules

---

## MEDIUM

### 12. Change `mainEntityOfPage` type from `WebPage` to `MedicalWebPage` on all topic pages
**Files:** All 6 topic page JSON-LD Article blocks

```json
// Before
"mainEntityOfPage": { "@type": "WebPage", "@id": "https://sarx.app/learning/supplements/" }

// After
"mainEntityOfPage": { "@type": "MedicalWebPage", "@id": "https://sarx.app/learning/supplements/" }
```

---

### 13. Add meta description and sitemap entry for `/about/`
**Files:** `about/index.html`, `sitemap.xml`

`/about/` is indexable but has no `<meta name="description">` and isn't in the sitemap.

**Fix in `about/index.html`:**
```html
<meta name="description" content="Sarx uses peer-reviewed formulas — Mifflin-St Jeor, Katch-McArdle, and Harris-Benedict — to calculate BMI, TDEE, and body fat. Built by Chaisson Cook.">
```

**Fix in `sitemap.xml`:** Add:
```xml
<url>
  <loc>https://sarx.app/about/</loc>
  <lastmod>2026-04-25</lastmod>
</url>
```

---

### 14. Add complete Twitter Card meta tags everywhere
**Files:** All HTML files that have `<meta name="twitter:card">`

Currently all pages have `twitter:card` but are missing `twitter:title`, `twitter:description`, and `twitter:image:alt`.

**Fix (add to each page `<head>`):**
```html
<meta name="twitter:title" content="[same as og:title]">
<meta name="twitter:description" content="[same as og:description]">
<meta name="twitter:image:alt" content="Sarx — Free Health Index Calculator">
```

---

### 15. Remove `user-scalable=no` from viewport meta
**Files:** Every HTML file with a `<meta name="viewport">` tag

Current:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
```

This blocks pinch-to-zoom. It's a WCAG 1.4.4 violation and Google's mobile-friendliness test flags it.

**Fix:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

If specific form inputs trigger unwanted zoom on mobile, fix those individually with `font-size: 16px` on the input element — don't block zoom globally.

---

## LOW (Backlog)

### 16. Add `publisher.logo` ImageObject to all Article schema blocks
**Files:** All 6 topic page JSON-LD Article blocks

```json
"publisher": {
  "@type": "Organization",
  "name": "Sarx",
  "url": "https://sarx.app",
  "logo": {
    "@type": "ImageObject",
    "url": "https://sarx.app/assets/logo.png"
  }
}
```

---

### 17. Add `datePublished` to WebApplication schema on homepage
**File:** `index.html` — the WebApplication JSON-LD block

```json
"datePublished": "2024-01-01"
```
(Replace with actual launch date.)

---

### 18. Add `inLanguage` to all Article schema blocks
```json
"inLanguage": "en-US"
```

---

### 19. Add `purpose: maskable` to manifest icons
Already handled in fix #8 above — included in the updated `manifest.json` snippet.

---

### 20. Implement IndexNow
Generate a key at indexnow.org, place the key file at the domain root, and ping the IndexNow API (`https://api.indexnow.org/indexnow`) after each deployment to notify Bing and Yandex of content changes immediately.

---

## What's Already Correct — Don't Touch

- HTTPS and redirects (http, www → non-www, all clean single-hop 301s)
- `robots.txt` (allows all crawlers, references sitemap)
- `sitemap.xml` structure (8 URLs, all with `lastmod`)
- Canonical tags on indexed pages (all self-reference correctly)
- OG tags presence (all pages have og:title, og:description, og:image, og:url, og:type)
- BreadcrumbList on topic pages (validates clean — don't modify structure, just update the Article blocks alongside)
- `noindex` on `/healthindex/` and `/goal/` (correct — these are personalized result pages)
- Font loading strategy (`media="print" onload` pattern + preconnect)
- `llms.txt` existence (just needs content rewrite per fix #7)

---

## Score Projection After Fixes

| Fixes Applied | Estimated Score |
|---|---|
| Current | 47 / 100 |
| After Criticals only (#1–6) | ~68 / 100 |
| After Criticals + Highs (#1–11) | ~76 / 100 |
| After all fixes | ~84 / 100 |
