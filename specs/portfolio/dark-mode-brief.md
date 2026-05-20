# Brief — Light / Dark Mode Toggle
*Stage 1 — Clarify · v1.0 · 2026-05-20*

## Problem
The portfolio site renders only in light mode. Some visitors prefer dark mode,
and the absence of a toggle is a minor but visible gap for a technically
credible portfolio.

## Audience
Same as the main site — recruiters, hiring managers, and potential clients
visiting `https://spalanivelu1989.github.io/portfolio`.

## What we're building
A sun/moon icon button placed in the top-right corner of the existing nav bar.
Clicking it switches the entire page between light and dark colour schemes.

## Behaviour rules
| Rule | Detail |
|------|--------|
| Default mode | Light — all visitors start in light mode |
| Persistence | None — resets to light on every page load |
| Toggle location | Top-right of `.nav`, after the existing nav links |
| Toggle style | Icon button (☀ / ☾ or equivalent SVG); no text label required |
| Transition | CSS colour transition so the switch feels smooth, not jarring |

## Success criteria
1. Clicking the button switches the page visibly between light and dark.
2. The button icon updates to reflect the current mode.
3. All text remains readable (sufficient contrast) in both modes.
4. The toggle is keyboard-accessible (focusable, activates on Enter/Space).
5. Existing Lighthouse Accessibility score stays at 100.

## Out of scope
- System `prefers-color-scheme` detection
- Persisting the user's choice across sessions
- Per-section or per-component theming
- Any changes to layout, content, or typography

## Constraints
- Must not break the existing CSS or JavaScript
- Must pass WCAG 2.1 AA contrast in both modes (CONSTITUTION rule 3)
- No new dependencies — pure CSS + vanilla JS only
