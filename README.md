# Nutriome Labs — Interactive Product Presentation

A full-screen, animated business and scientific presentation of the Nutriome Labs range, for pharmacists, healthcare professionals, sales representatives and partners. It is built with React, TypeScript, Vite, Tailwind CSS v4 and Motion, and deploys to Vercel as a static site.

Typography: Fraunces (headlines) and Plus Jakarta Sans (text), chosen for legibility on projectors. Inside the slide canvas, small text sizes are enlarged through CSS variables (`.slide-canvas` in `src/styles/index.css`).

French is the default language. English is available from the language switch or with `?lang=en`.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build in dist/
npm run preview    # serve dist/ locally
npm run lint
```

## Routes

| URL | What it shows |
| --- | --- |
| `/presentation` | The full deck (65 slides, including the internal validation appendix) |
| `/presentation?slide=14` | Opens directly on slide 14 (1-based). Every slide can be shared this way. |
| `/products/bio3mag`, `/products/coenzyme-q10`, `/products/bio-berberine`, `/products/biodigest`, `/products/bio-d3k2`, `/products/biogrippal`, `/products/biotenseur` | One product's section as a standalone deck. The QR codes point here. |
| `/products/bioq10`, `/products/berberine`, `/products/biod3k2` | The slugs used on nutriome.tn. They redirect to the canonical slug. |
| `/print` · `/print?product=bio3mag` · `?auto=1` | Print/PDF view: one slide per landscape page. `auto=1` opens the print dialog. |

Add `&lang=en` to any URL to open it in English.

`vercel.json` rewrites every non-asset path to `index.html`, so all routes work on direct access and on refresh.

## Presenter controls

| Action | Keyboard | Other |
| --- | --- | --- |
| Next step or slide | → · Space · PageDown | Swipe left, or the ▶ button |
| Previous | ← · PageUp | Swipe right |
| First / last slide | Home / End | |
| Fullscreen | F | ⛶ button |
| Overview grid (jump to any slide) | G or O | ▦ button |
| Presenter notes | N | Notes button |
| Autoplay on / off | P | ▷ / ❚❚ button (8 s per step, configurable) |
| Copy a link to the current slide | | 🔗 button |
| Export to PDF | | ⤓ button (opens `/print?auto=1`) |

Scientific diagrams reveal step by step. "Next" moves through a slide's steps before going to the next slide. The dots under the slide counter show the current step.

The controls fade out in fullscreen or during autoplay after about 3 s without activity.

### Layout modes
- **Canvas** (desktop, conference screens, smart TVs, landscape tablets): every slide is laid out at 1600×900 (16:9) and scaled to fit the screen. Slides look the same on a laptop and on a 4K TV.
- **Flow** (phones and portrait tablets): slides reflow to a single column and scroll vertically, so text stays readable.

Both modes use the same components. Slides use container-query variants (`@4xl:`), so the layout follows the size of the slide, not the size of the window.

## PDF export

Click the PDF button, or open `/print`, then choose **Save as PDF** with margins set to **None** and background graphics turned on.

This was tested with headless Chrome against the production build:
- the full deck exported as one page per slide (65 pages) at 1600×900 px (16:9), one slide per page
- `/print?product=bio3mag&lang=en` exported as 8 pages

In print mode every progressive diagram is shown fully revealed, with no animation.

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer \
  --virtual-time-budget=15000 --print-to-pdf=deck.pdf "http://localhost:4173/print?lang=fr"
```

## Project structure

```
src/
  data/                 ← ALL content lives here (edit these, not the components)
    products.ts         product registry: composition, mechanisms, usage, precautions, validation notes
    references.ts       bibliography (DOI / URL), cited by id
    diagrams.ts         step captions + scope (general biology / preclinical) for each diagram
    presentation.ts     deck order, presenter notes, config flags (autoplay, validation badges/appendix)
    company.ts          corporate content and contact details
    types.ts            Product / Ingredient / Mechanism / Reference types
  i18n/                 fr.ts (source) · en.ts · index.tsx (provider, l() for data strings, n() for numbers)
  components/
    presentation/       Deck engine, SlideRenderer, slide/deck contexts, corporate slides
    products/           product slide templates + Bio3Mag and CoQ10 special scenes
    scientific/         original SVG diagrams (progressive), molecule schematics, captions
    navigation/         control bar, overview grid, presenter notes
    ui/                 Reveal animation, badges, slide shell, logo
  hooks/                deck navigation (URL-synced), stage scaling, fullscreen, swipe, idle
  pages/                Presentation, ProductDetail, PrintDeck
  assets/               logos/, products/, scientific/
  styles/index.css      Tailwind theme tokens + print stylesheet
```

## Editing content

- **Product data**: edit `src/data/products.ts`. Every field is `{ fr, en }`. Slides are generated from the registry, so adding a product there adds its section to the deck, the portfolio grid, the overview and `/products/<slug>`.
- **Story template**: set `story: 'standard'` for the eight-slide sequence (hero, composition, science, physiological roles, formulation, practical info, precautions, references). `'bio3mag'` and `'coq10'` are the two special launch sequences.
- **Diagram**: set `diagram` to one of `mitochondria`, `electron-transport`, `magnesium-atp`, `glucose-ampk`, `gastric-mucosa`, `vitamin-d`, `immune-barrier`, `vascular`. Step captions are in `src/data/diagrams.ts`.
- **References**: add an entry to `src/data/references.ts`, then cite its `id` in a product's `references` or in a mechanism's `refs`. Citation numbers are computed automatically.
- **Evidence level** on every mechanism: `authorized-claim` (EU Reg. 432/2012 wording), `established-physiology`, `human-studies` or `preclinical`. It appears as a chip so general biology is never presented as proof of product efficacy.
- **% NRV**: give an ingredient an `nrvKey` (see `src/data/nrv.ts`, EU Reg. 1169/2011 values) and its card shows the percentage automatically.
- **Presenter notes**: the `notes` field in `src/data/presentation.ts`.
- **Interface strings**: `src/i18n/fr.ts` and `src/i18n/en.ts`. TypeScript makes sure both files have the same keys.

### Validation workflow
Any value that is not confirmed is marked `status: 'pending'` on the ingredient, `pending: true` on usage, format or packaging, or listed in `validationNotes`. These are shown with an amber **"Contenu en attente de validation"** badge. The last slide, an internal appendix, lists every open item.

Once the scientific or regulatory team has checked a value against the final packaging and product specification, remove its flag. Before showing the deck to an external audience, set `showValidationAppendix: false` in `src/data/presentation.ts`. Set `showValidationBadges: false` only when nothing is left pending.

## Asset naming conventions

| Folder | Convention | Example |
| --- | --- | --- |
| `src/assets/products/` | `<product-slug>.jpg` — the full packaging face, never cropped, ≥1000 px wide | `bio3mag.jpg`, `bio-q10-plus.jpg` |
| `src/assets/ingredients/` | ingredient photos (`.jpg`, 360 px square) and PubChem structures (`.png`, transparent); mapped by French ingredient name in `src/data/ingredientVisuals.ts`, with author and licence shown on each composition slide | `propolis.jpg`, `berberine.png` |
| `src/assets/logos/` | `nutriome-logo[-variant].png` | `nutriome-logo-tight.png` |
| `src/assets/scientific/` | `<topic>-<subject>.webp` | `coq10-chaine-respiratoire.webp` |

Vite hashes and caches images at build time. `vercel.json` serves `/assets/*` as immutable. Set `imageAspect` (width ÷ height) in the registry so the packshot frame matches the artwork and nothing gets cropped.

`src/assets/scientific/*.webp` are the existing raster illustrations from nutriome.tn. They are kept for reference and are **not bundled**. The deck uses its own SVG diagrams, which can be animated and translated.

## Deployment (Vercel)

1. Push the repository to GitHub/GitLab and import it in Vercel. The framework is detected as Vite.
2. `vercel.json` already sets the build command (`npm run build`), the output directory (`dist`), the SPA rewrites and the asset cache headers.
3. No environment variables are needed.

The production bundle is about 190 kB of JavaScript (gzip), split into React, Motion and app chunks. The product and print pages are lazy-loaded.

---

## Content audit — sources and open issues (3 Nov 2026)

**Sources used:** the product pages and blog bibliographies on nutriome.tn, the packaging artwork served by nutriome.tn, and the existing Figma deck. The scientific references come from the Nutriome blog or from primary regulatory and health-authority sources (EUR-Lex, EFSA, NIH ODS, NCCIH). **Have the scientific team review them before external use.** Entries not taken from the blog: `bentinger-2007`, `debaaij-2015`, `efsa-magnesium-2010`, `lockyer-2017`, `ods-potassium`, `eu-432-2012`, `eu-2022-860`.

**Not used:** claims that are therapeutic or not supported for the product, for example "normalise la pression artérielle", "contrôle du diabète", "cliniquement prouvé", "GMP certifié", "haute absorption", and the disease "indications" list in the Figma deck. The site's counters and event list were also left out because they could not be verified.

**Open items** (each is also shown in the deck's appendix):
- **BioQ10+ / New Coenzyme Q10**: the per-capsule composition and the 30-capsule box are **confirmed from the pack** (3 Nov 2026), so the old Figma formula is obsolete. Dosage set to 1 capsule per day (validated by Nutriome, 3 Nov 2026). Still open: the vitamin B3 form (nicotinamide or nicotinic acid, which have very different upper safe levels), the CoQ10 form, the monacolin content, and the pack's "fonction hépatique" claim, which no authorised claim covers at these amounts.
- **Bio3Mag**: the elemental magnesium value (70.5 mg on the site) is not shown until the supplier specification is validated. The pack says 30 capsules, the site says 60.
- **BioD3K2+**: the K2 and magnesium quantities on the site are internally inconsistent.
- **BioGrippal**: the dosage and pack size are missing.
- **BioTenseur**: the calculation basis, the potassium salt form and the oleuropein assay are missing, and the EFLA® trademark rights need to be confirmed.
- **Packshots**: low-resolution images for Bio3Mag (483 px), BioDigest (305 px) and BioGrippal (314 px). HD packshots are needed.
