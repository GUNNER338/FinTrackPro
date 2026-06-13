import React from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle, StyleProp } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  noPadding?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  onPress,
  style,
  contentStyle,
  noPadding = false,
}) => {
  const { colors, radius, shadows, spacing, typography } = useTheme();

  const CardContent = (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderRadius: radius.large,
          padding: noPadding ? 0 : spacing.lg,
          borderColor: colors.border,
          borderWidth: 1,
        },
        shadows.card,
        style,
      ]}
    >
      {(title || subtitle) && (
        <View style={[styles.header, { padding: noPadding ? spacing.lg : 0 }]}>
          {title && (
            <Text style={[styles.title, { color: colors.text, ...typography.heading3 }]}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text style={[styles.subtitle, { color: colors.textSecondary, ...typography.caption }]}>
              {subtitle}
            </Text>
          )}
        </View>
      )}
      <View style={contentStyle}>{children}</View>
    </View>
  );

  if (onPress) {
    return (
      <Pressable 
        onPress={onPress} 
        accessibilityRole="button"
        style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
      >
        {CardContent}
      </Pressable>
    );
  }

  return CardContent;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden', // to keep border radius clean
  },
  header: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {},
});

export default Card;
