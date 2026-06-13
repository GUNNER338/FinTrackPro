export type ColorTheme = {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  error: string;
  warning: string;
};

export const colors = {
  light: {
    background: '#F8F9FA',
    surface: '#FFFFFF',
    primary: '#0A84FF', // Professional FinTech Blue
    secondary: '#5E5CE6',
    text: '#1C1C1E',
    textSecondary: '#8E8E93',
    border: '#E5E5EA',
    success: '#34C759',
    error: '#FF3B30',
    warning: '#FFCC00',
  } as ColorTheme,
  
  dark: {
    background: '#000000',
    surface: '#1C1C1E',
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    text: '#FFFFFF',
    textSecondary: '#EBEBF5', // 60% opacity look
    border: '#38383A',
    success: '#30D158',
    error: '#FF453A',
    warning: '#FFD60A',
  } as ColorTheme,
};
