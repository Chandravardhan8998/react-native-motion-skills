# Chart truthfulness rubric

- Verify source domain, time axis, baseline and units.
- Keep tick mapping/series scale identical before, during and after reveal; not all bouncy effects are appropriate for quantitative charts.
- Maintain accessible data table/summary if the chart is visual-only.
- No animated fake growth, no misleading interpolation from zero for negative or indexed metrics.
- Rate-limit live data transitions; preserve event order.
- Test null data, gaps, outliers, zero, negative, repeated timestamps and orientation.

