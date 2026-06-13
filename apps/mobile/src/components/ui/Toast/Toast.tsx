import React, { useEffect } from 'react';
import { Text, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../../hooks/useTheme';
import { scale, verticalScale } from '../../../utils/responsive';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ToastType = 'success' | 'error' | 'warning';

export interface ToastProps {
  message: string;
  type?: ToastType;
  visible: boolean;
  onHide?: () => void;
  duration?: number;
  style?: ViewStyle;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  visible,
  onHide,
  duration = 3000,
  style,
}) => {
  const { colors, typography, radius, shadows, spacing } = useTheme();
  // We use useSafeAreaInsets if wrapped in SafeAreaProvider, fallback to 40
  const insets = { top: 40 }; 
  
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(insets.top + 10, { damping: 15 });
      opacity.value = withTiming(1);

      // Auto hide
      if (duration > 0) {
        translateY.value = withDelay(
          duration,
          withTiming(-100, { duration: 300 }, (finished) => {
            if (finished && onHide) {
              runOnJS(onHide)();
            }
          })
        );
        opacity.value = withDelay(duration, withTiming(0, { duration: 300 }));
      }
    } else {
      translateY.value = withTiming(-100);
      opacity.value = withTiming(0);
    }
  }, [visible, duration, insets.top]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  const getThemeProps = () => {
    switch (type) {
      case 'error':
        return { bg: colors.error, icon: 'alert-circle' as const };
      case 'warning':
        return { bg: colors.warning, icon: 'alert-triangle' as const };
      case 'success':
      default:
        return { bg: colors.success, icon: 'check-circle' as const };
    }
  };

  const themeProps = getThemeProps();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: themeProps.bg,
          borderRadius: radius.medium,
          paddingHorizontal: spacing.md,
        },
        shadows.modal,
        animatedStyle,
        style,
      ]}
      pointerEvents="none"
    >
      <Feather name={themeProps.icon} size={20} color="#FFFFFF" style={styles.icon} />
      <Text style={[styles.text, { ...typography.body, color: '#FFFFFF' }]}>
        {message}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: scale(20),
    right: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(56),
    zIndex: 9999,
  },
  icon: {
    marginRight: 12,
  },
  text: {
    flex: 1,
  },
});

export default Toast;
