---
name: rn-gesture-interactions
description: Build robust React Native gesture-driven interactions like swipe actions, draggable cards, bottom sheets, elastic sliders and pull-to-refresh. Use for physics-driven gestures, nested scrolling and interruption handling.
---


# Gesture interaction patterns

## Required project preflight

Before editing, invoke `rn-motion-audit` (or run `node ../rn-motion-audit/scripts/audit.mjs --project <app-root>` from this skill folder) unless a current-task audit for this app already exists. Check its results against the actual affected code, then state the compatible approach, prerequisites, fallback and risks. Do not auto-upgrade the app or install dependencies just to enable an effect.

Before implementing, inspect existing Gesture Handler version, root wrapper, scroll containers, sheets, pan responders, navigation gestures and accessible alternatives.

- Plan ownership and gesture arbitration (tap vs pan, vertical scroll vs horizontal swipe, modal vs screen-back gesture).
- Use Gesture Handler + Reanimated when compatible; existing native/Animated alternatives are acceptable for simpler or older projects.
- Make gesture thresholds, velocity, overscroll and snap points explicit and adjustable; don't trap touches or block OS gestures.
- Interrupt safely: cancellation springs to a valid state, backgrounding does not leave objects stuck, accessibility actions duplicate essential swipes.
- Apply haptics at meaningful thresholds only; avoid repeated feedback during continuous motion.
- Test slow/fast swipes, finger release outside bounds, nested lists, Android back, small screens and reduced motion.

Use `references/gesture-contracts.md` to document recognizers, thresholds and cancel semantics before coding.

