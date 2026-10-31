# Optional reference components

These are educational starting points, not components that the install script injects
into your project. The skills must audit your React Native/Expo version, Gesture
Handler root and configuration, tokens, component API, and navigation before adapting them.

- `PremiumPressable.tsx`: composited scale on press.
- `TiltCard.tsx`: bounded pseudo-3D card with gesture spring-back.
- `StatusSuccess.tsx`: backend-controlled status feedback.

All reference components require an appropriate compatible `react-native-reanimated`
installation. `TiltCard.tsx` additionally needs `react-native-gesture-handler` and a
proper `GestureHandlerRootView` in the app. These demos have not been compiled
against your project. Do not copy them into production unreviewed.
