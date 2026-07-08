# RemedyPills & NBV Design System

This project bundles design context for **three products** owned by the same working group, both surfaced via attached Replit-style codebases:

1. **RemedyPills Pharmacy** — a patient-facing mobile web app for a Calgary, Alberta pharmacy (prescriptions, refills, reminders, appointment booking, pharmacist chat, rewards).
2. **Next Bridge Ventures (NBV)** — a marketing website for a Calgary-based venture incubation platform that helps founders launch/acquire/scale businesses in Canada, often alongside immigration-linked programs (C11 Work Permit, Start-Up Visa).
3. **Apex Physio & Wellness Clinic** — a NEW physiotherapy/wellness clinic opening at Unit 150, 246 Nolanridge Crescent NW, Calgary. Unlike the other two (recreations), this is an ORIGINAL modern site + launch marketing program built on top of the repo's written content, with a refreshed brand direction (ink navy `#060D14`/`#0C2233`, electric teal `#00E5B3`, amber `#FFB03A`; Sora display + Inter body).

They share no visual DNA (different color systems, different type systems, different product shape — app vs. marketing site) so this system keeps them as two clearly-separated brand scopes rather than forcing a single shared palette. Components that are truly generic (Button, Badge, Card, Input) take a `brand` prop to switch between them.

## Sources

**RemedyPills Pharmacy**
- Local codebase: `Remedy Pills App/App/remedypillspharmacy/` (mounted folder — a snapshot of the app below)
- GitHub: [AdeelSiddiqui38/remedypillspharmacyApp](https://github.com/AdeelSiddiqui38/remedypillspharmacyApp) (`main` branch)
  - Key files read: `client/src/index.css` (design tokens), `client/src/pages/pharmacy-app.tsx` (all 6 tabs, modals), `client/src/pages/auth-page.tsx` (auth flow), `client/src/components/ui/*` (shadcn "new-york" primitives)

**Apex Physio & Wellness**
- GitHub: [AdeelSiddiqui38/ApexPhysio](https://github.com/AdeelSiddiqui38/ApexPhysio) (`main` branch)
  - Key files read: `PROJECT_STATUS.md` (business facts, services, status), `website-concept.html` (original one-page concept whose copy — "Rise Above Pain. Reclaim Your Peak Life.", services, communities — was kept; visuals were refreshed per the owner's request)

**Next Bridge Ventures**
- GitHub: [AdeelSiddiqui38/NextBridgeVentures](https://github.com/AdeelSiddiqui38/NextBridgeVentures) (`main` branch)
  - Key files read: `src/app/globals.css` + `tailwind.config.ts` (design tokens), `src/app/page.tsx`, `src/app/about/page.tsx`, `src/app/faq/page.tsx`, `src/components/header.tsx`, `src/components/footer.tsx`

**If you have access to these repos, go read them directly** — they contain the full, unabbreviated product (every page, every component variant, the live copy) which this design system only samples and reconstructs cosmetically. In particular: `pharmacy-app.tsx` is ~3,000 lines with dialogs and forms not rebuilt here (admin panel, family profiles, health/calorie logging detail), and NBV's `programs`, `global-entrepreneurs`, and `canadian-founders` routes (with sub-routes) were not recreated — only stubbed.

## What's in this project

- `styles.css` + `tokens/` — global CSS custom properties (color, type, spacing/radius/shadow) for both brands, plus Google Fonts imports for Inter/Poppins (see Iconography/Fonts caveat below)
- `components/core/` — Button, Badge, Card, Input (brand-switchable primitives)
- `components/remedypills/` — QuickActionTile, BottomNav (RemedyPills-specific patterns)
- `ui_kits/remedypills-app/` — click-through recreation of the patient app (Auth → Home → Rx → Reminders → Care → Health → Account)
- `ui_kits/nbv-website/` — click-through recreation of the marketing site (Home, About, FAQ fully built; Programs/Global Entrepreneurs/Canadian Founders stubbed)
- `apexphysio/` — the new Apex Physio site (`index.html` + `site.css` + `motion-bg.js` canvas hero + `interactions.js` body map/quiz/slider/library/chat + `booking.js` Jane-style mock) and `apexphysio/marketing/` (Marketing Plan doc, Social Post Templates, Profile Graphics, Grand Opening Flyer)
- `guidelines/` — 14 foundation specimen cards (colors, type, spacing/radii/shadows, brand/logos) shown in the Design System tab
- `assets/` — logos and imagery copied from both source repos

## Components

- **Button** (`components/core`) — primary/accent/secondary/outline/ghost, brand-switchable, `pill` variant for RemedyPills' rounded CTA
- **Badge** (`components/core`) — status pill, tones map to RemedyPills prescription statuses (active/processing/ready/completed) plus neutral/primary
- **Card** (`components/core`) — base surface, brand-switchable shape/shadow language
- **Input** (`components/core`) — text field, brand-switchable radius
- **QuickActionTile** (`components/remedypills`) — RemedyPills home-screen icon+label action button
- **BottomNav** (`components/remedypills`) — RemedyPills' persistent 6-tab bottom navigation

### Intentional additions
Neither source repo ships a standalone component library outside shadcn/ui primitives (Button, Badge, Card, Input, etc. — see `components.json`). Rather than port shadcn 1:1, this system extracts the small set of primitives actually reused across screens, plus two RemedyPills-specific patterns (QuickActionTile, BottomNav) that recur constantly in the app but aren't separable components in the source (they're inlined JSX in `pharmacy-app.tsx`).

## Content Fundamentals

**RemedyPills Pharmacy** — warm, reassuring, plain-language healthcare copy. Speaks directly to the patient in second person ("Your health, managed with care", "Get your prescriptions delivered to your door"). Sentences are short and instructional. Emergency/safety disclaimers are blunt and unambiguous ("If this is a medical emergency, call 911 immediately"). No emoji in the UI copy itself (emoji only stand in for icons in this reconstruction's stub screens — the real app uses Lucide icon components, never emoji). Section labels are terse noun phrases ("Quick Actions", "Our Services", "Upcoming Reminders"). CTAs are verb-first and short ("Refill", "Snooze", "✓ Taken", "GET STARTED" in caps for the primary onboarding action).

**Next Bridge Ventures** — corporate, credibility-first, policy-literate. Writes in first person plural ("We help entrepreneurs...", "We don't sell visas, we build ventures.") addressing the reader as "you"/"founders". Tone is deliberately unhype and careful about legal precision — repeatedly disclaims that NBV is *not* an immigration consultant and does *not* guarantee visas, a direct reflection of regulatory sensitivity in the immigration-adjacent business space. Headlines lean punchy and short ("From Vision to Venture.", "Let's Talk Business", "We don't just incubate. We validate, audit, invest, and scale."), while body copy is longer-form and precise, often stacking 2-3 dense paragraphs per section. No emoji anywhere on the site. FAQ copy is dense, legalistic, and uses defined terms (C11, SUV, IRCC, AAIP) matter-of-factly.

## Visual Foundations

**RemedyPills Pharmacy**
- **Color**: brand teal `hsl(186, 86%, 30%)` as primary, a lighter teal accent `hsl(186, 90%, 38%)`, and a signature 135°/diagonal three-stop gradient (`hsl(186,86%,30%) → hsl(186,76%,40%) → hsl(176,70%,48%)`) used on the TopBar header and the auth landing screen background — this gradient is the single most recognizable brand motif.
- **Type**: Inter throughout (shadcn default `--font-sans`); Georgia/Menlo declared but unused in the UI. Sizes are small and dense (11–20px) befitting a mobile product UI — nothing decorative, everything utilitarian.
- **Shape**: extremely round. `rounded-2xl` (16px) is the default for cards, list rows, and most buttons; `rounded-3xl` (24px) for dialogs/modals; fully-pill buttons (`rounded-full`) for the primary onboarding CTA and status badges.
- **Backgrounds**: flat pastel tints (teal/amber/blue/pink/purple/orange/emerald at ~10% opacity equivalents) behind icons on quick-action tiles — never full-bleed photography inside the app itself (photography appears only on the marketing/auth screens as a hero image).
- **Elevation**: soft, barely-there shadows (`shadow-sm` equivalent) on white cards sitting on a very light blue-gray page background (`hsl(210,40%,98%)`) — depth comes from color contrast more than shadow.
- **Animation**: minimal — CSS `transition-colors`/opacity on hover, `active:scale-95` press feedback on quick-action tiles, no bounce/spring easing observed.
- **Hover/press states**: a custom "elevate" utility system (`hover-elevate` / `active-elevate-2`) layers a translucent black/white overlay (3–8% opacity) rather than swapping to a different named color — this keeps brand hues consistent across interaction states.
- **Borders**: mostly borderless cards (shadow does the separation); a `--button-outline`/`--badge-outline` at ~10%/5% black opacity provides just enough definition on outline variants.
- **Imagery**: none used inside the product UI besides the app icon/logo; auth screen background is a solid gradient, not a photo.
- **Iconography**: Lucide React icon set exclusively (confirmed via `components.json` → `"iconLibrary": "lucide"`) — no emoji, no custom icon font. This system substitutes plain Unicode glyphs/emoji in a few reconstructed screens purely as stand-ins; a production build should swap in Lucide.

**Next Bridge Ventures**
- **Color**: deep navy primary `hsl(211, 62%, 15%)` (literal hex `#0f253e` used on hero sections) paired with a saturated teal accent `hsl(180, 100%, 35%)` (literal hex `#00b2b2` used on CTA bands) — a serious, institutional palette befitting a business/immigration-adjacent brand.
- **Type**: Poppins 600/700 for headlines (`font-headline`), Inter for body (`font-body`) — a classic marketing-site display/body pairing. Headlines use tight/negative letter-spacing (`tracking-tighter`/`tight`); body copy runs large (18px/`text-lg`) and generously leaded.
- **Shape**: moderate rounding, `0.8rem` base radius on cards — nowhere near as round as RemedyPills.
- **Backgrounds**: full-bleed photography is central — the homepage hero is a full-bleed cityscape photo with a navy 80% overlay; the About hero uses a radial teal glow over solid navy. Card backgrounds are flat white or the navy/teal primaries — no gradients besides the hero overlay and the one 90°-linear brand gradient used sparingly.
- **Signature interaction**: a 3D flip-card (`perspective`/`rotateY(180deg)` on hover/focus) on the "What You Get With NBV" benefit tiles — front shows a photo + icon + label, back reveals descriptive copy. This is NBV's one distinctive motion pattern; reduced-motion users get the back face shown statically instead.
- **Animation**: otherwise restrained — `ScrollReveal` fade/slide-up on scroll for section content, `hover:scale-105` on hero CTAs, standard Radix accordion open/close easing on FAQ and mobile nav.
- **Hover/press states**: text links get an accent-colored underline (`hover:underline-accent`, teal, 4px offset); buttons darken/lighten via Tailwind opacity utilities (`hover:bg-accent/90`).
- **Borders/shadows**: subtle `soft-sm`/`soft-lg` box-shadows (2–15px blur, 2–5% black) rather than borders for card separation; Vision/Approach cards add a teal ring on hover.
- **Layout**: classic marketing site — sticky header, `container mx-auto max-w-7xl`, alternating white/`bg-secondary` (very light gray) section backgrounds, dark CTA bands in teal or navy to close each page.
- **Imagery color vibe**: warm-toned stock photography (professional office settings, handshake/support imagery) sourced from Unsplash in the live site; brand-owned imagery (Canada globe/flag graphic) is more saturated and illustrative.

## Iconography
- **RemedyPills**: Lucide React icons exclusively, per `components.json`. No icon font, no SVG sprite sheet, no emoji in production UI.
- **NBV**: Lucide React icons as well (`Mail`, `MapPin`, `Scale`, `ShieldCheck`, `Users`, `Handshake`, `Linkedin`, `Twitter`, `Menu`, `ChevronDown` all imported from `lucide-react` in the pages/components read).
- **Substitution flagged**: neither repo's Lucide icon files were copied into this project (Lucide ships as a JS component library, not static assets, so there was nothing to copy). This design system's UI-kit reconstructions substitute plain Unicode/emoji glyphs (🔔💊📅 etc.) purely as visual stand-ins for speed — **for production or any pixel-accurate handoff, load the real Lucide icon set** (CDN: `https://unpkg.com/lucide@latest` or the `lucide-react` npm package) instead of the emoji seen in `ui_kits/`.
- No logo mark exists for NBV beyond the wordmark+bar-chart icon lockup shown in `assets/nbv/`; RemedyPills' logo is a pill-capsule + magnifying-glass-like "R" mark, copied as-is.

## Fonts — substitution flag
Neither repo commits font binaries; both load Google Fonts at build time (`next/font/google` for NBV's Inter/Poppins, a plain Tailwind `--font-sans: 'Inter'` for RemedyPills). This system loads the **exact same families** (Inter 400–800, Poppins 600/700) from the Google Fonts CDN in `tokens/fonts.css` — this is not a substitution, just a different loading mechanism. No further action needed unless you want these self-hosted.

## Index

```
styles.css                     → global CSS entry (imports tokens/*)
tokens/
  colors.css                   → RemedyPills + NBV color tokens (HSL) + semantic aliases
  typography.css               → font families + type scale, both brands
  spacing.css                  → spacing scale, radii, shadows, both brands
  fonts.css                    → Google Fonts import (Inter, Poppins)
components/
  core/                        → Button, Badge, Card, Input (brand-switchable)
  remedypills/                 → QuickActionTile, BottomNav
ui_kits/
  remedypills-app/             → patient app click-through (index.html + Shell/AuthScreen/*Tab.jsx)
  nbv-website/                 → marketing site click-through (index.html + Shell/HomePage/AboutPage/FaqPage/StubPage.jsx)
guidelines/                    → 14 foundation specimen cards (Colors, Type, Spacing, Brand groups)
assets/
  remedypills/                 → logo, app icon
  nbv/                         → logo, hero photo, Canada graphic
SKILL.md                       → portable skill definition for Claude Code / other agents
```

## Caveats & next steps

- **NBV Programs / Global Entrepreneurs / Canadian Founders pages are stubbed, not built.** These are large, multi-section pages (with further sub-routes like `start-business`, `acquire-business`, `partnership`, `list-your-ideas`, `list-your-business`) — I left them as labeled placeholders rather than guess at content. Happy to build these out next if you confirm scope.
- **RemedyPills admin panel, family-profile management, and health/calorie-logging detail screens** (all present in the 3,000-line `pharmacy-app.tsx`) were not recreated — only the 6 patient-facing tabs.
- **Icons are emoji stand-ins in the UI kits**, not the real Lucide set (see Iconography above) — swap these for Lucide before treating any kit screen as final.
- The reference screenshot found in the RemedyPills repo (`Pharmacy_Mobile_App_UI_-_Home_....png`) shows an **earlier design iteration** (different bottom-nav labels, a search bar) than the current `pharmacy-app.tsx` source — I built against the current code, per source-of-truth priority, not the older screenshot.

**Please tell me what to prioritize next** — building out NBV's Programs/Global Entrepreneurs/Founders pages, wiring real Lucide icons into both UI kits, or adding more RemedyPills screens (admin, family profiles) would all meaningfully sharpen this system. I'd also love the real Figma files (if they exist) for either product to verify pixel values I had to approximate from Tailwind classes.
