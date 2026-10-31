---
name: rn-premium-surfaces
description: Upgrade React Native cards, buttons, backgrounds, menus and panels with premium visual depth, gradients, lighting, materials, contrast and coherent surface hierarchy. Use for visually rich UI styling without requiring heavy GPU animations.
---

# Premium visual surfaces

## Required project preflight

Before editing, invoke `rn-motion-audit` (or run `node ../rn-motion-audit/scripts/audit.mjs --project <app-root>` from this skill folder) unless this task already has a fresh audit. Inspect the existing theme, typography, layout rules and reusable components; never replace an established design system with a brand clone.

1. Choose a named direction aligned to product personality: **precision**, **quiet luxury**, **expressive**, or **editorial**. Reuse brand colors, fonts, icons and spacing scales.
2. Create semantic surface hierarchy: background → raised panel → interactive surface → accent focus. Use texture/gradient/elevation only to communicate structure or interaction.
3. Prefer compositing with existing View, gradients, borders, shadows and modest overlay transforms. Use Skia only when a specific dynamic material requires it, after compatibility/performance review.
4. Provide light/dark, Android/iOS, high contrast, small-screen and reduced-transparency fallbacks as applicable; protect body text and hit targets from decorative layers.
5. Use art-direction references for metallic/glass/soft glow, but don't reproduce CRED or anyone else's branded UI assets.
6. Show before/after changes to one representative component and explain the reusable token edits. Check overdraw and layout on devices.

See `references/surface-materials.md` for surface language, examples and limits.
