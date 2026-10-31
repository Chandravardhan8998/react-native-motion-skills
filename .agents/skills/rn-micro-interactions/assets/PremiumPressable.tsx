/** Simple compositor-friendly press feedback; adapt to existing button API. */
import React from 'react';
import { Pressable, StyleSheet, Text, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
};

export function PremiumPressable({ label, onPress, disabled = false, style }: Props) {
  const reduceMotion = useReducedMotion();
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <Animated.View style={[animatedStyle, style]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ disabled }}
        disabled={disabled}
        onPressIn={() => { scale.value = reduceMotion ? 1 : withTiming(0.975, { duration: 100 }); }}
        onPressOut={() => { scale.value = withSpring(1, { damping: 20, stiffness: 280 }); }}
        onPress={onPress}
        style={styles.button}
      >
        <Text style={styles.label}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: '#18272E', borderRadius: 15, minHeight: 48, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' },
  label: { color: '#FFFFFF', fontWeight: '600', fontSize: 16 },
});
