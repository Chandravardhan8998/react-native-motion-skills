---
name: rn-cinematic-navigation
description: Design cinematic React Native navigation transitions: card-to-detail expansion, hero continuity, depth and modal reveals. Use when screen-to-screen motion is needed and routing must remain correct.
---


# Cinematic navigation

## Required project preflight

Before editing, invoke `rn-motion-audit` (or run `node ../rn-motion-audit/scripts/audit.mjs --project <app-root>` from this skill folder) unless a current-task audit for this app already exists. Check its results against the actual affected code, then state the compatible approach, prerequisites, fallback and risks. Do not auto-upgrade the app or install dependencies just to enable an effect.

Start by mapping the actual navigator tree (Expo Router, native stack, JS stack, tabs, modals) and Android/iOS back behavior. Confirm destination lifecycle, deep links, navigation state restoration and screen-reader focus.

1. Prefer built-in stable native navigation transitions when adequate. If custom, implement a single card-to-detail proof with a reversible overlay/shared visual while navigation and source state remain authoritative.
2. **Do not assume Reanimated shared-element transitions are production-stable.** Current React Navigation docs describe experimental feature flags, supported stacks and limitations; check installed version and app architecture before relying on them.
3. Animate a small set of coherent properties: source visual geometry, dimmer/opacity, corner radius, scale/translation. Retain stable identity keys; don't animate network-loaded content as if it were static.
4. Handle interactive back, gesture cancel, rapid repeat navigation, deep links, tab switches, modal dismissal, app resume and orientation changes.
5. Keep outgoing/incoming screen accessibility and touch ownership correct during overlap. Make a reduced-motion path with direct navigation.
6. Measure transition stutter on actual navigation flows. Provide a stable fallback when platform parity cannot be proven.

Read `references/navigation-strategies.md` for decision tree and failure modes.

