import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'light' | 'dark';

interface ThemeState {
  currentTheme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      currentTheme: 'light',
      setTheme: (theme) => set({ currentTheme: theme }),
      toggleTheme: () =>
        set((state) => ({
          currentTheme: state.currentTheme === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'fintrack-theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
