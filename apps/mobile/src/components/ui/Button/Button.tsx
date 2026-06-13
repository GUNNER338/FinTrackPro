import React from 'react';
import { 
  StyleSheet, 
  Text, 
  Pressable, 
  ViewStyle, 
  TextStyle, 
  ActivityIndicator,
  View
} from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  interpolateColor
} from 'react-native-reanimated';
import { useTheme } from '../../../hooks/useTheme';
import { animations } from '../../../utils/animations';
import { Feather } from '@expo/vector-icons';
import { scale, verticalScale } from '../../../utils/responsive';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: keyof typeof Feather.glyphMap;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
  fullWidth = true,
}) => {
  const { colors, typography, radius, shadows } = useTheme();
  
  const scaleAnim = useSharedValue(1);
  const opacityAnim = useSharedValue(1);

  const handlePressIn = () => {
    if (disabled || loading) return;
    scaleAnim.value = animations.spring(0.97);
    opacityAnim.value = animations.timing(0.8);
  };

  const handlePressOut = () => {
    if (disabled || loading) return;
    scaleAnim.value = animations.spring(1);
    opacityAnim.value = animations.timing(1);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleAnim.value }],
      opacity: disabled ? 0.5 : opacityAnim.value,
    };
  });

  // Determine styles based on variant
  const getVariantStyles = (): { bg: string; text: string; border: string } => {
    switch (variant) {
      case 'secondary':
        return { bg: colors.secondary, text: '#FFFFFF', border: colors.secondary };
      case 'outline':
        return { bg: 'transparent', text: colors.primary, border: colors.primary };
      case 'danger':
        return { bg: colors.error, text: '#FFFFFF', border: colors.error };
      case 'primary':
      default:
        return { bg: colors.primary, text: '#FFFFFF', border: colors.primary };
    }
  };

  // Determine size styles
  const getSizeStyles = (): { height: number; px: number; fontSize: number } => {
    switch (size) {
      case 'small':
        return { height: verticalScale(36), px: scale(16), fontSize: typography.caption.fontSize };
      case 'large':
        return { height: verticalScale(56), px: scale(32), fontSize: typography.heading3.fontSize };
      case 'medium':
      default:
        return { height: verticalScale(48), px: scale(24), fontSize: typography.button.fontSize };
    }
  };

  const variantStyle = getVariantStyles();
  const sizeStyle = getSizeStyles();

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      style={[
        styles.base,
        {
          backgroundColor: variantStyle.bg,
          borderColor: variantStyle.border,
          borderWidth: variant === 'outline' ? 1.5 : 0,
          borderRadius: radius.medium,
          height: sizeStyle.height,
          paddingHorizontal: sizeStyle.px,
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
        },
        variant === 'primary' && !disabled && shadows.button,
        animatedStyle,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variantStyle.text} />
      ) : (
        <View style={styles.content}>
          {icon && (
            <Feather 
              name={icon} 
              size={sizeStyle.fontSize * 1.2} 
              color={variantStyle.text} 
              style={styles.icon}
            />
          )}
          <Text
            style={[
              styles.text,
              {
                color: variantStyle.text,
                fontSize: sizeStyle.fontSize,
                fontWeight: typography.button.fontWeight,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  base: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    textAlign: 'center',
  },
});

export default Button;
