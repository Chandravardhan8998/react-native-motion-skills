---
name: rn-delightful-forms
description: Make React Native forms feel premium with clear focus transitions, validation feedback, animated helper text, progress and keyboard-aware flows. Use for onboarding, checkout and data entry, without changing validation rules.
---


# Delightful but trustworthy form motion

## Required project preflight

Before editing, invoke `rn-motion-audit` (or run `node ../rn-motion-audit/scripts/audit.mjs --project <app-root>` from this skill folder) unless a current-task audit for this app already exists. Check its results against the actual affected code, then state the compatible approach, prerequisites, fallback and risks. Do not auto-upgrade the app or install dependencies just to enable an effect.

Study form library, validation schema, keyboard handling, error messaging, field order and submission logic first.

1. Animate focus/blur with restrained label, border, helper and icon transitions; avoid jumping layout when error text arrives.
2. State meanings must be unambiguous: untouched, focused, editing, valid, invalid, submitting, server rejected.
3. Do not trigger noisy error animation on each keystroke; retain existing validation trigger rules.
4. Provide respectful error attention (small shift/color/supporting message), not endless shakes; screen readers should receive actual error details.
5. Respect keyboard, dynamic type, RTL, autofill, password managers, Android hardware back and reduced motion.
6. Confirm no regressions in submit disable rules, back navigation, validation and field persistence.

Read `references/form-motion.md` for implementation acceptance cases.

