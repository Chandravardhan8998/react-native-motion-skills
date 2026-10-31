---
name: rn-immersive-onboarding
description: Create premium React Native onboarding and walkthrough experiences with page choreography, hero artwork, gesture-driven progress and contextual education. Use for welcome tours and feature discovery, not every app launch.
---


# Immersive onboarding

## Required project preflight

Before editing, invoke `rn-motion-audit` (or run `node ../rn-motion-audit/scripts/audit.mjs --project <app-root>` from this skill folder) unless a current-task audit for this app already exists. Check its results against the actual affected code, then state the compatible approach, prerequisites, fallback and risks. Do not auto-upgrade the app or install dependencies just to enable an effect.

Inspect existing onboarding state, persistence, navigation, permission prompts and first-run logic; don't re-show on every mount.

- Design each scene to convey one clear value proposition. Use motion to demonstrate product behavior, not just decorate text.
- Favor sparse transforms, depth, mask reveals and progress indicators over long intro videos; offer skip and back controls.
- Avoid auto-triggering OS permission dialogs until contextual justification and user action.
- Make navigation, focus order, skip, and completion accessible. Persist completion only after successful flow transition.
- Ensure media/assets are bundled appropriately and won't fail when offline. Maintain low-memory fallback.
- Test app restarts, deep links, partial progress, small displays, large type and reduced motion.

Use `references/onboarding-storyboard.md` to specify the narrative and state transition before implementation.

