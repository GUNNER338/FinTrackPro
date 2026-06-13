import { moderateScale } from '../utils/responsive';
import { TextStyle } from 'react-native';

export type TypographyConfig = {
  fontSize: number;
  fontWeight: TextStyle['fontWeight'];
  lineHeight: number;
};

export const typography = {
  heading1: {
    fontSize: moderateScale(32),
    fontWeight: '700',
    lineHeight: moderateScale(40),
  } as TypographyConfig,
  
  heading2: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    lineHeight: moderateScale(32),
  } as TypographyConfig,
  
  heading3: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    lineHeight: moderateScale(28),
  } as TypographyConfig,
  
  body: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    lineHeight: moderateScale(24),
  } as TypographyConfig,
  
  caption: {
    fontSize: moderateScale(14),
    fontWeight: '400',
    lineHeight: moderateScale(20),
  } as TypographyConfig,
  
  button: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    lineHeight: moderateScale(24),
  } as TypographyConfig,
  
  label: {
    fontSize: moderateScale(12),
    fontWeight: '500',
    lineHeight: moderateScale(16),
  } as TypographyConfig,
};
