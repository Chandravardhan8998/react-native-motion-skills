/**
 * Domain-controlled status feedback. Animation never changes the actual status.
 * Replace tokens/colors and confirm accessibility behavior on both platforms.
 */
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

type Status = 'idle' | 'pending' | 'success' | 'failure';
type Props = { status: Status; successText?: string; failureText?: string };

export function StatusFeedback({
  status,
  successText = 'Completed successfully',
  failureText = 'Unable to complete',
}: Props) {
  const reducedMotion = useReducedMotion();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (reducedMotion) {
      scale.value = 1;
      opacity.value = 1;
      return;
    }
    // No timer changes `status`: it comes from domain/backend state only.
    scale.value = status === 'success' ? 0.84 : 1;
    opacity.value = status === 'success' ? 0.4 : 1;
    if (status === 'success') {
      scale.value = withSpring(1, { damping: 14, stiffness: 230 });
      opacity.value = withTiming(1, { duration: 180 });
    }
  }, [status, reducedMotion, scale, opacity]);

  const iconStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const text = status === 'success' ? successText
    : status === 'failure' ? failureText
    : status === 'pending' ? 'Processing your request' : 'Ready';
  const glyph = status === 'success' ? '✓'
    : status === 'failure' ? '!' : status === 'pending' ? '…' : '•';

  return (
    <View style={styles.row} accessibilityLiveRegion="polite">
      <Animated.View
        accessible={false}
        importantForAccessibility="no-hide-descendants"
        style={[styles.glyph, iconStyle]}
      >
        <Text style={styles.glyphText}>{glyph}</Text>
      </Animated.View>
      <Text accessibilityRole="text" style={styles.message}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  glyph: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#254B40', alignItems: 'center', justifyContent: 'center' },
  glyphText: { fontSize: 24, fontWeight: '700', color: '#FFFFFF' },
  message: { flexShrink: 1, fontSize: 16, fontWeight: '600', color: '#162127' },
});
