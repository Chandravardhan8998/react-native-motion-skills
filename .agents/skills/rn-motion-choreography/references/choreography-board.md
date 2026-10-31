# Scene choreography template

| Time | Element | State change | Purpose | Cancel/reduce-motion |
|---|---|---|---|---|
| 0 ms | primary surface | start transition | signal action accepted | show final state immediately |
| 80–160 ms | dominant content | translate + fade | move focus | immediate visibility |
| 160–300 ms | supporting content | small stagger | establish hierarchy | no delay |
| 300–550 ms | optional flourish | subtle settle | delight (nonessential) | omit |

These are sample ranges, not required timings. Start/finish times must follow actual navigation/event lifecycle, not `setTimeout` guesses. Keep focusable actions accessible before decorative effects finish.

