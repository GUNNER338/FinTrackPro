import { Dimensions, PixelRatio } from 'react-native';

export const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

/**
 * Scale relative to width
 * Best for: padding, margin, width, icon sizes
 */
export const scale = (size: number): number => 
  (screenWidth / guidelineBaseWidth) * size;

/**
 * Scale relative to height
 * Best for: padding vertical, margin vertical, height
 */
export const verticalScale = (size: number): number => 
  (screenHeight / guidelineBaseHeight) * size;

/**
 * Moderate scale (combines linear scale and default size)
 * Best for: font sizes, border radius, where scaling too much looks bad
 */
export const moderateScale = (size: number, factor = 0.5): number => 
  size + (scale(size) - size) * factor;

/**
 * Helper to ensure a minimum size regardless of scaling down
 */
export const clamp = (value: number, min: number, max: number): number => 
  Math.min(Math.max(value, min), max);
