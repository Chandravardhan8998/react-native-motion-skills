---
name: rn-premium-motion
description: Plan and implement a cohesive premium motion upgrade across an existing React Native app. Use for polished CRED-like quality, motion design systems, multi-screen animation work, and orchestrating specialized RN motion skills; always audit first.
---


# Premium motion director

Create a coherent motion language, not a collection of unrelated effects. Aim for high-end fintech-level craft without copying another company's proprietary brand, layouts, assets, or motion sequences.

## Required preflight

1. Activate `rn-motion-audit` or run its script at `../rn-motion-audit/scripts/audit.mjs` relative to this skill folder. Inspect relevant components by hand; do not trust the automated scan alone.
2. Read existing `AGENTS.md` instructions and repository conventions. Do not overwrite tokens, theme files, navigation architecture, or dependency versions without a justified plan.
3. Build a **motion inventory** listing interaction, purpose, existing state, desired change, visual hierarchy and reduced-motion alternative.
4. Choose at most 1–2 signature moments per screen; the rest should support clarity and feedback. Keep the user's brand and information hierarchy intact.
5. Route work to the *smallest relevant specialization*: `rn-motion-tokens`, `rn-premium-surfaces`, `rn-micro-interactions`, `rn-status-feedback`, `rn-cinematic-navigation`, `rn-interactive-3d`, `rn-gesture-interactions`, `rn-scroll-experiences`, `rn-kinetic-content`, `rn-visual-effects`, `rn-motion-choreography`, `rn-delightful-forms`, `rn-chart-motion`, or `rn-immersive-onboarding`. Read those SKILL.md files **only when needed**.
6. For any implementation, first provide: **effect → UX purpose → source components → dependencies/compatibility → fallback → test**. Prefer existing libs and local components; do not add Skia/Rive/video for simple transforms.
7. Implement one reversible vertical slice, test it, and expand only if it meets the project's performance/accessibility constraints. Use `rn-motion-quality` before claiming readiness.

## Definition of done

Existing business logic/navigation stay correct; no interactions become inaccessible; animations are interruptible and deterministic; loading and error states work; reduced motion is respected; representative Android/iOS devices are checked where available. Report untested claims and caveats explicitly.

Read `references/art-direction.md` when a whole-app visual refresh is requested.

