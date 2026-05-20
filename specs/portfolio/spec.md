# Spec — Personal Portfolio Site
**Version:** v0.1 · **Date:** 2026-05-20 · **Owner:** Senthil Palanivelu · **Status:** DRAFT — awaiting approval
**Source:** `specs/portfolio/brief.md` v1.0 (approved 2026-05-20)

---

## Requirements

### R1 — Hero section
The page must display a Hero section as the first visible content above the fold. It must contain:
- Full name (Senthil Palanivelu)
- A single tagline (one sentence, ≤ 15 words) that communicates what he builds
- A primary CTA button/link that scrolls to or links to the Projects section

### R2 — Projects section
The page must display a Projects section containing at least 3 project cards. Each card must include:
- Project name
- Short description (≤ 40 words)
- Tech stack used (as a list of labels/tags)
- At least one link (GitHub repository or live demo, or both)

### R3 — About section
The page must display an About section containing:
- A short bio (≤ 100 words) covering background, interests, and how Senthil works
- Optionally: a profile photo (if not included, a placeholder is acceptable for v1)

### R4 — Contact section
The page must display a Contact section containing:
- A visible email address (either plain text or a `mailto:` link)
- Links to at least two social/professional profiles (e.g. GitHub, LinkedIn)

### R5 — Navigation
The page must provide a navigation mechanism (header nav or equivalent) that allows a visitor to jump to any of the four sections from anywhere on the page.

### R6 — Performance
The deployed site must achieve a Lighthouse Performance score ≥ 90 on desktop.

### R7 — Accessibility
The deployed site must achieve a Lighthouse Accessibility score ≥ 85. All interactive elements (links, buttons, nav) must be keyboard-navigable. Color contrast must meet WCAG 2.1 AA.

### R8 — No-JS baseline
All four sections and their core content must be visible and readable when JavaScript is disabled. JS may be used for enhancements only (e.g. smooth scroll, animations).

### R9 — Hosting
The site must be deployed to a free hosting provider (GitHub Pages or Netlify) and reachable at a public URL.

### R10 — Tests
Every page section must have at least one automated test verifying its presence and key content before the site is considered production-ready (per Constitution rule 1).

---

## Scenarios

### Happy path
**S1.** A visitor opens the URL on desktop. They see the Hero within 1 second, read the tagline, and click the CTA. They scroll through Projects, find one that interests them, click the GitHub link, and it opens correctly.

**S2.** A visitor on mobile opens the URL. The layout reflows correctly — text is readable, cards stack vertically, the nav is accessible, no horizontal scroll appears.

**S3.** A visitor opens the URL with JavaScript disabled. All four sections render. No broken layouts or missing content appear — only optional JS enhancements (smooth scroll, animations) are absent.

### Edge cases
**S4.** A project card has no live demo (only a GitHub link). The card must still display correctly — no broken or empty link slot.

**S5.** A visitor tabs through the page using only a keyboard. Focus states are visible on all interactive elements. The nav links, CTA, project links, and contact links are all reachable and activatable via Enter/Space.

**S6.** The page is opened on a very slow connection (simulated 3G). Images, if any, must not block the rendering of text content. The page must reach Lighthouse Performance ≥ 90 under standard desktop conditions.

**S7.** A screen reader user navigates the page. Headings form a logical outline (h1 → h2 → h3). Images have meaningful alt text or `alt=""` if decorative. Links have descriptive accessible names (not "click here").

---

## Constraints

| # | Constraint |
|---|-----------|
| C1 | Stack is plain HTML, CSS, and vanilla JS only — no frameworks, no bundlers, no build step. |
| C2 | Hosting must be free — GitHub Pages or Netlify free tier only. |
| C3 | No CMS, no server-side rendering, no database — all content is hardcoded in HTML. |
| C4 | No analytics or tracking scripts in v1. |
| C5 | No blog, writing section, or long-form content in v1. |
| C6 | No multilingual support in v1. |

---

## Acceptance criteria

- [ ] **AC1** Hero section is visible above the fold on a 1280×800 desktop viewport without scrolling.
- [ ] **AC2** Hero contains name, tagline (≤ 15 words), and a working CTA that reaches the Projects section.
- [ ] **AC3** Projects section contains ≥ 3 cards, each with name, description, tech tags, and ≥ 1 working external link.
- [ ] **AC4** About section contains a bio of ≤ 100 words.
- [ ] **AC5** Contact section contains a visible email address and ≥ 2 social/professional links.
- [ ] **AC6** A navigation element links to all four sections and works on both desktop and mobile.
- [ ] **AC7** Lighthouse Performance ≥ 90 on the deployed URL (desktop preset).
- [ ] **AC8** Lighthouse Accessibility ≥ 85 on the deployed URL.
- [ ] **AC9** All four sections render correctly with JavaScript disabled.
- [ ] **AC10** All interactive elements are keyboard-focusable with a visible focus indicator.
- [ ] **AC11** All automated tests pass before the site is deployed.
- [ ] **AC12** The site is live at a public URL (not localhost).

---

## Open questions

| # | Question | Owner | Needed by |
|---|----------|-------|-----------|
| OQ1 | Which projects will be featured? Content must be written before build starts. | Senthil | Before Stage 4 |
| OQ2 | Will a profile photo be included in the About section? | Senthil | Before Stage 4 |
| OQ3 | What is the design style preference — minimal/clean, bold/dark, colorful? | Senthil | Before Stage 3 |
| OQ4 | What is the final public URL / domain? (GitHub Pages subdomain is fine for v1) | Senthil | Before Stage 4 |

---
*Spec describes WHAT, not HOW. Implementation decisions belong in Stage 3 (Assemble).*
