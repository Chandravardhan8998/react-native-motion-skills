---
name: rn-motion-tokens
description: Create or adapt React Native motion design tokens for duration, easing, spring presets, stagger, layering and reduced-motion settings. Use for repeated animation consistency, not a one-off screen tweak.
---


# Motion tokens and reusable primitives

## Required project preflight

Before editing, invoke `rn-motion-audit` (or run `node ../rn-motion-audit/scripts/audit.mjs --project <app-root>` from this skill folder) unless a current-task audit for this app already exists. Check its results against the actual affected code, then state the compatible approach, prerequisites, fallback and risks. Do not auto-upgrade the app or install dependencies just to enable an effect.

Audit existing theme, color, spacing and motion utilities first. Extend the project's native token conventions; avoid launching a competing design system.

1. Introduce semantic tokens for **instant, quick, standard, expressive** timing; use-cases, not arbitrary global magic numbers. Suggested *starting points* (not universal rules): press 90–150ms; small feedback 160–260ms; medium transitions 240–400ms; scene choreography 350–650ms.
2. Define semantic springs (**snappy**, **settle**, **soft**) with explicit damping/stiffness/mass and document interruption behavior. Tune on devices; do not claim these defaults guarantee frame rate.
3. Define choreography tokens: entrance delays, small item stagger, total animation cap, z-index/overlay conventions, velocity handoff and cancellation. Store motion constants close to existing design tokens.
4. Prefer semantic exports such as `motion.press`, `motion.screenEnter`, `motion.feedback`, `motion.reduce` rather than hardware- or brand-specific names.
5. Offer a reduced-motion equivalent (opacity or no transition), including static fallback for essential status. Never globally override the OS's reduce-motion setting.
6. Provide example usage in two components, tests for token shape/behavior if a test framework exists, and migration notes if replacing hardcoded values.

See `references/motion-token-contract.md` for token interface and a starter specification.

