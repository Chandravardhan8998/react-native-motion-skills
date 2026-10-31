---
name: rn-scroll-experiences
description: Create premium scroll-based React Native experiences with parallax, collapsing headers, sticky transforms, reveal-on-scroll and rich lists. Use when scroll position drives cinematic yet readable motion.
---


# Scroll-driven experience

## Required project preflight

Before editing, invoke `rn-motion-audit` (or run `node ../rn-motion-audit/scripts/audit.mjs --project <app-root>` from this skill folder) unless a current-task audit for this app already exists. Check its results against the actual affected code, then state the compatible approach, prerequisites, fallback and risks. Do not auto-upgrade the app or install dependencies just to enable an effect.

Profile the *actual* scroll container: `ScrollView`, `FlatList`, FlashList or nested navigation. Prefer virtualization for large data, and never swap an optimized list for an unbounded ScrollView solely to enable effects.

1. Choose a visual story: parallax hero, sticky category/tab bar, item reveal, shrinking header, scroll progress, pinned CTA.
2. Drive continuous position-dependent transforms from a UI-thread shared value and scroll handler when supported; avoid JS `setState` on every frame.
3. Keep sticky controls keyboard/screen-reader reachable and avoid scroll-jumping caused by layout height mutation.
4. For paginated content, use stable IDs and per-item entrance rules, not one massive stagger per re-render.
5. Respect reduce motion (static hero/layout) and rendering constraints on Android GPUs.
6. Validate at 0%, 50%, 100% scroll, very short content, dynamic type, refresh, deep links and restore position.

See `references/scroll-recipes.md` for a conservative property/technique matrix.

