import { colors, ColorTheme } from './colors';
import { typography, TypographyConfig } from './typography';
import { spacing, spacingVertical } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';

export const theme = {
  colors,
  typography,
  spacing,
  spacingVertical,
  radius,
  shadows,
};

export type Theme = typeof theme;
export type { ColorTheme, TypographyConfig };
