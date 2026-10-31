# Micro-interaction pattern contract

| Surface | Visual signal | State dependency | Edge case |
|---|---|---|---|
| Primary CTA | Scale/opacity press and return | pressed/disabled/loading | prevent double submit |
| Favorite | Icon spring + color + label | server optimistic/rollback | failed save |
| Toggle | Thumb movement and surface shift | boolean/pending | screen-reader role |
| Filter chip | Selection highlight | selected ID | 10 rapid taps |
| Tab indicator | Underline move | navigation state | tab state restore |
| Action icon | Tiny emphasis on tap | onPress | accidental repeated haptics |

No interaction may be understood *only* through animated color. Keep onPress/onAccessibilityAction wired to original behavior. Never present optimistic success as confirmed payment settlement.

