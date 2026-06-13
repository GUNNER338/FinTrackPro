import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { theme } from '../../../theme';

interface SocialButtonProps {
  provider: 'Google' | 'Apple';
  icon: React.ReactNode;
  onPress: () => void;
}

export function SocialButton({ provider, icon, onPress }: SocialButtonProps) {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Continue with ${provider}`}
    >
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.text}>Continue with {provider}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  iconContainer: {
    marginRight: theme.spacing.md,
  },
  text: {
    ...theme.typography.button,
    color: theme.colors.text,
  },
});
