# Motion quality test matrix

Record device/model/OS/build variant/library versions. Compare with baseline and label measurements.

| Scenario | Test | Pass condition |
|---|---|---|
| Release/profile render | repeat animation 20x | no repeatable visible jank or unexpected memory growth |
| Slow Android | gesture under JS work | finger tracking remains responsive |
| iOS | gesture cancel + back | returns to correct screen state |
| Accessibility | reduce motion + screen reader | complete status, controls and content readable |
| Interruptions | leave screen mid-animation | no ghost overlay, stale callback or crash |
| Data update | success/error while animation active | source of truth wins |
| System constraints | large text/low power | safe content and interaction |

Capture UI/JS FPS and frame time where tools provide them. Report actual numbers only if measured; do not promise 60/120 FPS by inspection. Prefer stable layout, minimal overdraw, low texture load and reduced rerenders. Stop shipping effects that regress usability.

