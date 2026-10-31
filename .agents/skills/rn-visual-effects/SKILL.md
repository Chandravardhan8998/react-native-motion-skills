---
name: rn-visual-effects
description: Add restrained custom React Native visuals such as luminous borders, glows, gradients, masked reveals, particles and shader effects. Use when basic transforms cannot achieve a premium visual direction.
---


# Visual effects and GPU layers

## Required project preflight

Before editing, invoke `rn-motion-audit` (or run `node ../rn-motion-audit/scripts/audit.mjs --project <app-root>` from this skill folder) unless a current-task audit for this app already exists. Check its results against the actual affected code, then state the compatible approach, prerequisites, fallback and risks. Do not auto-upgrade the app or install dependencies just to enable an effect.

Audit installed graphics libraries and UI surfaces. Don't add Skia, Rive or native shaders without a reason that simple views/gradients cannot satisfy.

1. Choose effect and budget: static gradient, animated gradient, tiny reward particles, soft glow, progress trail, light sweep, masking, noise/texture.
2. Start with compositor-friendly transforms and existing gradient/asset components. Use Shopify Skia for bespoke canvas/shader work *only after* checking compatibility and perf on target devices.
3. Limit animated area, layer count, overdraw and shader compilation work; avoid full-screen continuous blur/noise on low-end Android.
4. Keep semantic content and interactive components outside decorative drawing surfaces; ensure contrast, screen-reader labels and touch events survive.
5. Provide a static SVG/PNG/gradient fallback and a reduced-motion alternative; never rely on particles alone for status.
6. Verify battery/thermal behavior, app background/resume, platform differences and asset licenses.

Read `references/effects-budget.md` before implementing GPU-heavy effects.

