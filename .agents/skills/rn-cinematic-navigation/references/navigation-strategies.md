# Choose navigation technique by stability

1. **Native-stack built-in** transitions: default for compatible routes; minimal dependencies and best platform integration.
2. **Local overlay/shared shell**: measure source/destination geometry and animate a single visual layer while route state stays real; requires robust interrupt cleanup, z-order and focus handling.
3. **Navigation library shared elements**: only if supported by installed versions/platform and feature flagged; check React Navigation docs for experimental status/limitations. Do not assume cross-navigator or native modal support.
4. **Full custom navigation renderer**: last resort; justified only for a distinct product requirement with proper lifecycle and back semantics.

Test: tap/open; fast double tap; swipe back partial/cancel; hardware Android back; modal/open over existing route; deep link directly into destination; screen rotation; app background/resume; screen reader focus; reduce motion; keyboard shown.

