# Missing Information

This file lists exactly what was **not** present in `Navnit_Kumar_Resume_Referral.docx`,
so nothing on the live site was invented to fill the gap. Everything below has a clear,
honest placeholder in the UI (or is hidden) until you add the real thing.

---

### Profile photo
**Not provided.** The hero and boot-sequence panel currently show a plain circular
initial (`N`) instead of a photo.

**Fix:** Drop an image at `client/public/profile.jpg`, then in
`client/src/data/profile.ts` set:
```ts
profileImage: "/profile.jpg",
```
(Wire this into `Hero.tsx` / `BootSequence.tsx` where `profileImage` is currently unused —
swap the placeholder circle for an `<img>` tag.)

---

### GitHub repo link for "AI Resume Analyser"
The resume lists a live Vercel URL (`resumeai-flame-zeta.vercel.app`) but no
project-specific GitHub repo. The Projects card currently shows "Source link not set."

**Fix:** In `client/src/data/profile.ts`, under `projects[0]`, set:
```ts
githubUrl: "https://github.com/Navnit1/your-repo-name",
```

---

### Project screenshot/image
No screenshot was provided for "AI Resume Analyser." The project card is text-only
right now.

**Fix:** Add an image to `client/public/projects/ai-resume-analyser.png`, then set
`image: "/projects/ai-resume-analyser.png"` on the project in `profile.ts` and render
it in `Projects.tsx`.

---

### Certificate files (images/PDFs)
Certificate **names, issuers, and dates** were in the resume, but no actual certificate
files. All three certification cards currently show "Certificate file not uploaded yet."

**Fix:** Add files under `client/public/certificates/`, then set the `file` field for
each certification in `profile.ts` (e.g. `file: "/certificates/oracle-ai-foundations.pdf"`)
and link it from `Certifications.tsx`.

---

### Personal note / "current focus" narrative
The resume has a professional summary but no personal story, favorite quote, or
"what I'm currently exploring" blurb. The About section shows a dashed placeholder
box explaining this instead of inventing one.

**Fix:** Set `personalNote` in `profile.ts` to a real paragraph once you have one you're
comfortable publishing.

---

### Achievements / Awards
None were listed on the resume — the Achievements section is intentionally omitted
from the page rather than filled with invented awards. `profile.achievements` is an
empty array; add entries there and re-enable an `Achievements.tsx` section (a template
following the pattern of `Certifications.tsx` will work) if you want to show it.

---

### Admin dashboard / CMS
The resume obviously doesn't contain this — noting it here because the original
brief asked for a full authenticated admin dashboard with MongoDB-backed CRUD for
every section, Cloudinary uploads, and an AI portfolio assistant. This starter ships
content through a single typed data file (`profile.ts`) instead, which is simpler to
edit directly and safer to ship without wiring up auth first. See
`docs/EDITING_YOUR_PORTFOLIO.md` for how to extend toward the full system if/when
you want it.
