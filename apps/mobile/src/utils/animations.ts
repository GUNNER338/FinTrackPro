import { 
  withTiming, 
  withSpring, 
  WithTimingConfig, 
  WithSpringConfig 
} from 'react-native-reanimated';

/**
 * Standard duration for UI transitions
 */
export const DURATION = 250;

/**
 * Smooth ease-out easing function typical in modern UI
 */
export const Easing = {
  // Cubic Bezier curve for standard ease-out
  out: (t: number) => 1 - Math.pow(1 - t, 3),
};

export const defaultTimingConfig: WithTimingConfig = {
  duration: DURATION,
};

export const defaultSpringConfig: WithSpringConfig = {
  damping: 15,
  stiffness: 120,
  mass: 1,
};

/**
 * Reusable animation helpers to keep animations consistent
 */
export const animations = {
  /**
   * Smooth standard timing animation (e.g. for color changes, opacities)
   */
  timing: (toValue: number, config?: WithTimingConfig) => {
    'worklet';
    return withTiming(toValue, Object.assign({}, defaultTimingConfig, config));
  },

  /**
   * Bouncy spring animation (e.g. for button presses, scaling, modals)
   */
  spring: (toValue: number, config?: WithSpringConfig) => {
    'worklet';
    return withSpring(toValue, Object.assign({}, defaultSpringConfig, config));
  },
};
