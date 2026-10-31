# Gesture design specification

Before changing source, record:

- Hit area and recognizer type (tap, pan, fling, long press)
- Active/fail offsets, direction and threshold; low-level numbers tied to device density where appropriate
- Simultaneous vs exclusive vs race relation with parent scroll/nav gestures
- Snap/settle destinations and velocity handoff
- Cancellation/interruption (including app background/unmount)
- Alternative action for screen reader, keyboard and reduced-motion scenarios
- Haptic milestones and repeat-rate limiting
- Actual downstream callback (no accidental duplicate state mutation)

Default to original app behavior when conflict is unresolved; never swallow scrolling to produce a small decorative tilt.

