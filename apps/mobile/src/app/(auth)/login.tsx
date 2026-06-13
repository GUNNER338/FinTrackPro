import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Controller } from 'react-native-hook-form'; // Wait, it's just react-hook-form
import { Controller as RHFController } from 'react-hook-form';
import { Mail } from 'lucide-react-native';
import { AuthContainer } from '../../features/auth/components/AuthContainer';
import { AuthHeader } from '../../features/auth/components/AuthHeader';
import { SocialButton } from '../../features/auth/components/SocialButton';
import { PasswordInput } from '../../features/auth/components/PasswordInput';
import { loginSchema, LoginFormData } from '../../features/auth/schemas/auth.schema';
import { useAuthForm } from '../../features/auth/hooks/useAuthForm';
import { Button } from '../../components/ui/Button';
import Input from '../../components/ui/Input/Input';
import { theme } from '../../theme';

export default function LoginScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useAuthForm(loginSchema, {
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = async (data: LoginFormData) => {
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
        title="Welcome Back" 
        subtitle="Sign in to continue to FinTrack Pro" 
      />

      <View style={styles.form}>
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
              placeholder="Enter your password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.password?.message}
            />
          )}
        />

        <TouchableOpacity 
          style={styles.forgotPassword}
          onPress={() => router.push('/(auth)/forgot-password')}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <Button 
          onPress={handleSubmit(onSubmit)} 
          loading={isLoading}
          style={styles.loginButton}
          title="Login"
        />
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.divider} />
      </View>

      <SocialButton 
        provider="Google" 
        icon={<Mail size={20} color={theme.colors.text} />} 
        onPress={() => {}} 
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
          <Text style={styles.footerLink}>Register</Text>
        </TouchableOpacity>
      </View>
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  form: {
    marginBottom: theme.spacing.xl,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing.xl,
  },
  forgotPasswordText: {
    ...theme.typography.button,
    color: theme.colors.primary,
  },
  loginButton: {
    width: '100%',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  dividerText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    paddingHorizontal: theme.spacing.md,
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
