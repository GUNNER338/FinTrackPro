import { useThemeStore } from '../store/themeStore';
import { theme } from '../theme';

export const useTheme = () => {
  const currentTheme = useThemeStore((state) => state.currentTheme);
  const colors = theme.colorThemes[currentTheme];

  return {
    isDark: currentTheme === 'dark',
    currentTheme,
    colors,
    typography: theme.typography,
    spacing: theme.spacing,
    spacingVertical: theme.spacingVertical,
    radius: theme.radius,
    shadows: theme.shadows,
  };
};
