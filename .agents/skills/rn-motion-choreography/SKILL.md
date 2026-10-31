---
name: rn-motion-choreography
description: Coordinate multiple React Native animations into purposeful staggered entrances, focus sequences and transition timelines. Use for cinematic hierarchy without random animation overload.
---


# Choreography and sequencing

## Required project preflight

Before editing, invoke `rn-motion-audit` (or run `node ../rn-motion-audit/scripts/audit.mjs --project <app-root>` from this skill folder) unless a current-task audit for this app already exists. Check its results against the actual affected code, then state the compatible approach, prerequisites, fallback and risks. Do not auto-upgrade the app or install dependencies just to enable an effect.

Define *which information users should notice first*. Sequence by hierarchy: primary content → supporting metadata → actions. Never delay an essential action just to showcase animation.

- Use existing motion tokens. Limit one signature beat per major interaction and short supporting beats.
- Set a clear start trigger, stable end state and interruption/cancel behavior. On state changes, direct all animated values to the current authoritative target.
- Prefer a few dependent cues over ten unrelated offsets; aim for readable timing, predictable re-entry and no replay on irrelevant rerenders.
- Plan overlap for reduced-motion mode: content should render immediately, not wait on arbitrary timers.
- Avoid unmounted update races; cleanup subscriptions and cancel callbacks when screens leave.
- Test slow devices, back-forward navigation, rapid taps, list recycling and accessibility focus order.

Use `references/choreography-board.md` to storyboard the 0–600ms timeline before writing animations.

