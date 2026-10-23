# CV → Dashboard

Candidates upload a CV (PDF, DOCX or TXT) and get an animated portfolio dashboard in a
dark, studio-hardware style: black and brushed silver, glass cards with moving lit borders,
thin wide-tracked labels and a single orange accent.

Everything runs in the browser. The CV is read client-side and never sent to a server.

**Live site:** https://pragyamita-debug.github.io/Data-Analytics-AI/ (after Pages is switched on — see below)

## How it works

0. **Example first** — the page opens on the full design filled with neutral placeholder text
   (`src/data/placeholder.ts`: “Your Name”, “Your Role”, …) and an **Upload CV** button.
1. **Upload** — drag a CV onto the drop zone, or try the bundled sample (`src/data/sample-cv.txt`, a fictional candidate).
2. **Read** — PDF text comes from pdf.js, Word files from mammoth; both load only when needed.
3. **Parse** — `src/lib/parseResume.ts` splits the text into sections (Profile, Experience, Education,
   Skills, Projects, Achievements, Certifications, Goals, Motto…) and works out years of experience
   from the date ranges, counting overlapping jobs once.
4. **Review** — the candidate checks what was found and fixes anything before the dashboard is built.
5. **Dashboard** — saved to `localStorage`, so it is still there on the next visit.
   The gear menu can go **Back to the example** at any time.

## What the dashboard shows

| Section | Built from |
| --- | --- |
| Top bar | name as a wordmark, headline, section links, menu (upload another CV, edit, download, start over) |
| Hero | first name / last name / role, tagline, top skills, motto, years of experience counting up |
| Stat strip | years of experience, projects, skills, highest degree |
| Candidate profile | summary, all skills, call-outs for current role, education and core stack |
| Project lineup | one card per project, plus achievements and certifications |
| Career path | four steps: latest degree → earlier role → current role → next goal |
| Sign-off | next goal and a “Start a conversation” button |

## Animations

| Effect | Where | How |
| --- | --- | --- |
| Counting numbers | Hero counter, stat strip | `useCountUp` — rAF + ease-out-expo, starts when in view; the “+” lands when the count finishes |
| Decoding text | Degree in the stat strip | `useScramble` — characters settle left to right |
| Moving, lit borders | Every card | `GlowCard` — `@property --angle` animates a conic gradient masked to a 1px ring, plus a blurred halo |
| Hover | Cards | pointer-follow spotlight + slight 3D tilt (`usePointerGlow`, CSS variables only — no re-renders) |
| Career steps | Career path | the active step lights up and its line fills, then hands over to the next (pauses on hover) |
| Wave panel | Hero | canvas wireframe surface that drifts and swells (`WaveField.tsx`) |
| Hardware photo | Hero | slow hover, light beam and a scan line; follows the pointer |
| Rising sun | Career path / earth | the sun climbs out from behind the planet (clipped at the horizon), the atmosphere rim and a lens flare light up, faint rays turn |
| Floating module, twinkling cities | Profile, sign-off | CSS keyframes |

All motion respects `prefers-reduced-motion`.

## Getting started

```bash
npm install
npm run dev          # local dev server
npm test             # parser tests (vitest)
npm run build        # static build in dist/
npm run build:single # one self-contained index.html in dist-single/
```

## Publish on GitHub Pages

1. **Settings → Pages → Build and deployment → Source:** choose **GitHub Actions**.
2. **Actions → Deploy to GitHub Pages → Run workflow** (it also runs on every push to `main`).

## Writing a CV that parses well

- Clear headings: **Experience**, **Education**, **Skills**, **Projects**, **Achievements**, **Certifications**.
- Dates on the role line or the line after it: `Jan 2023 – Present`, `03/2021 - 06/2023`, `2019 - 2022`.
- Optional extras: **Goals** (`Goal: …`, `Next Step: …`), **Motto**, **Interests**.
- Text-based PDFs only — scanned images have no text to read.

## Project structure

```
src/
  App.tsx                 example → upload → reading → review → dashboard
  data/placeholder.ts     the general example profile shown before any upload
  lib/
    extractText.ts        PDF / DOCX / TXT → text
    parseResume.ts        text → Resume (+ parseResume.test.ts)
    dates.ts              date ranges and overlap-aware experience totals
    storage.ts            safe localStorage wrapper
  hooks/                  useCountUp, useScramble, useInView, usePointerGlow, useScrollSpy
  components/
    UploadScreen.tsx      drop zone + reading progress
    ReviewDialog.tsx      check and fix the parsed fields
    NavBar.tsx, Hero.tsx, Sections.tsx, Dashboard.tsx
    GlowCard.tsx          the moving-border card
    WaveField.tsx         animated wireframe panel
  assets/photos/          hardware, module and earth photos
  styles/global.css       colour tokens, type, buttons
```

The photos in `src/assets/photos/` were cut from the design mock-up, so they are fairly small.
Swap in higher-resolution versions with the same file names for a sharper page.
