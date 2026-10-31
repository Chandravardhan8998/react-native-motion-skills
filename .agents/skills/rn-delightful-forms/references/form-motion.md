# Form animation acceptance cases

- Autofill and controlled inputs correctly retain values.
- Error appears when validation state says invalid, not when a shake completes.
- No `setState` per animation frame for a simple border/label effect.
- Keyboard and safe area remain correct, particularly when helper/error text changes height.
- Password visibility toggle never resets value or focus.
- Pressing submit twice cannot execute two requests when existing logic blocks it.
- Screen-reader focus/label/error announcement works.
- OS reduced-motion setting displays static, complete helper/error states.

