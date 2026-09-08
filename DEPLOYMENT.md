# Deployment Guide

This starter needs no database or file-storage account to run — the contact form
writes to a JSON file on the server. So the fastest path to live is just deploying
the two apps below.

## 1. Deploy the backend (Render, Railway, or similar)

1. Push the `server/` folder to a Git repo (or connect this whole monorepo and set
   the service's root directory to `server`).
2. Create a new **Web Service**.
   - Build command: `npm install`
   - Start command: `npm start`
3. Set environment variables (from `server/.env.example`):
   - `PORT` — most platforms set this for you automatically; you usually don't need to set it.
   - `CLIENT_URL` — the frontend's deployed URL (set this *after* step 2 below, then redeploy).
4. Note the backend's public URL, e.g. `https://your-api.onrender.com`.

> Render/Railway free tiers use ephemeral or wake-on-request disks — the
> `server/data/messages.json` file may not persist reliably long-term on a free
> tier. Fine for getting started; move to MongoDB (see
> `docs/EDITING_YOUR_PORTFOLIO.md`) before you rely on it for real inquiries.

## 2. Deploy the frontend (Vercel or Netlify)

1. Push `client/` to a Git repo (or set the project root to `client` in a monorepo).
2. Build command: `npm run build`. Output directory: `dist`.
3. Set environment variable:
   - `VITE_API_URL` = your backend's URL from step 1 (e.g. `https://your-api.onrender.com`).
4. Update `client/src/components/Contact.tsx` to call
   `${import.meta.env.VITE_API_URL}/api/contact` instead of the relative `/api/contact`
   path (the relative path only works because of the *local* Vite dev proxy — once
   frontend and backend are on different domains, you need the full URL).
5. Deploy. Note the frontend's public URL.

## 3. Connect them (CORS)

Go back to your backend host and set `CLIENT_URL` to the frontend's real deployed URL,
then redeploy the backend so `cors({ origin: CLIENT_URL })` allows it.

## 4. Test the deployed site

- Load the frontend URL — confirm the boot sequence plays and the 3D signal core
  renders (or gracefully falls back on mobile).
- Submit the contact form and confirm you get a success message.
- Check `GET https://your-api.onrender.com/api/messages` to confirm the message
  arrived (lock this route down before sharing the site widely — see the auth
  section in `docs/EDITING_YOUR_PORTFOLIO.md`).

---

## If/when you add MongoDB, Cloudinary, or the AI assistant

These aren't wired up in this starter (see
`docs/EDITING_YOUR_PORTFOLIO.md` for why and how to add them), but once you do:

1. **MongoDB Atlas** — create a free cluster, add a database user, allow network
   access from your backend host's IP (or `0.0.0.0/0` for simplicity while testing),
   and copy the connection string into `MONGODB_URI`.
2. **Cloudinary** — create a free account, copy `Cloud name`, `API Key`, and
   `API Secret` from the dashboard into the matching `CLOUDINARY_*` variables.
3. **AI API** — set `AI_API_KEY` and `AI_MODEL` for whichever provider you integrate.

Never commit real values for any of these — only `.env.example` should be in
version control; the real `.env` files are already git-ignored.
