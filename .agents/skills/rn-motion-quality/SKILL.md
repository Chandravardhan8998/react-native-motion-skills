---
name: rn-motion-quality
description: Review and validate React Native motion for dropped frames, main-thread work, interruption, memory, accessibility and regressions. Use for animation performance audits, testing, and final readiness checks.
---


# Motion quality gate

First inspect the changed files and the project's validation scripts. Do not claim production readiness based only on source inspection or simulator previews.

1. Run applicable lint, TS checks and tests already configured. Don't introduce unrelated config changes just to make a check pass.
2. Test in release/profile builds and on representative **real** iOS/Android devices where available. Record UI and JS frame rate, frame time/drops, heavy GPU usage, memory, battery/thermal and animation state interruption.
3. Check interactions under load: long lists, background fetch, concurrent network/UI updates, offline transitions, navigation stacks.
4. Test gesture cancellation, rapid taps, screen rotations, back navigation, returning from background and screen teardown.
5. Verify screen reader semantics and OS reduced-motion handling, dynamic type, text contrast, target size, and keyboard access where relevant.
6. Distinguish **measured**, **inferred** and **not tested**; if no device/tools, provide exact device test plan instead of a fake FPS number.
7. Compare before/after baseline. Flag regressions and simplest fix; prefer removing effect rather than shipping jank.

See `references/device-test-matrix.md` for reproducible cases and definition of done.

