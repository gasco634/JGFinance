# AGENTS.md

This repository contains a static web application for JGFinance, packaged as a progressive web app (PWA). Most work happens directly in browser-facing HTML, JavaScript, CSS/assets, and deployment configuration rather than in a Node.js or framework build pipeline.

## Project shape

- Core app: [index.html](index.html), [Bilan Financier.html](Bilan%20Financier.html), [jgfinance-cloud.js](jgfinance-cloud.js), [supabase-config.js](supabase-config.js)
- PWA shell and offline cache: [service-worker.js](service-worker.js), [manifest.webmanifest](manifest.webmanifest)
- Deployment and setup notes: [CONFIGURER-JGFINANCE.md](CONFIGURER-JGFINANCE.md)
- Release/package folders: [JGFinance-mise-a-jour-Worker](JGFinance-mise-a-jour-Worker), [jgfinance-pages-upload](jgfinance-pages-upload), [jgfinance-worker-release](jgfinance-worker-release)

## Working conventions

- Keep the app compatible with static hosting over HTTPS.
- Do not assume a backend or build step exists; the app is designed to run from static files.
- Prefer browser-safe JavaScript and avoid server-only APIs.
- If Supabase is involved, keep the public configuration in the browser and never add service-role secrets or server credentials to client-side code.
- Preserve the PWA behavior: installability, offline caching, and service worker lifecycle expectations.

## Deployment and validation

- The project is not a Node app and does not have a standard automated test suite.
- Validate changes by serving the folder locally with a static HTTP server and checking the app in a browser.
- Typical local preview command:

  ```bash
  py -3 -m http.server 8000 --bind 127.0.0.1
  ```

- For Supabase setup and account synchronization behavior, follow [CONFIGURER-JGFINANCE.md](CONFIGURER-JGFINANCE.md).

## Important constraints

- The app must continue to work when served from a static host with HTTPS.
- Any cloud backup or auth logic must respect the browser-only Supabase configuration pattern used in [jgfinance-cloud.js](jgfinance-cloud.js).
- Service worker changes can affect offline caching and app installability; test those flows carefully.

## Preferred workflow for agents

1. Read [CONFIGURER-JGFINANCE.md](CONFIGURER-JGFINANCE.md) before changing deployment or auth behavior.
2. Check the relevant page/script pair before editing app logic.
3. Keep changes minimal, static-hosting friendly, and compatible with the existing PWA shell.
4. Validate manually in a browser rather than relying on a nonexistent test pipeline.
