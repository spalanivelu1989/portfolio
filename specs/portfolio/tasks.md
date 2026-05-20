# Tasks — Personal Portfolio Site
**Version:** v0.1 · **Date:** 2026-05-20 · **Source:** `specs/portfolio/plan.md` v0.1

Legend: `[P]` = can run in parallel with other `[P]` tasks at the same level · `[BLOCKED]` = cannot start until listed dependency is done

---

## Phase 1 — Content (must complete before any HTML)

### T1 — Write Hero tagline
**Depends on:** nothing  
**Output:** One sentence (≤ 15 words) that communicates what Senthil builds, saved to `content/copy.md`.  
**Done when:** Tagline is written, fits the character limit, and Senthil is happy with it.  
**Covers:** R1, AC2

### T2 — Write About bio
**Depends on:** nothing [P with T1, T3]  
**Output:** Short bio (≤ 100 words) covering background, interests, and working style, saved to `content/copy.md`.  
**Done when:** Bio is written and word count is within limit.  
**Covers:** R3, AC4

### T3 — Write project descriptions
**Depends on:** nothing [P with T1, T2]  
**Output:** For each of ≥ 3 projects: name, description (≤ 40 words), tech stack tags, GitHub URL, and live demo URL (if exists). Saved to `content/copy.md`.  
**Done when:** ≥ 3 project entries are complete with all required fields.  
**Covers:** R2, AC3

---

## Phase 2 — Setup

### T4 — Create file structure and git repo
**Depends on:** T1, T2, T3 (content must be ready to paste in)  
**Output:** `index.html`, `style.css`, `script.js`, `assets/`, `tests/` created. Git repo initialised and pushed to GitHub.  
**Done when:** All files exist, `git status` is clean, repo is on GitHub.  
**Covers:** R9 (partial), C1

---

## Phase 3 — HTML structure

### T5 — Build HTML skeleton
**Depends on:** T4  
**Output:** `index.html` with `<head>`, `<header>` nav linking to `#hero`, `#projects`, `#about`, `#contact`, four `<section>` elements with correct IDs, and `<footer>`. No styles yet. All content from `content/copy.md` pasted in.  
**Done when:** Page opens in browser and all four sections are visible with real copy. Passes HTML validation (no errors).  
**Covers:** R1–R5, R8, AC1–AC5

---

## Phase 4 — Styles and sections (parallel)

### T6 — [P] Build Hero section CSS
**Depends on:** T5  
**Output:** Hero is visually above the fold at 1280×800, name is the largest text element, tagline is readable, CTA is styled as a button/link.  
**Done when:** Hero looks correct in browser at desktop size. CTA scrolls/links to Projects.  
**Covers:** R1, AC1, AC2

### T7 — [P] Build Projects section CSS
**Depends on:** T5  
**Output:** ≥ 3 project cards displayed in a clean grid or list. Each card shows name, description, tech tags, and link(s). Cards with only a GitHub link (no demo) display without empty slots.  
**Done when:** All cards render correctly, no broken link slots for missing demo URLs.  
**Covers:** R2, AC3, S4

### T8 — [P] Build About section CSS
**Depends on:** T5  
**Output:** About section with bio text, clean layout, no photo (text only per OQ2 resolution).  
**Done when:** Bio renders cleanly, word count is within spec.  
**Covers:** R3, AC4

### T9 — [P] Build Contact section CSS
**Depends on:** T5  
**Output:** Contact section with visible email address (mailto: link) and ≥ 2 social links styled consistently.  
**Done when:** All links are visible, styled, and open correctly.  
**Covers:** R4, AC5

### T10 — [P] Global CSS — reset, typography, palette
**Depends on:** T5  
**Output:** CSS custom properties for color palette and typography. System font stack applied. Minimal reset (box-sizing, margin). Consistent spacing scale.  
**Done when:** No browser default styles bleed through, typography is consistent across all sections.  
**Covers:** R6 (performance — system font = no external font load), C1

### T11 — [P] Responsive layout and mobile nav
**Depends on:** T5  
**Output:** Media queries ensure the layout reflows correctly at mobile widths. Project cards stack vertically. Nav is accessible and usable on small screens. No horizontal scroll at any viewport.  
**Done when:** Site renders correctly on 375px (mobile) and 1280px (desktop) with no horizontal scroll.  
**Covers:** R5, AC6, S2

---

## Phase 5 — JS enhancements

### T12 — Add smooth scroll and active nav highlight
**Depends on:** T6, T7, T8, T9, T10, T11  
**Output:** `script.js` implements smooth scroll on anchor clicks and highlights the active nav item on scroll. Page is fully functional when script.js is absent or fails to load.  
**Done when:** Smooth scroll works in browser. Disabling JS leaves all content intact and nav links still work (instant jump).  
**Covers:** R8, C1, AC9, S3

---

## Phase 6 — Accessibility

### T13 — Accessibility audit and fixes
**Depends on:** T12  
**Output:** Heading hierarchy is h1 → h2 (no skips). All links have descriptive text. All interactive elements have visible focus states. Color contrast meets WCAG 2.1 AA. No decorative images missing `alt=""`.  
**Done when:** Manually tabbing through the page reaches every interactive element with a visible focus ring. Axe browser extension (or equivalent) reports 0 critical errors.  
**Covers:** R7, AC8, AC10, S5, S7

---

## Phase 7 — Tests

### T14 — Write and run automated tests
**Depends on:** T13  
**Output:** `tests/portfolio.test.js` with at least one test per section verifying: section exists in DOM, key content is present (name, tagline, ≥ 3 cards, email, ≥ 2 social links), CTA link points to `#projects`.  
**Done when:** All tests pass. Test runner output shows 0 failures.  
**Covers:** R10, AC11, Constitution rule 1

---

## Phase 8 — Deploy and validate

### T15 — Deploy to GitHub Pages (or Netlify)
**Depends on:** T14 (all tests passing)  
**Output:** Site is live at a public URL (not localhost). URL is confirmed and recorded in `STATE.md`.  
**Done when:** URL opens in a fresh browser with no login required.  
**Covers:** R9, AC12

### T16 — Run Lighthouse audit and fix regressions
**Depends on:** T15  
**Output:** Lighthouse report (desktop preset) on the live URL. Performance ≥ 90, Accessibility ≥ 85. Any failures are fixed and a clean re-run is recorded.  
**Done when:** Both scores meet thresholds on the live URL.  
**Covers:** R6, R7, AC7, AC8

---

## Coverage check

| Requirement | Tasks |
|-------------|-------|
| R1 — Hero | T1, T5, T6 |
| R2 — Projects | T3, T5, T7 |
| R3 — About | T2, T5, T8 |
| R4 — Contact | T5, T9 |
| R5 — Navigation | T5, T10, T11 |
| R6 — Performance ≥ 90 | T10, T16 |
| R7 — Accessibility | T13, T16 |
| R8 — No-JS baseline | T5, T12 |
| R9 — Hosting | T4, T15 |
| R10 — Tests | T14 |

**All 10 requirements covered. No task adds scope beyond the Spec.**
