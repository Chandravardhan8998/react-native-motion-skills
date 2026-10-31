---
name: rn-micro-interactions
description: Add tactile React Native micro-interactions to existing buttons, switches, segmented controls, tabs, favorites, toggles and pressable surfaces. Use for subtle press, hover and gesture feedback rather than full-screen animation.
---


# Micro-interactions

## Required project preflight

Before editing, invoke `rn-motion-audit` (or run `node ../rn-motion-audit/scripts/audit.mjs --project <app-root>` from this skill folder) unless a current-task audit for this app already exists. Check its results against the actual affected code, then state the compatible approach, prerequisites, fallback and risks. Do not auto-upgrade the app or install dependencies just to enable an effect.

Audit the affected component API, accessibility labels, disabled state, loading state, theme and navigation before editing.

- Prefer subtle `transform`/`opacity` and responsive feedback rather than animating layout on every tap.
- Press state: downscale/elevation shift, quick spring restore, optional compatible haptic cue; ensure touch targets remain stable and input latency low.
- Toggle state: clearly distinguish selected, unselected, pending and disabled, including non-color cues; no decorative motion that obscures state.
- Tab/selection: shared underline or thumb tracks the committed selection; permit reversal mid-flight.
- Progress affordances: optimistic only when rollback/error state is correctly represented; never visually claim a payment/action succeeded until confirmed by the actual flow.
- Make primitives reusable through existing AppButton/AppSurface/etc., not screen-specific forked components.
- Verify repeated rapid taps, double submit protection, keyboard/VoiceOver/TalkBack, and reduce-motion.

Read `references/micro-patterns.md` for the pattern checklist and acceptance tests.

