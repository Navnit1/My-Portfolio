# Editing Your Portfolio

## Everyday edits (no code knowledge needed beyond this file)

All real content lives in one file:

```
client/src/data/profile.ts
```

Open it and edit the plain values — name, links, skills, education, experience,
projects, certifications. Every component (`Hero`, `About`, `Skills`, etc.) reads
from this file, so a change here shows up everywhere it's used without touching
any component code.

After editing, if you're running locally, the dev server hot-reloads automatically.
If deployed, commit + push (or re-upload) and rebuild.

See `docs/MISSING_INFORMATION.md` for the specific fields this resume left blank
and exactly what to fill in.

---

## Project structure

```
portfolio/
├── client/                  React + Vite + TypeScript frontend
│   ├── src/
│   │   ├── data/profile.ts  ← all real content lives here
│   │   ├── components/      one file per section/UI piece
│   │   ├── hooks/            reduced-motion / low-power detection
│   │   └── App.tsx           page assembly + boot-sequence gate
│   └── public/                static assets (add photos/certs here)
├── server/                   Express backend
│   ├── src/index.js          contact form API (validation + rate limiting)
│   └── data/messages.json    contact submissions (file-based storage)
└── docs/
```

---

## Running it locally

**Backend:**
```bash
cd server
cp .env.example .env
npm install
npm run dev        # http://localhost:5050
```

**Frontend** (separate terminal):
```bash
cd client
npm install
npm run dev         # http://localhost:5173
```

The Vite dev server proxies `/api/*` requests to `http://localhost:5050`
(configured in `client/vite.config.ts`), so the contact form works out of the box
in local dev without any extra config.

---

## Swapping in a real photo / project image / certificate file

1. Put the file in `client/public/` (anything in `public/` is served at the site root).
2. Reference it in `profile.ts`, e.g. `profileImage: "/profile.jpg"`.
3. The relevant component (`Hero.tsx`, `Projects.tsx`, `Certifications.tsx`) currently
   renders a text/initial placeholder when the field is `null` — replace that
   conditional branch with an `<img>` tag once you add the file. Each of those spots
   is commented so you can find them quickly.

---

## Extending toward the full original spec

The original brief asked for a much larger system than this starter: MongoDB-backed
content (instead of the `profile.ts` file), JWT-authenticated admin dashboard with
full CRUD, Cloudinary file uploads, resume re-upload with diffing, and an AI chat
assistant that answers visitor questions from portfolio data only. That's real,
substantial backend work — here's how each piece maps onto what's already here so
it's additive, not a rewrite:

**MongoDB + Mongoose models**
Replace `server/data/messages.json` with a `ContactMessage` Mongoose model, and add
`Profile`, `Project`, `Skill`, `Education`, `Experience`, `Certification`,
`Achievement`, and `SocialLink` models mirroring the shape already in `profile.ts`.
Add a `GET /api/profile` route that returns this data, and change the frontend to
`fetch` it (e.g. in a `useProfile()` hook) instead of importing the static file —
every component already consumes a `profile` object, so this swap only touches one
data-loading layer, not the components themselves.

**Auth (JWT + bcrypt)**
Add a `User` model (email + bcrypt password hash), a `POST /api/auth/login` route
issuing a signed JWT, and an `authMiddleware` that checks `Authorization: Bearer <token>`
on any `/api/admin/*` route. Store the token in memory or an httpOnly cookie on the
frontend (avoid `localStorage` for anything auth-related).

**Admin dashboard**
A separate React route tree (e.g. `/admin/*` via React Router) with forms for each
data model above, calling authenticated CRUD endpoints. Reuse the existing Tailwind
tokens (`var(--teal)`, `var(--surface)`, etc.) from `index.css` for visual consistency.

**Cloudinary uploads**
Add `multer` + `cloudinary` on the server, expose `POST /api/admin/upload`, and store
the returned secure URL in the relevant Mongo document (profile image, cert file,
project image). Set `CLOUDINARY_*` vars from `.env.example`.

**AI portfolio assistant**
A `POST /api/assistant` route that takes a visitor question, retrieves the current
profile data from MongoDB, and sends both to an LLM API with a system prompt
constraining it to answer only from that data (explicitly instruct it to say "I don't
currently have that information in the portfolio" otherwise — do not let it fall back
to general knowledge about the person). Set `AI_API_KEY` / `AI_MODEL` from
`.env.example`. Render it as a small chat widget component on the frontend.

**Resume re-upload + diffing**
An admin-only upload endpoint that parses a new resume (e.g. with `mammoth` for
`.docx`, similar to how this project's resume was read), diffs the extracted fields
against the current MongoDB documents, and returns a list of additions/changes for
the owner to accept/ignore/edit — never auto-overwriting manually edited fields.

None of this is required to use or deploy what's already built — the current
`profile.ts`-driven version is a complete, working, personalized portfolio on its own.
