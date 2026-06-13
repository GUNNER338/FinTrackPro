import React from 'react';
import { View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';

export interface LoaderProps {
  /**
   * Whether the loader is full screen overlay
   * @default false
   */
  fullScreen?: boolean;
  /**
   * Color of the spinner
   */
  color?: string;
  /**
   * Size of the spinner
   * @default 'large'
   */
  size?: 'small' | 'large';
  style?: ViewStyle;
}

const Loader: React.FC<LoaderProps> = ({
  fullScreen = false,
  color,
  size = 'large',
  style,
}) => {
  const { colors } = useTheme();

  if (fullScreen) {
    return (
      <View
        style={[styles.fullScreen, { backgroundColor: colors.background }, style]}
        accessibilityRole="progressbar"
      >
        <ActivityIndicator size={size} color={color || colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.inline, style]} accessibilityRole="progressbar">
      <ActivityIndicator size={size} color={color || colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  inline: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default Loader;
