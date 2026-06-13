import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence,
  withDelay,
  Easing 
} from 'react-native-reanimated';
import { useAuthUIStore } from '../../features/auth/store/authUIStore';
import { theme } from '../../theme';
import { Wallet } from 'lucide-react-native';

export default function SplashScreen() {
  const router = useRouter();
  const hasSeenOnboarding = useAuthUIStore((state) => state.hasSeenOnboarding);

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);

  useEffect(() => {
    // Start animations
    opacity.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.exp) });
    scale.value = withSequence(
      withTiming(1.1, { duration: 600 }),
      withTiming(1, { duration: 400 })
    );

    // Navigate after 2 seconds
    const timeout = setTimeout(() => {
      if (hasSeenOnboarding) {
        router.replace('/(auth)/login');
      } else {
        router.replace('/(auth)/onboarding');
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, animatedStyle]}>
        <View style={styles.iconContainer}>
          <Wallet size={64} color={theme.colors.primary} />
        </View>
        <Text style={styles.title}>FinTrack Pro</Text>
        <Text style={styles.tagline}>Smart Wealth Management</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    backgroundColor: theme.colors.surface,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    ...theme.shadows.md,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  tagline: {
    ...theme.typography.body1,
    color: theme.colors.textSecondary,
  },
});
