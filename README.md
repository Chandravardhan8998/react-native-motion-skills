# Premium Motion Skills for React Native — Codex edition

A **reusable, audit-first motion design skill pack** for making existing React Native / Expo apps feel refined, responsive, and cinematic. Inspired by high-quality consumer products and fintech craft, **not** a clone of any specific brand.

It does **not** turn every project into a fixed CRED-style theme. It adapts to the current codebase's color system, design tokens, UX, dependencies, performance envelope, and platform constraints.

## What is included

| Skill (`$name`) | Job |
|---|---|
| `$rn-motion-audit` | Read-only app feasibility scan and implementation risk report |
| `$rn-premium-motion` | Orchestrate a cohesive motion refresh, **audit first** |
| `$rn-motion-tokens` | Shared durations, springs, easing, stagger and reduced motion |
| `$rn-premium-surfaces` | Premium surfaces, layered depth, gradient, material and color |
| `$rn-micro-interactions` | Buttons, selection, toggles, chips, tactile tap feedback |
| `$rn-status-feedback` | Async status, success, failure, processing and completion |
| `$rn-cinematic-navigation` | Hero continuity, expanding cards, depth and modal transitions |
| `$rn-interactive-3d` | Perspective tilt, 2.5D cards, light/shadow and spring-back |
| `$rn-gesture-interactions` | Swipe, drag, sheets, thresholds and interruptible physics |
| `$rn-scroll-experiences` | Scroll-linked parallax, reveals, sticky and collapsing headers |
| `$rn-kinetic-content` | Rolling/animated numbers, progress, lively content |
| `$rn-visual-effects` | Gradient, glow, mask, particle, shader and Skia options |
| `$rn-motion-choreography` | Staggered cinematic scene timelines |
| `$rn-delightful-forms` | Focus, inline validation, keyboard and subtle form feedback |
| `$rn-chart-motion` | Data-safe animated charts and rich dashboards |
| `$rn-immersive-onboarding` | Hero onboarding, tutorials, guided experiences |
| `$rn-motion-quality` | Profiling, reduced motion, usability and release readiness |

Each skill is in `.agents/skills/<name>/SKILL.md`, with optional small reference files. A standalone Node-based project audit script and 3 reference TSX components are also included (and duplicated inside relevant skill `assets/` folders so installed skills remain self-contained).

## Install

Requires **Node.js 18+** for the helper scripts (no npm packages needed). Skill text can be used without Node.

**Project-local (recommended)**

From the unzipped pack:

```bash
node tooling/install.mjs --project /path/to/your-react-native-app
```

This copies **only** skill folders into `/path/to/app/.agents/skills/`. It does **not** install animation libraries, modify native config, or add/change `AGENTS.md`. Existing same-name skill folders are **skipped**, not replaced.

**Global (every Codex project)**

```bash
node tooling/install.mjs --global
```

This installs under `~/.agents/skills/`. Skills can be discovered and invoked in Codex CLI / IDE via `$skill-name` or `/skills`; Codex may also select one based on its description. Restart Codex if the skills don't show up. See official [Codex skill docs](https://learn.chatgpt.com/docs/build-skills).

**No-copy alternative:** copy the pack's `.agents/skills` directory into your repo. Take care not to overwrite any existing skills.

## Audit first, then implement

### 1. Read-only audit

In Codex:

```text
$rn-motion-audit
Scan this React Native project before changes. Identify current theme tokens,
reusable components, navigation, New Architecture status, animation dependencies,
risks and safe fallback paths. Output a feasibility matrix. Do not edit files.
```

Or run the standalone scanner directly:

```bash
node .agents/skills/rn-motion-audit/scripts/audit.mjs \
  --project . --format markdown
```

For monorepos, the scanner finds React Native/Expo manifests within a bounded depth. Select an app with `--app apps/mobile`. Use `--format json` for machine-readable output. To save deliberately, `--out /your/path/report.md` writes only to the explicitly supplied path and will refuse to overwrite an existing file.

The scan checks **declared** versions and configuration; it does not run native builds. It can return `UNKNOWN` or `CONDITIONAL` when flags depend on dynamic settings or packages are hoisted. The agent must also inspect the actual source and navigator tree.

### 2. Build one premium interaction

```text
$rn-premium-motion
Audit this project, then add a premium card-to-details transition on the
MyCards screen. Reuse the existing tokens/components, do not rewrite navigation,
and include an accessible reduced-motion fallback. Explain compatibility first.
```

Or more focused:

```text
$rn-interactive-3d
Inspect the card component and scroll gestures first. Build a subtle 3D tilt
card with spring return, without changing the payment or business logic.
```

```text
$rn-status-feedback
Implement request submitted → processing → confirmed success/error animation.
Use the existing async status; don't show success before the backend confirms.
```

### 3. Validate

```text
$rn-motion-quality
Review the new motion for interruptions, accessibility and performance.
Run existing checks. Separate measured device results from assumptions.
```

## Compatibility and adoption rules

- **Never upgrade React Native, Reanimated or navigation automatically.** The audit recommends options; the actual implementation uses project-specific compatible versions.
- **Reanimated 4 requires React Native New Architecture and `react-native-worklets`**. The exact RN/Reanimated/Expo version combination still needs compatibility verification. In legacy apps, prefer existing tools or a carefully selected older compatibility path.
- **Shared-element navigation remains experimental** in React Navigation's published documentation. Default transitions or a carefully tested overlay can be safer.
- **Skia is optional**, not required for basic animations. Use it only when custom graphics justify it.
- **Access and semantics matter:** status must be true to the backend; controls need accessibility and reduced-motion support; animation shouldn't delay critical flows.
- **FPS is measured on devices**, not promised by the skill. Aim for smooth interactions within the target device's frame budget.

## Project instructions (optional)

See `AGENTS.motion.example.md`. Merge its relevant lines into your **existing** root `AGENTS.md`, rather than replacing project guidance. The pack does not overwrite any `AGENTS.md`.

## Reference examples

`examples/` contains deliberately small TypeScript components for a pressable, tilt card, and state-driven success feedback. **They are not auto-injected.** They're source illustrations to adapt to a project's React Native version, design system and accessibility conventions after the audit.

## Validation

```bash
node tooling/check-skills.mjs
node --test tests/*.test.mjs
```

## Maintenance & safety

Skills contain plain Markdown instructions and optional resources; this pack's audit script only reads public project metadata and file **names** plus allowlisted app/native config. It avoids `.env` and credentials. It has no network calls. Installation copies only skills, skips existing folders, and doesn't mutate project app code.

For a team, review changes before merging and measure animation regressions on representative Android and iOS devices. The skills intentionally keep generated work project-specific rather than embedding a fixed UI kit.

## Primary documentation

- [OpenAI Codex Agent Skills](https://learn.chatgpt.com/docs/build-skills)
- [React Native Reanimated setup and architecture](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/)
- [Reanimated compatibility matrix](https://docs.swmansion.com/react-native-reanimated/docs/guides/compatibility/)
- [React Navigation shared-element limitations](https://reactnavigation.org/docs/shared-element-transitions/)
- [React Native performance overview](https://reactnative.dev/docs/performance.html)
- [Reanimated reduced-motion guidance](https://docs.swmansion.com/react-native-reanimated/docs/device/useReducedMotion/)
