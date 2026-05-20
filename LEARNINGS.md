# LEARNINGS.md
# Patterns and pitfalls discovered along the way

*This file starts empty and grows during Test & Tune loops. Each entry should note what was learned, why it happened, and what to do differently next time.*

## Template for an entry
```
### [Date] — [Short title]
**What happened:** ...
**Why:** ...
**Next time:** ...
```

---

### 2026-05-20 — Collect content before starting any build work
**What happened:** Project descriptions, email, and LinkedIn were left as placeholders throughout the entire build because real content wasn't available at Stage 4. The site went live with placeholder GitHub links pointing to nonexistent repos.
**Why:** Content writing (bio, project copy) is slow and often blocks the builder. It was deferred to avoid stalling.
**Next time:** Resolve OQ1 (project list) before Stage 4 begins — add a hard gate in the Task list: "T3 is not done until real project URLs are confirmed." Placeholders are fine during build but should be flagged as a pre-ship blocker, not a post-ship task.

### 2026-05-20 — Lighthouse tool excludes Performance; trace perf separately
**What happened:** The Lighthouse MCP tool does not report a Performance score — it covers Accessibility, Best Practices, SEO only. The Performance score for AC7 had to be inferred from the performance trace (LCP 39ms, CLS 0.00).
**Why:** Tool limitation not known until Stage 5.
**Next time:** Run `performance_start_trace` during Stage 5 alongside the Lighthouse audit. Record the explicit Core Web Vitals (LCP, CLS, FID) as the AC7 evidence rather than inferring from the score.

---
*Add entries here whenever a Test & Tune loop finds a problem that required looping back.*
