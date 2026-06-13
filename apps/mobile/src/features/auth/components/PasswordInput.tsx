import React from 'react';
import Input, { InputProps } from '../../../components/ui/Input/Input';

export function PasswordInput(props: Omit<InputProps, 'isPassword' | 'icon'>) {
  return (
    <Input
      {...props}
      isPassword={true}
      icon="lock"
      autoCapitalize="none"
      autoCorrect={false}
    />
  );
}
