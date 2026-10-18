# Portfolio design directions (throwaway prototype)

A design exploration, not the final site. It shows two visual directions that use the same sections and copy, each with light and dark mode.

- `/`: choose a direction
- `/a`: **Signal** (ink and lime, Geist and Geist Mono)
- `/b`: **Cobalt editorial** (paper and cobalt, Inter Tight with Instrument Serif italics)

Placeholders: `[NAME]`, `[EMAIL]`, `[PHOTO]`. The demo call is scripted, and the contact form is simulated in the browser (no backend).

## Run

```bash
npm i && npm run dev
```

The port is fixed at **4317**: open http://localhost:4317. The `dev` script runs `next dev -H 0.0.0.0 -p 4317`.

## Regenerate screenshots and recordings (optional)

With the dev server running, and Chrome at `/usr/local/bin/google-chrome` (override with `CHROME_PATH`):

```bash
npx playwright install ffmpeg   # once, needed for the recordings
node scripts/capture.mjs <output-dir>
```

Stack: Next.js 16, Tailwind CSS 4, Motion (Framer Motion), next-themes, lucide-react. Design notes: `docs/design-directions.md` in the Project store.
