---
name: rn-chart-motion
description: Animate React Native data visualizations, bars, radial meters, line reveals and financial/statistical dashboards. Use only when preserving numerical accuracy, axis meaning and chart accessibility.
---


# Data motion / premium dashboards

## Required project preflight

Before editing, invoke `rn-motion-audit` (or run `node ../rn-motion-audit/scripts/audit.mjs --project <app-root>` from this skill folder) unless a current-task audit for this app already exists. Check its results against the actual affected code, then state the compatible approach, prerequisites, fallback and risks. Do not auto-upgrade the app or install dependencies just to enable an effect.

Check which charting library is already installed, its rendering backend, data volume and accessibility. Reuse its native animation support first.

1. Keep values and axis mapping mathematically correct; any interpolation must preserve final scale and tick semantics.
2. Reveal series without hiding comparison context; avoid animating 1000s of path points on JS thread.
3. Implement tap/drag inspection with accessible equivalents and readable tooltips. Choose simple highlight/morph over 3D novelty that distorts data.
4. Support streaming updates without constant whole-chart replay; use per-datum stable keys.
5. Provide static chart and text summary for reduced motion, poor GPU budget or assistive tech.
6. Test outliers, missing data, zero, negatives, rapid updates and screen rotations.

See `references/chart-integrity.md` for design and validation rubric.

