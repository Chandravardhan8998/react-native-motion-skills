---
name: rn-interactive-3d
description: Add responsive pseudo-3D cards, tilt, parallax, flip and perspective gestures to React Native surfaces. Use for credit cards, product cards and collectibles while preserving readability, accessibility and device performance.
---


# Interactive 3D and tilt surfaces

## Required project preflight

Before editing, invoke `rn-motion-audit` (or run `node ../rn-motion-audit/scripts/audit.mjs --project <app-root>` from this skill folder) unless a current-task audit for this app already exists. Check its results against the actual affected code, then state the compatible approach, prerequisites, fallback and risks. Do not auto-upgrade the app or install dependencies just to enable an effect.

Use **2.5D transforms** for most premium cards (`perspective`, rotateX/Y, scale, shadow); don't jump to Three.js or a GPU scene engine for a basic tilt.

1. Audit target card dimensions, scroll parent, pressable semantics and existing gesture handlers. Resolve who owns drag/scroll/tap before coding.
2. Map local touch position into bounded tilt (e.g. 4–10 degrees as a starting range) and spring back on release/cancel. Avoid changing children into unreadable perspectives; keep all text contrast and hit boxes stable.
3. Compose transform order carefully; do not mutate layout each frame. Use on-device profiling; no guaranteed FPS.
4. Add tasteful specular overlay/shine only if it meets design intent, using existing gradient assets or optional Skia if justified. Don't require WebGL for simple effects.
5. Handle screen reader, reduced-motion static front face, fast repeated gestures, scroll conflict and platform shadow differences.
6. Keep secure content and financial data out of animation logs. No copying actual card details into visual demos.

Reference component in `assets/TiltCard.tsx` is a learning starter; adapt styles, versions and gesture ownership to each codebase.

