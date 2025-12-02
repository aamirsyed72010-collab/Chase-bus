"use client";

import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, PaletteMode } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkPalette, lightPalette, typography, components } from '@/theme'; // Import palettes, typography, and components

// Define the shape of the context value
interface ThemeContextType {
  toggleColorMode: () => void;
  mode: PaletteMode;
}

// Create the context with a default undefined value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define the props for the ThemeContextProvider
interface ThemeContextProviderProps {
  children: ReactNode;
}

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [mode, setMode] = useState<PaletteMode>('dark'); // Default to dark mode
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  React.useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode') as PaletteMode | null;
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      setMode(savedMode);
    }
    setMounted(true);
  }, []);

  // Save theme to localStorage when it changes
  React.useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme-mode', mode);
    }
  }, [mode, mounted]);

  const toggleColorMode = React.useCallback(() => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  // Create a theme based on the current mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          ...(mode === 'light' ? lightPalette : darkPalette), // Use imported palettes
        },
        typography, // Use imported typography
        components, // Use imported components
      }),
    [mode],
  );

  return (
    <ThemeContext.Provider value={{ toggleColorMode, mode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider');
  }
  return context;
}
