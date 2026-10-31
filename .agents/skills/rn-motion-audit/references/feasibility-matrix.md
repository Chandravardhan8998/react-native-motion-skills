# React Native motion feasibility checklist

Classify per effect rather than globally. Evidence includes installed versions, actual navigator, runtime flags, source shape and deployment targets.

| Condition | Direction | Risk |
|---|---|---|
| Reanimated 4 + New Architecture confirmed + matching RN + worklets configured | Preferred for gesture-linked motion | Version/platform validation still required |
| Reanimated 4 + architecture unknown | Conditional; verify before implementation | Native build failure |
| Reanimated 4 + explicit Old Architecture | Blocked until compatible migration, or use non-Reanimated fallback | Unsupported combination |
| Reanimated 3 in legacy app | Preserve compatible version, do not auto-upgrade | EOL/maintenance risk |
| Existing RN Animated but no Reanimated | Adequate for simple opacity/transform | Limited gesture-linked complexity |
| No Gesture Handler | Avoid touch-driven tilt/drag until compatibility approved | Touch conflict |
| React Navigation shared elements | Experimental; confirm version/flag/native-stack; prefer overlay alternative | Production breakage |
| Skia/Rive missing | Optional; propose a non-GPU fallback first | Bundle/native/build complexity |
| Existing DS and typed tokens | Extend current tokens | Duplicate abstraction |

For each effect: outcome; smallest possible implementation; installed dependencies; new dependency proposal *only if necessary*; native rebuild?; screen/gesture conflicts; accessible alternative; rollback.

Audit does not prove runtime capability. Treat Expo-managed status, effective New Architecture default, and unsupported versions as UNKNOWN unless explicitly confirmed by build/config docs.

