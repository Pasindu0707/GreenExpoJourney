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
- Photos are from Unsplash and Pexels (free under their licences; photographers credited in the footer). Each photo has -600.jpg and -1200.jpg copies for phones. Replace with your own photography when possible.
- Logo: each page shows a temporary typed wordmark ("Green Expo Journeys", `.wordmark` in the header and footer). Replace it with `<img src="assets/logo.svg" alt="Green Expo Journeys">` once the logo is final.

## SEO / GEO
- Each page has its own title, meta description, canonical URL, Open Graph / Twitter tags and JSON-LD
  (TravelAgency + WebSite on every page; BreadcrumbList on inner pages; ItemList of TouristAttraction on Places,
  ItemList of TouristTrip on Journeys; FAQPage on When to go and About).
- Place and region cards are written into the HTML (not only by JavaScript), so search engines and AI crawlers can read them.
- `sitemap.xml`, `robots.txt`, `llms.txt` and `404.html` live in the repo root.
- Photos are served as WebP with JPEG fallback in 300/600/1200/full sizes. Every photo needs all eight files
  (`name.jpg/.webp`, `name-300`, `name-600`, `name-1200`).
- All absolute URLs use https://pasindu0707.github.io/GreenExpoJourney/. If the site moves to its own domain, every
  canonical, og:url, sitemap and llms.txt URL must be updated.
- Note: robots.txt and llms.txt only take effect at a domain root (e.g. journeys.greenexpolk.com/robots.txt).
  On a github.io project URL, submit the sitemap in Google Search Console instead.
