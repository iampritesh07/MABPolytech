<!-- Copilot instructions for contributors and AI coding agents -->
# Copilot instructions — MABPolytech

Purpose: make AI coding agents productive quickly in this repository (static website).

**Big Picture**
- **Type:** Static frontend site (HTML/CSS/JS) served as static files; no backend services in this repo.
- **Layout:** Top-level pages are single HTML files (index.html, about.html, product.html, etc.).
- **Assets:** CSS in `/css/` (compiled), SCSS sources in `/scss/`, JavaScript in `/js/main.js`, third-party libraries under `/lib/`, images in `/img/`.

**Why things are organized this way**
- SCSS sources are kept in `/scss/` and compiled to `/css/` (pre-built files present). Editing should be done in `/scss/` when changing styles, then recompile to update `/css/style.css` and `bootstrap` variants.
- Third-party libraries are vendored under `/lib/` and referenced directly from HTML. Do not remove or replace without updating all HTML references.

**Critical developer workflows**
- Local static server (quick test): from repository root run either:

```
python -m http.server 8000
```
or

```
npx http-server . -p 8000
```

- Compile/watch SCSS -> CSS (recommended):

```
npx sass --watch scss:css
```

or if `sass` installed globally:

```
sass --watch scss:css
```

**Project-specific patterns & examples**
- JS initialisation lives in `js/main.js` — it uses an IIFE wrapping jQuery and initializes plugins (WOW, OwlCarousel, Isotope, counterUp). When adding new UI behavior, follow this pattern and add selectors to `main.js`.
- Animation & behavior are data-driven: e.g. elements with `[data-toggle="counter-up"]` are wired to `counterUp()`; portfolio filter items use `#portfolio-flters li` with `data-filter` attributes and `.portfolio-item` entries — update both HTML and `main.js` when changing filters.
- Carousel usage: look at `.header-carousel` and `.testimonial-carousel` initializers in `js/main.js` for options to copy.

**Conventions & small rules**
- Edit content in the HTML pages at the repo root. Keep structure consistent (navbar, footer, main sections).
- Style changes: edit `/scss/` files and run the SASS command; do not directly edit compiled `/css/style.css` except for emergency quick fixes — prefer source edits.
- When adding/removing a third-party lib, add it under `/lib/` and update HTML references (head or before `</body>` depending on usage). Check `index.html` and `footer` includes for existing patterns.

**Integration points / external dependencies**
- Uses jQuery, Bootstrap, OwlCarousel, Isotope, Lightbox, WOW.js, counterUp, easing — all vendored in `/lib/`.
- No external build system (no package.json); tooling recommendations above use `npx` for one-off commands.

**What to avoid / gotchas**
- Don't assume a JS bundler or build step exists — assets are referenced raw. If you add a bundler, update README and this file.
- Some `lib/` subfolders include small PHP files (e.g. `lib/lightbox/links.php`) — they are not part of a PHP backend; treat these as library artifacts.

**Where to look for examples**
- Page template and layout patterns: `index.html`, `about.html`.
- Main behavior: `js/main.js`.
- Styles source: `scss/` and compiled output `css/style.css`.
- Third-party references: `lib/owlcarousel/`, `lib/lightbox/`, `lib/wow/`, `lib/isotope/`.

If anything here is unclear or you want me to include additional conventions (commit messages, branching, tests), tell me what to add and I will iterate.
