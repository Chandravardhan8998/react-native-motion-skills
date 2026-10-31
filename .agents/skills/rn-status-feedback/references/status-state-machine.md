# Asynchronous status animation contract

| Domain event | Domain state | Motion | Output |
|---|---|---|---|
| press submit | submitting | CTA compress → spinner/progress | “Submitting” |
| request acknowledged, awaiting result | pending | gentle indefinite loop or neutral static | “Processing” |
| authoritative success | success | single reveal (icon + message + optional tiny burst) | “Completed” |
| authoritative failure | failure | stop success visuals; error reveal | reason + retry |
| timeout/unknown | pending or indeterminate | neutral signal | “Check status” |
| cancel | canceled | restore safe idle state | “Canceled” |

Never advance from submitting to success on an animation timer. Animation completion may navigate only if domain state is still success and user intent allows it. Screen-reader announcements and haptics should be deduplicated. Avoid fake percentage progress.

