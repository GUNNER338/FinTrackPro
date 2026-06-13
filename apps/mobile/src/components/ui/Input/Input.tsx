import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  TextInputProps, 
  Pressable 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../../hooks/useTheme';
import { verticalScale, scale } from '../../../utils/responsive';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: keyof typeof Feather.glyphMap;
  isPassword?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  isPassword,
  style,
  ...rest
}) => {
  const { colors, typography, radius, spacing } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const getBorderColor = () => {
    if (error) return colors.error;
    if (isFocused) return colors.primary;
    return colors.border;
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: colors.text, ...typography.label }]}>
          {label}
        </Text>
      )}

      <View
        style={[
          styles.inputContainer,
          {
            borderColor: getBorderColor(),
            backgroundColor: colors.surface,
            borderRadius: radius.medium,
            height: verticalScale(50),
          },
        ]}
      >
        {icon && (
          <Feather
            name={icon}
            size={20}
            color={isFocused ? colors.primary : colors.textSecondary}
            style={[styles.icon, { marginLeft: spacing.md }]}
          />
        )}

        <TextInput
          style={[
            styles.input,
            {
              color: colors.text,
              ...typography.body,
              paddingLeft: icon ? spacing.sm : spacing.md,
            },
            style,
          ]}
          placeholderTextColor={colors.textSecondary}
          onFocus={(e) => {
            setIsFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            rest.onBlur?.(e);
          }}
          secureTextEntry={isPassword && !isPasswordVisible}
          accessibilityRole="text"
          {...rest}
        />

        {isPassword && (
          <Pressable
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={[styles.iconRight, { marginRight: spacing.md }]}
          >
            <Feather
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={20}
              color={colors.textSecondary}
            />
          </Pressable>
        )}
      </View>

      {error && (
        <Text style={[styles.error, { color: colors.error, ...typography.caption }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: verticalScale(16),
  },
  label: {
    marginBottom: verticalScale(6),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    height: '100%',
  },
  icon: {
    marginRight: scale(4),
  },
  iconRight: {
    marginLeft: scale(4),
  },
  error: {
    marginTop: verticalScale(6),
  },
});

export default Input;
