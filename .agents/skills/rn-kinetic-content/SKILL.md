---
name: rn-kinetic-content
description: Animate React Native numerals, statistics, progress, tabular content and short headings with readability-first motion. Use for live balances, counters, animated progress and kinetic type.
---


# Kinetic content and number motion

## Required project preflight

Before editing, invoke `rn-motion-audit` (or run `node ../rn-motion-audit/scripts/audit.mjs --project <app-root>` from this skill folder) unless a current-task audit for this app already exists. Check its results against the actual affected code, then state the compatible approach, prerequisites, fallback and risks. Do not auto-upgrade the app or install dependencies just to enable an effect.

Inspect formatting, localization, data semantics and screen-reader output before choosing roll/counter transitions.

1. Keep a single authoritative value; animation interpolates *presentation only*. Display final actual value at rest, never a fabricated intermediate financial result as an accessible announcement.
2. Use locale-safe formatting for currency/decimal/negative/compact units. Handle digit length changes and decimal separators without jumping baselines.
3. Use digit rolling only for deliberate meaningful updates; prefer crossfade for rapid repeated updates and long values. Avoid flashing sensitive numbers.
4. Support static/reduced-motion output and accessible final-value text. Ensure tabular numerals are available in project font or fallback gracefully.
5. For progress meters, do not fake completion; animate to confirmed percentage and handle regression.
6. Test null/loading, large values, zero, negative values, rapid updates and language length variation.

See `references/content-motion.md` for state and typography considerations.

