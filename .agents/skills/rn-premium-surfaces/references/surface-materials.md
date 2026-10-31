# Surface visual language and component checklist

| Material style | Implementation path | Watch out for |
|---|---|---|
| Quiet matte | Flat color, border, subtle elevation | Avoid too little contrast |
| Metallic edge | Linear gradient or small overlay highlight | Avoid over-polished fake chrome |
| Soft luminous panel | Static accent wash + bounded shadow | GPU overdraw on Android |
| Glass-inspired | Translucent layer over stable backing | Legibility, platform blur cost |
| Editorial depth | Typography scale + whitespace + clipping | Content reflow and large type |
| Tactile elevated CTA | Light/dark surface variants + press transform | Disabled and pressed semantics |

A 'premium' app often needs **less** motion and decorative layers. Typography, layout, quiet spacing and clear states must remain primary. Never put critical text inside low-contrast glass without a proper opaque fallback.
