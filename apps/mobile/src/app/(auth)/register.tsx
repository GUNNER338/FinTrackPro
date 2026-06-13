import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Controller as RHFController } from 'react-hook-form';
import { AuthContainer } from '../../features/auth/components/AuthContainer';
import { AuthHeader } from '../../features/auth/components/AuthHeader';
import { PasswordInput } from '../../features/auth/components/PasswordInput';
import { registerSchema, RegisterFormData } from '../../features/auth/schemas/auth.schema';
import { useAuthForm } from '../../features/auth/hooks/useAuthForm';
import { Button } from '../../components/ui/Button';
import Input from '../../components/ui/Input/Input';
import { theme } from '../../theme';

export default function RegisterScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useAuthForm(registerSchema, {
    defaultValues: { fullName: '', email: '', password: '', confirmPassword: '' }
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to main app
      router.replace('/(tabs)');
    }, 1000);
  };

  return (
    <AuthContainer>
      <AuthHeader 
        title="Create Account" 
        subtitle="Start your journey with FinTrack Pro" 
      />

      <View style={styles.form}>
        <RHFController
          control={control}
          name="fullName"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Full Name"
              icon="user"
              placeholder="Enter your full name"
              autoCapitalize="words"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.fullName?.message}
            />
          )}
        />

        <RHFController
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Email"
              icon="mail"
              placeholder="Enter your email"
              autoCapitalize="none"
              keyboardType="email-address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.email?.message}
            />
          )}
        />

        <RHFController
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordInput
              label="Password"
              placeholder="Create a password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.password?.message}
            />
          )}
        />

        <RHFController
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.confirmPassword?.message}
            />
          )}
        />

        <Button 
          onPress={handleSubmit(onSubmit)} 
          loading={isLoading}
          style={styles.registerButton}
          title="Create Account"
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
          <Text style={styles.footerLink}>Login</Text>
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
  registerButton: {
    width: '100%',
    marginTop: theme.spacing.lg,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing.xl,
  },
  footerText: {
    ...theme.typography.body2,
    color: theme.colors.textSecondary,
  },
  footerLink: {
    ...theme.typography.button,
    color: theme.colors.primary,
  },
});
