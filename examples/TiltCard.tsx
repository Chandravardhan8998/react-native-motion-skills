/**
 * Illustrative React Native 2.5D card. Requires compatible Reanimated and
 * Gesture Handler setup and a GestureHandlerRootView in the host app.
 * NOT a drop-in guarantee for all RN/Expo/legacy versions.
 */
import React, { useMemo } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type Props = {
  children: React.ReactNode;
  width?: number;
  height?: number;
  style?: ViewStyle;
};

const MAX_TILT_DEG = 7;
const SPRING = { damping: 18, stiffness: 210, mass: 0.85 };
const clamp = (value: number, min: number, max: number) => {
  'worklet';
  return Math.max(min, Math.min(max, value));
};

export function TiltCard({ children, width = 320, height = 190, style }: Props) {
  const reducedMotion = useReducedMotion();
  const tiltX = useSharedValue(0);
  const tiltY = useSharedValue(0);

  const pan = useMemo(
    () => Gesture.Pan()
      .enabled(!reducedMotion)
      .minDistance(8)
      .onUpdate((event) => {
        // The pan location is relative to the target view; do not use screen coordinates.
        const px = clamp((event.x / width - 0.5) * 2, -1, 1);
        const py = clamp((event.y / height - 0.5) * 2, -1, 1);
        tiltX.value = -py * MAX_TILT_DEG;
        tiltY.value = px * MAX_TILT_DEG;
      })
      .onFinalize(() => {
        tiltX.value = withSpring(0, SPRING);
        tiltY.value = withSpring(0, SPRING);
      }),
    [height, reducedMotion, tiltX, tiltY, width],
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 900 },
      { rotateX: `${tiltX.value}deg` },
      { rotateY: `${tiltY.value}deg` },
    ],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.card, { width, height }, style, animatedStyle]}>
        <View style={styles.content}>{children}</View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#162127',
    borderRadius: 24,
    overflow: 'hidden',
  },
  content: { flex: 1, padding: 20 },
});
