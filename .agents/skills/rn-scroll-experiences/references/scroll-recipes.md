# Scroll recipe selection

| Pattern | Preferred mechanism | Guardrail |
|---|---|---|
| Hero parallax | translateY interpolated from scroll offset | keep heading readable |
| Collapsing header | scale/translate/opacity | avoid per-frame layout changes |
| Progress rail | scaleX from normalized scroll progress | avoid divide by zero on short pages |
| List reveal | small one-time opacity/translation | don't replay on virtualization remount unless intentional |
| Sticky CTA | native sticky/layout + animated opacity | safe area and keyboard |
| Pinned media | fixed overlay with measured boundaries | accessibility focus not lost |

For large lists keep virtualization and per-cell work minimal. For RTL, nested scrolling and dynamic font tests, reason from app screen constraints, not screenshots alone.

