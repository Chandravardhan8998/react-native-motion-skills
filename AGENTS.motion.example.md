# Optional AGENTS.md addition — Premium RN Motion

Merge these policies into the app's existing `AGENTS.md` after inspecting local rules.
Do not discard project-specific naming, styling, lint or navigation conventions.

## React Native motion changes

- Audit affected screens and animation compatibility first with `$rn-motion-audit`.
- Keep design tokens, theme and existing reusable components authoritative.
- Keep business state / async truth separate from decorative animation state.
- Prefer native-stack transitions and compositor-friendly transform/opacity;
  use existing compatible Reanimated/Gesture Handler when useful.
- Do not add new libraries, change native build settings or migrate React Native
  purely for visual polish without explaining the trade-off and getting approval
  if the change exceeds the request.
- All motion must be interruptible, support reduced-motion and keep essential
  controls accessible; use visual cues other than color alone.
- Before calling work done, run existing TS/lint/test checks and report what
  was / wasn't tested on real devices. Never invent FPS measurements.
- Implement one reversible screen/surface first, then expand only with evidence.
