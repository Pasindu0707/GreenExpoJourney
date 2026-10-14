# GreenExpoJourney

# Green Expo Journeys — Sri Lanka tourism site

Static site, no build step. Open with any static server, e.g.:

    npx http-server -p 5173

## Pages
index.html (home), places.html (map), journeys.html, when-to-go.html, about.html, plan.html (enquiry form).
The header and footer are repeated in each page, so change all six when editing them.

## Stack
- HTML/CSS/vanilla JS — deploys anywhere (Netlify, Vercel, cPanel alongside greenexpolk.com).
- GSAP 3 + ScrollTrigger — the map that zooms region by region as you scroll, and hero motion.
- Lenis — smooth scrolling (disabled when the visitor prefers reduced motion).
- Map outline: Natural Earth (world-atlas 10m). Places are positioned from real lat/lon.

## Adding a place
Open `js/data.js` and add one entry (name, region, lat/lon from Google Maps, photo in `assets/img/`, text).
The map pin, the list card, the region zoom and the trip line all update automatically.

## Brand
Taken from greenexpolk.com: green `#037F37`, yellow `#F1C40F`, brown `#3D2811`, cyan `#01ADD3`.
Fonts: Source Serif 4 (headings), Schibsted Grotesk (text and UI), Noto Serif Sinhala/Tamil (greeting).
All colors live as CSS variables at the top of `css/style.css` — swap them when the final branding is decided.

## Before launch
- Journey itineraries, drive times and place descriptions are researched proposals — confirm with operations; add prices if wanted.
- Enquiry form opens the visitor's email app (mailto). Swap for Formspree/Netlify Forms or a backend for proper capture.
- Photos are Wikimedia Commons (credits in footer, several CC BY-SA). Replace with your own photography when possible.
- Logo: each page shows a temporary typed wordmark ("Green Expo Journeys", `.wordmark` in the header and footer). Replace it with `<img src="assets/logo.svg" alt="Green Expo Journeys">` once the logo is final.
