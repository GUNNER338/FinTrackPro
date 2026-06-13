import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Controller as RHFController } from 'react-hook-form';
import { AuthContainer } from '../../features/auth/components/AuthContainer';
import { AuthHeader } from '../../features/auth/components/AuthHeader';
import { forgotPasswordSchema, ForgotPasswordFormData } from '../../features/auth/schemas/auth.schema';
import { useAuthForm } from '../../features/auth/hooks/useAuthForm';
import { Button } from '../../components/ui/Button';
import Input from '../../components/ui/Input/Input';
import { theme } from '../../theme';
import { useTheme } from '../../hooks/useTheme';
import { CheckCircle2 } from 'lucide-react-native';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useAuthForm(forgotPasswordSchema, {
    defaultValues: { email: '' }
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1000);
  };

  if (isSuccess) {
    return (
      <AuthContainer>
        <View style={styles.successContainer}>
          <CheckCircle2 size={64} color={colors.success} style={styles.successIcon} />
          <AuthHeader 
            title="Check Your Email" 
            subtitle="We have sent password reset instructions to your email." 
          />
          <Button
            onPress={() => router.push('/(auth)/login')} 
            style={styles.backButton}
            title="Back to Login"
          />
        </View>
      </AuthContainer>
    );
  }

  return (
    <AuthContainer>
      <AuthHeader 
        title="Reset Password" 
        subtitle="Enter your email and we'll send you a link to reset your password." 
      />

      <View style={styles.form}>
        <RHFController
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Email"
              icon="mail"
              placeholder="Enter your email address"
              autoCapitalize="none"
              keyboardType="email-address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.email?.message}
            />
          )}
        />

        <Button 
          onPress={handleSubmit(onSubmit)} 
          loading={isLoading}
          style={styles.resetButton}
          title="Send Reset Link"
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
          <Text style={styles.footerLink}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  form: {
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.md,
  },
  resetButton: {
    width: '100%',
    marginTop: theme.spacing.lg,
  },
  footer: {
    alignItems: 'center',
    marginTop: theme.spacing.xl,
  },
  footerLink: {
    ...theme.typography.button,
    color: theme.colors.primary,
  },
  successContainer: {
    alignItems: 'center',
    paddingTop: theme.spacing.xxl,
  },
  successIcon: {
    marginBottom: theme.spacing.xl,
  },
  backButton: {
    width: '100%',
    marginTop: theme.spacing.xl,
  },
});
