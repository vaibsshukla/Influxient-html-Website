# InFluxient — Company Website

A professional, Appinventiv-style marketing site for **InFluxient**: digital product engineering and consulting.

## Run locally

- **Option 1:** Open `index.html` in your browser (double-click or drag into a browser window).
- **Option 2:** From the project folder, run a simple HTTP server:
  ```bash
  # Python 3
  python3 -m http.server 8080

  # or npx
  npx serve .
  ```
  Then visit `http://localhost:8080` (or the port shown).

## Structure

- `index.html` — Single-page layout: hero, services, stats, case studies, testimonials, expertise, industries, FAQ, contact, footer.
- `css/styles.css` — InFluxient design system (dark theme, amber accent, Outfit + DM Sans).
- `js/main.js` — Header scroll state, mobile menu, stats counter, work carousel + dots, contact form placeholder.

## Customization

- **Copy:** Edit `index.html` to replace placeholder text, client names, and case studies with your own.
- **Colors:** In `css/styles.css`, change `--accent`, `--bg`, and related variables in `:root`.
- **Contact:** Point the form `action` to your backend or replace the submit handler in `js/main.js` with your API/email service.

## Browser support

Modern browsers (Chrome, Firefox, Safari, Edge). Uses smooth scroll, `scroll-snap`, and `IntersectionObserver`.
# Influxient-html-Website
