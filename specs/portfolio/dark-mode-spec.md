# Spec — Light / Dark Mode Toggle
**Version:** v1.0 · **Date:** 2026-05-20 · **Owner:** Senthil Palanivelu · **Status:** APPROVED
**Source:** `specs/portfolio/dark-mode-brief.md` v1.0 (approved 2026-05-20)

---

## Requirements

### R1 — Toggle button in navigation
The nav bar must include a toggle button placed after the existing nav links
(top-right of `.nav`). The button must contain an icon that indicates the
currently available action (switch to dark / switch to light). No text label
is required.

### R2 — Light mode is the default
Every page load must start in light mode, regardless of the visitor's OS
colour-scheme preference. No previous choice is remembered.

### R3 — Dark colour scheme
When dark mode is active, the entire page — all sections, backgrounds, text,
cards, links, nav, and footer — must switch to a dark colour palette. No
section may remain in light colours while the rest of the page is dark.

### R4 — Smooth transition
Switching between modes must feel smooth. Background colours and text colours
must transition visually rather than snap instantly.

### R5 — Icon reflects current mode
The toggle button icon must update each time the mode changes. At any moment
the icon must communicate what will happen if the button is clicked (i.e. the
available action, not the current state).

### R6 — Keyboard and screen-reader accessibility
The toggle must be reachable by keyboard tab navigation, must activate on both
Enter and Space, and must have an accessible name that updates to reflect the
current mode (e.g. "Switch to dark mode" / "Switch to light mode").

### R7 — No regression to existing site
Enabling or disabling dark mode must not alter layout, typography, spacing,
or any behaviour unrelated to colour. The existing site must remain visually
and functionally identical in light mode to its current state.

---

## Scenarios

### Happy path

**S1 — Visitor clicks toggle once (light → dark)**
A visitor lands on the page (light mode). They click the toggle button. The
entire page — Hero, Projects, About, Contact, nav, footer — switches to dark
colours. The button icon updates to indicate "switch to light".

**S2 — Visitor clicks toggle twice (light → dark → light)**
The visitor clicks the toggle a second time. The page returns to light mode.
The icon reverts to "switch to dark". No visual residue from the dark state
remains.

**S3 — Keyboard-only visitor uses the toggle**
A visitor navigating by keyboard tabs to the toggle button. They press Enter
or Space. The page switches mode. Pressing again switches back. Focus is not
lost after activation.

### Edge cases

**S4 — Page reload resets to light**
The visitor is in dark mode and reloads the page. The page loads in light
mode — no preference is remembered.

**S5 — Screen reader reads the toggle**
A screen reader user reaches the toggle button. The announced name is
meaningful and reflects what the button will do (e.g. "Switch to dark mode").
After clicking, the announced name updates to "Switch to light mode".

**S6 — Toggle on mobile viewport**
The toggle button is visible and tappable at mobile viewport widths. It does
not overflow the nav bar or overlap other nav elements.

**S7 — Rapid repeated clicks**
The visitor clicks the toggle rapidly several times. The page tracks state
correctly — it always ends up in the mode corresponding to the final click,
with no visual glitches or stuck intermediate states.

---

## Constraints

| # | Constraint |
|---|-----------|
| C1 | Pure CSS and vanilla JS only — no new libraries, frameworks, or build steps. |
| C2 | Must not alter the existing light-mode visual appearance in any way. |
| C3 | Colour contrast in dark mode must meet WCAG 2.1 AA (≥ 4.5:1 for body text, ≥ 3:1 for large text and UI components). |
| C4 | No `localStorage`, `sessionStorage`, cookies, or any persistence mechanism. |
| C5 | No changes to HTML structure outside adding the toggle button to the nav. |
| C6 | Must not reduce the existing Lighthouse Accessibility score below 100. |

---

## Acceptance criteria

- [ ] **AC1** The toggle button is visible in the top-right of the nav bar at desktop (1280px+) and mobile (375px) viewport widths.
- [ ] **AC2** On a fresh page load the page renders in light mode.
- [ ] **AC3** Clicking the toggle from light mode switches the entire page to dark colours — all sections change simultaneously.
- [ ] **AC4** Clicking the toggle from dark mode switches the entire page back to light colours.
- [ ] **AC5** The toggle button icon visibly changes each time the mode switches.
- [ ] **AC6** The toggle button's accessible name reflects the available action and updates after each click (verified via screen reader or `aria-label` inspection).
- [ ] **AC7** The toggle is reachable by Tab and activates correctly on Enter and Space; focus is not lost after activation.
- [ ] **AC8** Reloading the page while in dark mode returns the page to light mode.
- [ ] **AC9** Rapid repeated clicks leave the page in a consistent state with no stuck colours.
- [ ] **AC10** Dark mode colour contrast passes WCAG 2.1 AA for body text and large headings (verified by inspection or tooling).
- [ ] **AC11** Light mode visual appearance is identical before and after this change (no regressions).
- [ ] **AC12** Lighthouse Accessibility score remains at 100 after the change.

---

## Open questions

| # | Question | Resolution |
|---|----------|-----------|
| OQ1 | What specific dark colour palette? | **Resolved 2026-05-20** — GitHub-inspired dark palette (see below). Accent colour unchanged. |

### Dark mode colour palette (OQ1 resolution)

| Token | Dark value | Light value (existing) |
|-------|-----------|----------------------|
| `--color-bg` | `#0d1117` | `#ffffff` |
| `--color-bg-alt` | `#161b22` | `#f8f8f6` |
| `--color-text` | `#e6edf3` | `#1a1a1a` |
| `--color-text-muted` | `#8b949e` | `#6b7280` |
| `--color-accent` | `#3b82f6` | `#2563eb` |
| `--color-accent-hover` | `#60a5fa` | `#1d4ed8` |
| `--color-border` | `#30363d` | `#e5e7eb` |
| `--color-tag-bg` | `#1f2937` | `#eff6ff` |
| `--color-tag-text` | `#93c5fd` | `#1e40af` |

---
*Spec describes WHAT, not HOW. Implementation decisions belong in Stage 3 (Assemble).*
