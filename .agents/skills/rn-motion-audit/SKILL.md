---
name: rn-motion-audit
description: Audit existing React Native or Expo projects for animation feasibility, dependency compatibility, existing design tokens, navigation, performance and accessibility before modifying UI. Use for any feasibility scan or requested preflight; do not implement animations.
---


# Project motion audit (read-only)

Use this skill *before* proposing or building complex premium animations in an existing React Native app. Do not install packages, edit files, change native configuration, or migrate React Native during the audit.

1. Find the actual app root; in monorepos do not mistake the workspace root for the mobile app. If there are multiple apps, identify the requested target.
2. Run `node <skill-directory>/scripts/audit.mjs --project <app-or-monorepo-path> --format markdown` (the script is read-only). If Node is unavailable, inspect `package.json`, app configs, and navigation/theme code manually. To consume structured output, use `--format json`.
3. Inspect real source files for the requested surfaces, adjacent screens, design tokens, typography, state, existing animation wrappers, accessibility, and tests. The script's filename scan is *only a heuristic*, not proof that something works.
4. Determine Expo managed/prebuild/bare RN, exact installed package versions, explicit New Architecture flags, routing, Babel/Worklets plugin configuration, native constraints, and actual navigation nesting. If unknown, report unknown.
5. Consult `references/feasibility-matrix.md`; choose **ready**, **conditional**, **blocked**, or **unknown** for every proposed effect with factual justification. Reanimated 4 requires New Architecture and worklets; Reanimated 3 is a legacy compatibility path. Check the installed-version compatibility table, not an assumed universal version.
6. Produce the `Motion Feasibility Report`: baseline evidence; reusable components/tokens; per-effect feasibility and alternatives; migration risk; performance/accessibility risks; smallest reversible proof of concept; verification plan.
7. Do not change files until the user requests implementation. When implementation is already requested, the owning implementation skill can proceed *after* the audit, using its results and respecting existing project permissions.

Never promise 60/120 FPS without device measurement. Avoid reading `.env`, credentials, or unrelated source secrets.

