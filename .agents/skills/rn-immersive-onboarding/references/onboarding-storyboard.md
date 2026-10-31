# Onboarding scene card

For each scene define:

1. User value in one sentence.
2. Visual hero with intended *meaning*, not decoration.
3. Enter/hold/exit states, plus reduced-motion static state.
4. Skip/back/next/permission semantics and persistence.
5. Offline/device-size fallback.
6. Acceptance test for restore after kill/relaunch.

Make page-to-page timing user-controlled; never block the skip action behind a transition.

