import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../../hooks/useTheme';
import { verticalScale } from '../../../utils/responsive';
import Button from '../Button/Button';

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: keyof typeof Feather.glyphMap;
  actionTitle?: string;
  onAction?: () => void;
  style?: ViewStyle;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = 'inbox',
  actionTitle,
  onAction,
  style,
}) => {
  const { colors, typography, spacing } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: colors.border, marginBottom: spacing.lg },
        ]}
      >
        <Feather name={icon} size={32} color={colors.textSecondary} />
      </View>
      
      <Text style={[styles.title, { color: colors.text, ...typography.heading3 }]}>
        {title}
      </Text>
      
      {description && (
        <Text
          style={[
            styles.description,
            { color: colors.textSecondary, ...typography.body, marginTop: spacing.sm },
          ]}
        >
          {description}
        </Text>
      )}

      {actionTitle && onAction && (
        <Button
          title={actionTitle}
          onPress={onAction}
          variant="outline"
          style={{ marginTop: spacing.xl }}
          fullWidth={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  },
});

export default EmptyState;
