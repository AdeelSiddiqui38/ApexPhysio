# Apex Physio & Wellness Clinic — Project Status
**Last Updated:** September 29, 2026

## Business Details
- **Name:** Apex Physio & Wellness Clinic
- **Address:** Unit 150, 246 Nolanridge Crescent NW, Calgary, Alberta
- **Phone:** TBD (placeholder: 403-000-0000)
- **Email:** TBD (live site shows placeholder hello@apex-physio.ca)
- **Website:** https://www.apex-physio.ca (LIVE, "Opening Soon" waitlist mode)
- **Relationship to 1physioandmobility.ca:** Same staff, fully independent — no financial relationship

---

## Tech Stack Decided
| Layer | Decision |
|---|---|
| Hosting | WHC.ca, **remedypills.ca Web Hosting Pro** plan (server beaudry.whc.ca). apex-physio.ca is an addon domain — see `DEPLOY.md` |
| Site folder | **`~/apex-physio.ca`** on the server. NOT `public_html` (that is remedypills.ca + afalytics.com) |
| Site | Static HTML/CSS/JS. The **live server copy is the source of truth**; `apexphysio/` in this repo is older (see below) |
| Waitlist form | Live: `send-booking.php` + `waitlist-count.php` (on server only). `apexphysio/booking.php` in the repo is not used live |
| Booking (later) | Jane App (account NOT yet created) |
| CDN / Security | Cloudflare (free plan) |
| Analytics | Google Analytics 4 + Search Console |

---

## Files in This Folder
| File | Description |
|---|---|
| `website-concept.html` | Full visual concept — open in browser to preview the site design |
| `Apex_Physio_Website_Content_All_23_Pages.docx` | Complete copy for all 23 pages with SEO titles, meta descriptions & body content |

---

## Completed ✅
- [x] Research: 1physioandmobility.ca services, positioning, messaging
- [x] Research: Nolan Ridge / NW Calgary market demand & search trends
- [x] Website concept design (HTML preview — modern navy/teal brand)
- [x] Brand strategy: name, tagline, color palette, typography
- [x] Logo: designed in Canva (Option 1 saved — editable anytime)
- [x] Website content: all 23 pages written with local SEO copy
- [x] Tech stack & hosting decision

---

## Sept 29, 2026 update ✅
- [x] 3D Muscle Map at `apexphysio/pain-map/` (real anatomical model, 11 areas, pain education, links to booking with the area pre-filled)
- [x] Booking form moved off Netlify Forms to `booking.php` so it works on WHC
- [x] WHC deploy setup: `.htaccess`, `.cpanel.yml`, `DEPLOY.md`
- [x] **Deployed to apex-physio.ca (live):**
  - Backed up the whole live site first → `~/apex-physio-backups/2026-09-29/apex-physio.ca/` (restore = copy back)
  - Uploaded `pain-map/` (index.html + body.glb) and `painmap-prefill.js` into `~/apex-physio.ca` — no existing files overwritten
  - Edited live `index.html`: "Explore the 3D Muscle Map" button in the body-map section, "3D Muscle Map" link in mobile menu + footer, `<script src="painmap-prefill.js">` after booking.js
  - 3D map buttons say "Join the opening waitlist" (`mode: 'waitlist'` in `pain-map/index.html` — change to `'booking'` when the clinic opens)
  - Tested live: home → 3D map → pick area → waitlist form pre-filled (service + "From the 3D muscle map: …")
- [x] `.cpanel.yml` now deploys only pain-map files to `~/apex-physio.ca` (never `public_html`)
- [x] **Sep 30:** added `~/apex-physio.ca/.htaccess` so browsers re-check pages/CSS/JS for updates (`Cache-Control: no-cache`); images cache 7 days, the 3D model 30 days. Fixes visitors seeing an old saved copy after edits. remedypills.ca unaffected.
- [x] **Sep 30:** replaced the old 2D body-map figure on the home page with the real 3D model, embedded in the "Click Where It Hurts" section (`pain-map/?embed=1` in a lazy-loaded iframe). The old figure is hidden (`hidden style="display:none"`), not deleted, because the live `interactions.js` still references its elements (`bodySvgFront`, `bmPanel`); deleting them would break the quiz/services scripts. Backup before this change: `~/apex-physio-backups/2026-09-30/`.

### ⚠️ Repo vs live server
The live site was edited directly on the server on Sep 16–18 (waitlist mode, `services/` pages, `service-page.js`, `send-booking.php`, `waitlist-count.php`, bigger `index.html`/`site.css`). Those are **not in this repo**. Do not deploy `apexphysio/index.html`, `site.css` or `booking.js` from the repo over the live site. Next step: download the live folder and commit it here so GitHub matches the live site again.

## To Do — Pick Up Here Next Session
- [ ] **Security:** `~/apex-physio.ca/Sep 18 2026.zip` is publicly downloadable. Move it to `~/apex-physio-backups/` or upload the prepared `.htaccess` (blocks .zip/.md/.csv, forces HTTPS)
- [ ] **Sync repo with live:** copy the live `~/apex-physio.ca` files into `apexphysio/` and commit
- [ ] Replace placeholder phone `403-000-0000` and email on the live site
- [ ] When the clinic opens: set `mode: 'booking'` in `pain-map/index.html`, switch the site from waitlist to booking
- [ ] Have a physio review the 3D map's pain-education wording before promoting it

- [x] ~~Phase 3 — WordPress Build~~ → replaced by the static site now live at apex-physio.ca
  - [ ] Remaining: bring the rest of the 23-page content doc onto the static site
- [ ] **Phase 4 — Integrations**
  - Create Jane App account at jane.app *(Adeel to do — takes ~20 min)*
  - Embed Jane App booking widget on all relevant pages
  - Set up Cloudflare DNS (free plan)
  - Connect Google Analytics 4 + Search Console
- [ ] **Phase 5 — SEO & Launch**
  - Set up Google Business Profile (246 Nolanridge Crescent NW)
  - Write first 6 blog posts (topics already planned in content doc)
  - Submit sitemap to Google Search Console
  - Local citations setup (Yelp, Yellow Pages, Healthgrades, etc.)
- [ ] **Phase 6 — Social Media**
  - Create Instagram, Facebook, TikTok profile graphics in Canva
  - Cover photos, profile images, first 10 post templates
  - Social account setup (needs Adeel access)

---

## Canva Assets
- **Logo (editable):** https://www.canva.com/d/xh6Hf78kzSk5609
- **Logo (view/share):** https://www.canva.com/d/EfaxjnIPVpFYqAZ
- Note: Logo is a working draft — can be refined anytime

---

## What Adeel Needs to Do Before Next Session
1. **Create Jane App account** → jane.app (20 min, clinic approval takes 1–2 days)
2. **Decide on domain name** → apexphysio.ca / apexphysiocalgary.ca / apexphysioandwellness.ca
3. **Have WHC login ready** (cPanel credentials) for WordPress install
4. **Real team photos** when available (for About Us page)
5. **Confirm phone number and email** for the clinic

---

## Competitor Note
**Pro Health Chiro & Physio** is at 318 Nolanridge Crescent NW — 200m away.
Key differentiator for Apex: same clinician every visit, fully multidisciplinary, 1-on-1 full sessions.
