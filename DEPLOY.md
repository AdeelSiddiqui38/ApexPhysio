# Deploying Apex Physio to WHC.ca

> **Read first (Sep 29, 2026).** apex-physio.ca is an addon domain on the **remedypills.ca** hosting plan.
> Its folder is **`~/apex-physio.ca`**, not `public_html` (that is the pharmacy site). Never upload Apex files to `public_html`.
>
> As of Sep 30, 2026 `apexphysio/` in this repo matches the live site in `~/apex-physio.ca` (waitlist mode, services pages, `send-booking.php`, `waitlist-count.php`, embedded 3D muscle map, `.htaccess`). Backups from before the Sep 29 and Sep 30 changes are in `~/apex-physio-backups/`.

The live website is the **`apexphysio/`** folder. It is a static site (HTML, CSS, JS) plus one PHP file for the booking form, so it runs on any WHC cPanel plan with no WordPress or database.

Everything else in this repo (design system, `ui_kits/`, `guidelines/`, `marketing/`, the Word doc) is internal and is **not** uploaded.

## What the site folder contains

```
~/apex-physio.ca/
├── .htaccess          HTTPS redirect, caching, compression, 3D model file type, blocks private files
├── index.html         home page
├── site.css
├── booking.js         form logic; pre-fills from the 3D map
├── send-booking.php   emails each waitlist signup to hello@apex-physio.ca
├── waitlist-count.php returns the signup count shown on the site
├── services/          one page per service
├── interactions.js, motion-bg.js, gsap-lottie.js
├── assets/            logo, favicons, animation JSON
└── pain-map/          3D muscle map (index.html + body.glb, about 4 MB)
```

## Before launch, replace the placeholders

| Where | Placeholder | Replace with |
|---|---|---|
| `apexphysio/send-booking.php` line 48 | `hello@apex-physio.ca` | The inbox that should receive waitlist signups |
| `apexphysio/index.html`, `booking.js` | `403-000-0000` / `+14030000000` | Clinic phone number |
| `apexphysio/index.html` | `hello@apexphysio.ca` | Clinic email |

The booking inbox should be on the same domain as the site (for example `bookings@apexphysio.ca`, created in cPanel > Email Accounts). Mail sent from the server to an outside address like Gmail is more likely to land in spam.

## Option A: cPanel Git Version Control (recommended)

Updates become one click after each GitHub push.

1. cPanel > **Git Version Control** > **Create**.
2. Turn on **Clone a Repository**.
   - Clone URL: `https://github.com/AdeelSiddiqui38/ApexPhysio.git`
   - Repository Path: `repositories/ApexPhysio` (outside `public_html`)
   - Name: `ApexPhysio`
3. **Create**. If the repo is private, cPanel needs a deploy key: cPanel > **SSH Access** > generate a key, then add the public key in GitHub > repo **Settings > Deploy keys**, and use the SSH clone URL `git@github.com:AdeelSiddiqui38/ApexPhysio.git`.
4. **Manage** > **Pull or Deploy** > **Deploy HEAD Commit**. This runs `.cpanel.yml`, which copies the site into `public_html`.
5. After each future push: **Update from Remote**, then **Deploy HEAD Commit**.

## Option B: upload a zip in File Manager

1. Download `apex-physio-whc-upload.zip` (built from `apexphysio/`, marketing folder excluded).
2. cPanel > **File Manager** > open `public_html` > **Upload** the zip.
3. Select the zip > **Extract** into `public_html`. Then delete the zip.
4. In File Manager **Settings**, tick **Show Hidden Files** and confirm `.htaccess` is there.

## Domain and HTTPS

1. cPanel > **Domains**: make sure the clinic domain points at `public_html`.
2. At your domain registrar, set the nameservers to the ones WHC gave you (or add an A record to your WHC server IP).
3. cPanel > **SSL/TLS Status** > **Run AutoSSL**. `.htaccess` redirects every visit to `https://` once the certificate exists. If you visit before SSL is issued and get a redirect error, rename `.htaccess` temporarily.

## Test after going live

- [ ] Home page loads over `https://` with the padlock.
- [ ] "Explore the 3D Muscle Map" opens `/pain-map/`, the red muscle model appears, glowing points work.
- [ ] In the map, pick an area, press **Book**: the home page form opens with the service and message pre-filled.
- [ ] Submit a test booking: the success message shows, the email arrives, and a row appears in `booking-requests.csv` in your home folder (one level above `public_html`, File Manager > Home).
- [ ] `https://yourdomain/marketing/` returns **403 Forbidden** (internal files are blocked).

## Booking requests

Each request is saved to `~/booking-requests.csv` (outside the public website, readable only by your account) **and** emailed. If email ever fails, the CSV still has every lead. Download it from File Manager and open it in Excel or Google Sheets.

## Credits

The 3D model is "Male Full Body Ecorche" by Diego Luján García, licensed CC BY 4.0. The credit line at the bottom of the 3D map page is required by the license; keep it.
