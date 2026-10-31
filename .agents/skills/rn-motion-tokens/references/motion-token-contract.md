# Motion token contract (adapt, do not paste blindly)

Suggested TypeScript shape:

```ts
export const motion = {
  duration: { instant: 0, press: 120, quick: 180, standard: 280, expressive: 420 },
  spring: {
    snappy: { damping: 22, stiffness: 360, mass: 0.9 },
    settle: { damping: 24, stiffness: 230, mass: 1 },
    soft: { damping: 25, stiffness: 150, mass: 1.1 },
  },
  stagger: { compact: 35, relaxed: 65 },
} as const;
```

Examples are initial design constants only. Document platform behavior, OS reduced motion, cancel semantics, token ownership, and tested supported ranges. Consider speed as perception and accessible user control, not just duration. Don't wire these to a second theme provider when one already exists.

