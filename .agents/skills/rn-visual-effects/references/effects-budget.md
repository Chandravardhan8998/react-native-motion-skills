# Effects budget and fallbacks

In order of complexity/cost:

1. Static gradients/shadows with existing UI elements.
2. Transform-driven highlight/glow via a single overlay layer.
3. Masked reveal/clip with platform-supported primitives.
4. Skia canvas for custom vectors, glow paths, a bounded particle system or bespoke shaders.
5. Full-screen shader/video/3D engine only with product justification and measured device budget.

Before introducing a graphics dependency, check native build constraints, version support, license, APK/IPA impact, overdraw, battery, reduced motion, and device GPU performance. Decorative effects may degrade to static images without losing meaning. Don't ship continuous full-screen loops in critical transactional flows by default.

