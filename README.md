# SK Energy website

Static site — no build step. Every page is a self-contained `.dc.html` file that runs in the browser via `support.js`.

## Run locally
Serve the folder over HTTP (pages load shared data with ES modules, so `file://` won't work):

```
npx serve .
# or
python3 -m http.server
```

Then open http://localhost:8000 (or the port shown).

## Deploy to GitHub Pages
1. Push this folder's contents to a repository.
2. Settings → Pages → Deploy from branch → `main` / root.
3. `index.html` redirects to the homepage.

## Structure
- `SK Energy Homepage.dc.html` — homepage
- `Service.dc.html?slug=…` — service template (solar-pv, battery-storage, heat-pumps, ev-chargers, underfloor-heating)
- `Work.dc.html`, `CaseStudy.dc.html?slug=…` — projects
- `News.dc.html`, `Article.dc.html?slug=…` — news
- `About.dc.html`, `Contact.dc.html`, `Warranty.dc.html`
- `SiteHeader`, `SiteFooter`, `PageHero`, `NewsGrid` `.dc.html` — shared components
- `site-data.js` — services, case studies and articles content
- `site-motion.js` — scroll/reveal animations (Motion)
- `assets/` — logo and accreditation marks

## Before going live
- Enquiry and warranty forms need a `submitEndpoint` (they currently show a "not connected" message).
- Case studies, articles and testimonials are sample content — replace with verified copy.
- Images are hosted on the Higgsfield CDN; download and host them yourself for production.
