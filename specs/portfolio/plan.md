# Plan — Personal Portfolio Site
**Version:** v0.1 · **Date:** 2026-05-20 · **Source:** `specs/portfolio/spec.md` v0.1

---

## Overall approach

A single `index.html` page with four anchor-linked sections (Hero, Projects, About, Contact), a fixed header nav, and a companion `style.css`. A small `script.js` handles JS-only enhancements (smooth scroll, active nav highlight) but is entirely optional — the page is fully functional without it.

No build step. No bundler. No framework. The entire site is static files that can be served from GitHub Pages or Netlify without any server configuration.

**Design direction:** minimal/clean — generous white space, system font stack (fast, no FOIT), a muted two-color palette with one accent, and content that does the heavy lifting.

---

## File structure

```
/
├── index.html        # Single page, all four sections
├── style.css         # All styles — reset, typography, layout, components, responsive
├── script.js         # Optional enhancements only (smooth scroll, nav highlight)
├── assets/
│   └── (images if any)
└── tests/
    └── portfolio.test.js   # Automated tests (one per section + key content checks)
```

---

## Key decisions

| Decision | Reason |
|----------|--------|
| Single HTML file, anchor nav | Simplest possible setup — no routing, no build step, works anywhere |
| System font stack | Zero network cost, no FOIT, fast LCP — supports Lighthouse ≥ 90 |
| CSS custom properties for palette | Makes theming consistent without a preprocessor |
| JS is enhancement-only | Satisfies R8 (no-JS baseline) and C1 (no framework) |
| Tests via a lightweight HTML test runner | No Node.js required — can run in browser or CI; satisfies R10 and C1 |
| GitHub Pages for hosting | Free, zero config for a static site, supports custom domain later |

---

## Dependencies (build order)

```
Content (T1–T3)
    └── HTML skeleton (T4)
            ├── [P] Section HTML: Hero (T5), Projects (T6), About (T7), Contact (T8)
            └── [P] Global CSS: reset + typography (T9), responsive layout (T10)
                        └── JS enhancements (T11)
                                └── Accessibility audit (T12)
                                        └── Tests (T13)
                                                └── Deploy (T14)
                                                        └── Lighthouse audit (T15)
```

---

## Risks and mitigations

| Risk | Mitigation |
|------|-----------|
| Content not ready blocks HTML work | T1–T3 (copy writing) are the first tasks — nothing else starts until they're done |
| Lighthouse score under 90 due to images | Defer all images; use CSS/SVG placeholders; add `loading="lazy"` if images are added |
| Scope creep during build | Check every addition against the Spec; if it's not in the Spec, it waits for v2 |
| Accessibility failures | Dedicated audit task (T12) before tests — not left to the end as an afterthought |

---

## Open questions (carry-over from Spec)

| # | Question | Status |
|---|----------|--------|
| OQ1 | Which 3+ projects will be featured? | **Unresolved — must answer before T3** |
| OQ3 | Design style | **Resolved: minimal/clean** |
| OQ2 | Profile photo | **Resolved: no photo in v1** |
| OQ4 | Final public URL / domain | **Unresolved — resolve before T14** |

---
*Plan describes HOW. If HOW conflicts with WHAT in the Spec, the Spec wins.*
