# LoadLock AI Prototype

An interactive prototype for **LoadLock AI** — an AI-assisted case review system for
Thailand's highway weigh-station (ด่านชั่งน้ำหนัก) network. It covers live
station/camera monitoring, a case queue with investigation/evidence/decision
workflows, AI governance dashboards (accuracy, fairness, model lifecycle), and
an internal appeals process. All data in the app is mocked for demo purposes.

## Live demo

https://kukkaiix.github.io/cdg-prototype/

Deployed automatically to GitHub Pages via `.github/workflows/deploy.yml` on
every push to `main`.

## What's in this repo

This repo contains **two versions** of the same prototype:

1. **`src/`** — a Vite + React reimplementation of the design. This is what
   gets built and deployed to GitHub Pages.
2. **`LoadLock AI Prototype.dc.html`** + **`support.js`** — the original
   Claude Design source file, imported as-is. It runs standalone in any
   static file server (it loads React/ReactDOM/Babel from a CDN at runtime).

## Running the Vite/React app

```bash
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

## Running the original `.dc.html` prototype

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/LoadLock%20AI%20Prototype.dc.html` in a
browser (requires internet access to fetch React/ReactDOM/Babel from
unpkg.com).

## Tech stack

- React 18 + Vite
- Plain CSS (no framework) matching the original design system
- GitHub Actions → GitHub Pages for deployment
