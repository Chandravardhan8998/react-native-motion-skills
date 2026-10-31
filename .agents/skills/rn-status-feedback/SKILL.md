---
name: rn-status-feedback
description: Create polished accessible confirmation, success, failure, pending, empty state and loading animations in React Native. Use for payment success, request submitted, sync completed or action failed; preserve truth of backend status.
---


# Transactional and status feedback

## Required project preflight

Before editing, invoke `rn-motion-audit` (or run `node ../rn-motion-audit/scripts/audit.mjs --project <app-root>` from this skill folder) unless a current-task audit for this app already exists. Check its results against the actual affected code, then state the compatible approach, prerequisites, fallback and risks. Do not auto-upgrade the app or install dependencies just to enable an effect.

Separate **business state** (idle/submitting/pending/success/failure/canceled) from **animation state**. Visuals must reflect confirmed state; a success burst is never proof of server success.

1. Map the app's existing async/state machine and retry/cancellation paths. Identify authoritative state source and screen lifecycle.
2. Design one meaningful signature moment: icon path/scale, concise message, supportive background accent; don't make users wait for decoration to finish.
3. Provide fallbacks for low power, reduced motion and missing particle/vector dependencies; text/icon remains visible even without animation.
4. Set `accessibilityRole`, live-region/announcement appropriate to platform, prevent duplicate announcements, and do not rely on color or confetti alone.
5. Handle navigation away, interrupted sequence, repeated callbacks, error-after-pending, timeouts and retry. Never mask a failure behind success animation.
6. Verify rapid state transitions and completion callbacks. Optionally integrate existing haptic helpers without introducing a new dependency just for this.

Read `references/status-state-machine.md` for a testable transition table. Starter component in `assets/StatusSuccess.tsx` is illustrative and must be adapted after compatibility review.

