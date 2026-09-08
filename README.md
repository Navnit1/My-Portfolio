# Navnit Kumar — Portfolio

A personalized, cinematic portfolio built from the resume of Navnit Kumar
(Software Development Engineer / Full Stack Developer). Built with React, Vite,
TypeScript, Tailwind CSS, Framer Motion, and Three.js on the frontend, with a
small Express API backing the contact form.

## What's inside

- **`client/`** — the site itself. A cinematic multilingual "hello" boot sequence
  transitions into a name reveal and a typing AI-status panel next to a live,
  reactive 3D wireframe "signal core" (built with React Three Fiber). After that:
  Hero, About, Experience, Projects, Skills, Education, Certifications, and Contact
  sections, all populated from `client/src/data/profile.ts` — one typed data file,
  not hardcoded into components.
- **`server/`** — a minimal Express API with a validated, rate-limited
  `/api/contact` endpoint (file-based storage, no database required to get started).
- **`docs/MISSING_INFORMATION.md`** — exactly what the uploaded resume didn't
  contain (photo, project repo link, certificate files, etc.) and how to add each one.
- **`docs/EDITING_YOUR_PORTFOLIO.md`** — how to edit content day-to-day, and how to
  grow this into the full MongoDB + auth + Cloudinary + AI-assistant system described
  in the original spec, if/when you want that.
- **`DEPLOYMENT.md`** — step-by-step deploy guide (Vercel/Netlify + Render/Railway).

## Quick start

```bash
# backend
cd server && cp .env.example .env && npm install && npm run dev

# frontend (new terminal)
cd client && npm install && npm run dev
```

Visit `http://localhost:5173`.

## Design notes

- Colors, fonts, and animation timing are defined as CSS variables in
  `client/src/index.css` — change them there to restyle the whole site at once.
- The 3D signal core and boot sequence automatically fall back to a simpler static
  treatment on narrow viewports, low-core-count devices, and for users with
  `prefers-reduced-motion` set — see `client/src/hooks/useCapabilities.ts`.
- The boot sequence plays once per browser session (`sessionStorage`), with a
  visible "skip intro" control at all times.

## Honesty by design

Nothing on this site was invented. Where the resume didn't have something (a
photo, a project screenshot, a certificate file, a personal story), the UI says so
plainly with an editable placeholder instead of a fabricated stand-in. Full details
in `docs/MISSING_INFORMATION.md`.
