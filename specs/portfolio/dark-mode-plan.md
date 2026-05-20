# Plan — Light / Dark Mode Toggle
*Stage 3 — Assemble · v1.0 · 2026-05-20*
**Source:** `specs/portfolio/dark-mode-spec.md` v1.0

---

## Approach

**CSS-variable override pattern.** The existing `style.css` already defines all
colours as CSS custom properties on `:root`. Dark mode is implemented by
attaching `data-theme="dark"` to the `<html>` element and overriding those
same variables in an `html[data-theme="dark"]` block. No class juggling, no
JavaScript colour assignments — the browser cascade does the work.

JavaScript's only job is to toggle one attribute and update one `aria-label`.
No persistence, no media-query detection, no framework.

---

## Structure

| File | Change |
|------|--------|
| `style.css` | Add `--color-nav-bg` variable (fix hardcoded nav rgba); add `html[data-theme="dark"]` override block; add colour transitions; add `.nav__theme-toggle` button styles |
| `index.html` | Insert `<button class="nav__theme-toggle">` with inline SVG sun + moon icons after the `<ul class="nav__links">` |
| `script.js` | Append theme-toggle event listener; toggle `data-theme` on `<html>`; update button `aria-label` |
| `tests/portfolio.test.js` | Add assertions for toggle button presence, aria-label value, and data-theme toggling |

---

## Key decisions

| Decision | Reason |
|----------|--------|
| `data-theme` on `<html>`, not `<body>` | Ensures the `<html>` background (visible on overscroll) also changes colour |
| Override CSS variables, not individual properties | Single override block covers every token consumer; zero risk of missing a colour |
| Fix hardcoded nav `rgba(255,255,255,0.92)` → `var(--color-nav-bg)` | The nav backdrop is the only colour not using a variable; must be variablised to respond to dark mode |
| Inline SVG for icons | No external assets, no icon font dependency; icons are crisp at all sizes |
| Icon = available action (not current state) | Sun icon = "click to go light" (shown in dark); Moon icon = "click to go dark" (shown in light) — common convention, matches `aria-label` wording |
| Transitions on `color`, `background-color`, `border-color` on `body` and `site-header` | Covers all token consumers without per-element transitions; `0.25s ease` is fast enough not to feel sluggish |

---

## Dependencies

```
T1 (CSS dark tokens + nav-bg fix)  ──┐
T2 (CSS transitions)                ──┼──> T5 (JS logic) ──> T6 (tests) ──> T7 (verify)
T3 (HTML button)                    ──┤
T4 (CSS button styles)              ──┘
```

T1, T2, T3, T4 are independent and can be done in parallel.
T5 requires T3 (button in DOM) and T1 (dark CSS exists).
T6 requires T5.
T7 requires all prior tasks.

---

## Risks and mitigations

| Risk | Mitigation |
|------|-----------|
| Nav backdrop stays white in dark mode | Fixed by variablising `--color-nav-bg` in T1 |
| Card shadow looks wrong in dark mode | `rgba(0,0,0,0.08)` is acceptable against dark bg; no change needed |
| Transition causes a flash on page load | No JS runs before DOM ready; default is light, so no flash |
| `aria-label` not announced on toggle | Use a `<button>` (native role) and update `aria-label` attribute directly in JS |
| Rapid clicks cause visual glitch | `data-theme` is a boolean toggle — idempotent; CSS transitions handle mid-flight gracefully |

---

## Spec coverage check

| Spec requirement | Covered by |
|-----------------|-----------|
| R1 — Toggle button in nav | T3, T4 |
| R2 — Light mode default | T1 (no `data-theme` on load = light) |
| R3 — Full dark colour scheme | T1 |
| R4 — Smooth transition | T2 |
| R5 — Icon reflects mode | T3 (two SVGs, one hidden), T5 (JS toggles visibility) |
| R6 — Keyboard + screen-reader a11y | T3 (`aria-label`), T4 (focus ring), T5 (updates label) |
| R7 — No regression | T1 (variables unchanged in light), T7 (visual verification) |
