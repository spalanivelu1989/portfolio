# Tasks — Light / Dark Mode Toggle
*Stage 3 — Assemble · v1.0 · 2026-05-20*
**Source:** `specs/portfolio/dark-mode-plan.md` v1.0

---

## Task list

### T1 — CSS: dark token overrides + nav-bg variable [P]
**File:** `style.css`
**What to do:**
1. In `:root`, replace the hardcoded `background: rgba(255,255,255,0.92)` on `.site-header` with a new variable `--color-nav-bg: rgba(255, 255, 255, 0.92)`.
2. On `.site-header`, change `background: rgba(255,255,255,0.92)` → `background: var(--color-nav-bg)`.
3. Add an `html[data-theme="dark"]` block after `:root` that overrides all 9 colour variables plus `--color-nav-bg`:
   ```css
   html[data-theme="dark"] {
     --color-bg: #0d1117;
     --color-bg-alt: #161b22;
     --color-text: #e6edf3;
     --color-text-muted: #8b949e;
     --color-accent: #3b82f6;
     --color-accent-hover: #60a5fa;
     --color-border: #30363d;
     --color-tag-bg: #1f2937;
     --color-tag-text: #93c5fd;
     --color-nav-bg: rgba(13, 17, 23, 0.92);
   }
   ```
**Done when:** Adding `data-theme="dark"` to `<html>` in DevTools turns the page dark.
**Depends on:** nothing · **Parallel:** yes

---

### T2 — CSS: colour transitions [P]
**File:** `style.css`
**What to do:**
Add transition properties to `body` and `.site-header` so colour switches animate:
```css
body {
  transition: background-color 0.25s ease, color 0.25s ease;
}
.site-header {
  transition: background 0.25s ease, border-color 0.25s ease;
}
```
**Done when:** Toggling `data-theme` in DevTools produces a smooth fade instead of an instant snap.
**Depends on:** nothing · **Parallel:** yes

---

### T3 — HTML: toggle button in nav [P]
**File:** `index.html`
**What to do:**
Insert the following button immediately after `</ul>` inside `<nav class="nav">`:
```html
<button class="nav__theme-toggle" aria-label="Switch to dark mode" type="button">
  <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
  <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" hidden>
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
</button>
```
The moon icon is shown by default (light mode → available action is "go dark").
The sun icon is hidden by default (`hidden` attribute), shown only in dark mode.
**Done when:** Button appears in the nav at desktop and mobile widths.
**Depends on:** nothing · **Parallel:** yes

---

### T4 — CSS: toggle button styles [P]
**File:** `style.css`
**What to do:**
Add a new rule block for `.nav__theme-toggle`:
```css
.nav__theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: var(--radius);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: color 0.15s;
  flex-shrink: 0;
}

.nav__theme-toggle:hover {
  color: var(--color-accent);
}
```
**Done when:** Button renders as a clean icon button in the nav with no default browser styling, correct size, and hover colour change.
**Depends on:** nothing · **Parallel:** yes

---

### T5 — JS: toggle logic
**File:** `script.js`
**What to do:**
Append the following inside the existing IIFE (after the IntersectionObserver block):
```js
var themeToggle = document.querySelector('.nav__theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', function () {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      themeToggle.setAttribute('aria-label', 'Switch to dark mode');
      themeToggle.querySelector('.icon-moon').removeAttribute('hidden');
      themeToggle.querySelector('.icon-sun').setAttribute('hidden', '');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggle.setAttribute('aria-label', 'Switch to light mode');
      themeToggle.querySelector('.icon-moon').setAttribute('hidden', '');
      themeToggle.querySelector('.icon-sun').removeAttribute('hidden');
    }
  });
}
```
**Done when:** Clicking the button toggles dark mode, the icon swaps, and `aria-label` updates. Rapid clicks leave the page in a consistent state.
**Depends on:** T3 · **Parallel:** no

---

### T6 — Tests: toggle button assertions
**File:** `tests/portfolio.test.js`
**What to do:**
Add test cases that verify:
1. A button with class `nav__theme-toggle` exists in the DOM.
2. It has `aria-label="Switch to dark mode"` by default.
3. It contains an SVG with class `icon-moon` (visible by default).
4. It contains an SVG with class `icon-sun` (hidden by default).
**Done when:** All new tests pass alongside the existing 27.
**Depends on:** T3, T5

---

### T7 — Verify all 12 acceptance criteria
**What to do:**
Open the site in a browser and manually check each AC:
- [ ] AC1: Toggle visible in nav at 1280px and 375px
- [ ] AC2: Fresh load = light mode
- [ ] AC3: Click → dark (all sections)
- [ ] AC4: Click again → light (full revert)
- [ ] AC5: Icon changes on each click
- [ ] AC6: `aria-label` updates after each click
- [ ] AC7: Tab to toggle, Enter/Space activates, focus not lost
- [ ] AC8: Reload in dark → resets to light
- [ ] AC9: Rapid clicks → consistent state
- [ ] AC10: Dark mode contrast passes WCAG AA (check with DevTools / axe)
- [ ] AC11: Light mode looks identical to before
- [ ] AC12: Lighthouse Accessibility = 100
**Done when:** All 12 ACs checked off.
**Depends on:** T1, T2, T3, T4, T5, T6
