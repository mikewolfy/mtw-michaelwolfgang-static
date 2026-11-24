# Michael Wolfgang — static site

A fast, clean, dependency-free static site. It carries over all of the content from
[`mtw-michaelwolfgang-react`](https://github.com/mikewolfy/mtw-michaelwolfgang-react) (same URLs, same content)
but ships as plain HTML, CSS and a little vanilla JavaScript — no framework, no bundler, no client-side routing.
It is built to be served from **GitHub Pages**.

## Pages

| Section | Pages |
| --- | --- |
| Main | Home, About, Contact, Useful Links |
| Developer | Hub, Interview Questions, Podcasts, Resources, JWT Decoder, RSA Signature Validator |
| Technical docs | Scopes & Claims, CIAM Resources |
| Tools & games | Myers-Briggs Test, 5 Love Languages Test, Life Timers, Pace Calculator, Spell Press |
| Reading | Book List (34 books), Quotes (173, searchable) |
| Family | [removed], [removed] |

URLs match the React app (`/developer/podcasts/`, `/booklist/`, `/games/spellpress/`, …), and the old
`/developer/interview-questions?category=Azure` links still work.

## Quick start

Requires Node 18+. There are **no npm dependencies** to install.

```bash
npm start          # builds into ./docs and serves http://localhost:8080
# or
node build.mjs     # build only
node serve.mjs     # serve ./docs
```

## Deploying to GitHub Pages

Either option works; the generated site is committed in `docs/` so both are ready out of the box.

**Option A — GitHub Actions (recommended).** In the repo go to *Settings → Pages → Build and deployment → Source*
and choose **GitHub Actions**. The included workflow (`.github/workflows/pages.yml`) rebuilds and deploys on every
push to `main`.

**Option B — Deploy from a branch.** *Settings → Pages → Source: Deploy from a branch*, then pick `main` and the
`/docs` folder. Remember to run `node build.mjs` and commit `docs/` after content changes.

> Note: GitHub Pages for **private** repositories requires a paid GitHub plan (Pro/Team/Enterprise).
> All internal links are relative, so the site works at a user root (`you.github.io`), a project path
> (`you.github.io/repo/`) or a custom domain.

## Project layout

```
build.mjs               Static site generator (renders pages into docs/)
serve.mjs               Tiny local preview server
src/
  layout.mjs            Header, nav, footer, <head> — edit the NAV array to change the menu
  pages.mjs             Every page's content
  content/              Long-form HTML (Scopes & Claims doc)
  assets/css/site.css   All styling (design tokens at the top; light + dark themes)
  assets/js/            site.js (nav/theme) + one small script per interactive page
  assets/images/        Illustrations, podcast art, book covers
  static/               Copied as-is to the site root (favicon, Spell Press game)
data/                   books.json, quotes.json, myers-briggs.json, love-languages.json
docs/                   Generated output — what GitHub Pages serves
```

## Editing content

* **Books / quotes** — edit `data/books.json` / `data/quotes.json`, then `node build.mjs`. Cover images are either
  full URLs or paths under `src/assets/images/books/`.
* **Quiz questions** — edit `data/myers-briggs.json` / `data/love-languages.json`.
* **Everything else** — edit `src/pages.mjs`.
* **Look & feel** — colours, radius and shadows are CSS variables at the top of `src/assets/css/site.css`.

## Notes

* Interactive tools (JWT decoder, RSA validator, quizzes, timers) run entirely in the browser. Nothing is sent to a server.
  The RSA validator's **Generate working example** button creates a throw-away key pair with the Web Crypto API so the
  tool can be demonstrated end to end.
* Quiz results and Life Timers inputs are stored in `localStorage` (the React version used cookies for the timers).
* Dark mode follows the system setting and can be toggled from the header.
* The React app's Developer hub had placeholder cards (Certifications, Languages, DevOps, Resume, Daily Reads,
  Patterns) that only pointed back at the hub. They are intentionally left out until there is content for them.
