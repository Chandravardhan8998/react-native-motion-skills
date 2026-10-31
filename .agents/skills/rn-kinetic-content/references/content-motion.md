# Content motion

Data value is authoritative; animation interpolates its *presentation*. For animated currency, do not alter or round the source monetary model. Format final value with existing domain formatter, currency symbol, and locale-specific separators. For dashboards, prefer crossfade of text to digit-by-digit choreography when values update often.

Accessibility: announce the final value once when meaningful; otherwise avoid chatter on each frame. Reduced motion: display final text immediately. Include truncated/empty/null state, sensitive number visibility and error/loading.

