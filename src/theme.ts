// src/theme.ts

// Material Design 3 (Material You) Color Tokens
// Generated or approximated for a purple-based theme

import { PaletteOptions } from '@mui/material/styles';

export const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#D0BCFF',
    light: '#E8DEF8',
    dark: '#381E72',
    contrastText: '#381E72',
  },
  secondary: {
    main: '#CCC2DC',
    light: '#E8DEF8',
    dark: '#332D41',
    contrastText: '#332D41',
  },
  tertiary: {
    main: '#EFB8C8',
    light: '#FFD8E4',
    dark: '#492532',
    contrastText: '#492532',
  },
  error: {
    main: '#F2B8B5',
    light: '#F9DEDC',
    dark: '#601410',
    contrastText: '#601410',
  },
  background: {
    default: '#141218',
    paper: '#1D1B20',
  },
  text: {
    primary: '#E6E1E5',
    secondary: '#CAC4D0',
  },
  divider: '#49454F',
};

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
  }
}

export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#6750A4',
    light: '#EADDFF',
    dark: '#21005D',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#625B71',
    light: '#E8DEF8',
    dark: '#1D192B',
    contrastText: '#FFFFFF',
  },
  tertiary: {
    main: '#7D5260',
    light: '#FFD8E4',
    dark: '#31111D',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#B3261E',
    light: '#F9DEDC',
    dark: '#410E0B',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#FFFBFE',
    paper: '#FFFBFE',
  },
  text: {
    primary: '#1C1B1F',
    secondary: '#49454F',
  },
  divider: '#CAC4D0',
};

export const typography = {
  fontFamily: [
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ].join(','),
  h1: {
    fontSize: '3.5rem', // Display Large
    fontWeight: 400,
    lineHeight: 1.125,
  },
  h2: {
    fontSize: '2.8rem', // Display Medium
    fontWeight: 400,
    lineHeight: 1.2,
  },
  h3: {
    fontSize: '2.25rem', // Display Small
    fontWeight: 400,
    lineHeight: 1.22,
  },
  h4: {
    fontSize: '2rem', // Headline Large
    fontWeight: 400,
    lineHeight: 1.25,
  },
  h5: {
    fontSize: '1.75rem', // Headline Medium
    fontWeight: 400,
    lineHeight: 1.28,
  },
  h6: {
    fontSize: '1.375rem', // Headline Small
    fontWeight: 500,
    lineHeight: 1.36,
  },
  body1: {
    fontSize: '1rem', // Body Large
    lineHeight: 1.5,
    letterSpacing: '0.03125em',
  },
  body2: {
    fontSize: '0.875rem', // Body Medium
    lineHeight: 1.43,
    letterSpacing: '0.015625em',
  },
  button: {
    textTransform: 'none', // No uppercase for buttons in MD3
    fontWeight: 500,
  },
};

export const components = {
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: 'rgba(255, 255, 255, 0.01)', // Ultra transparent
        backdropFilter: 'blur(12px)',
        color: 'inherit',
        boxShadow: 'none',
        backgroundImage: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '24px', // Pill shape
        padding: '10px 24px',
        textTransform: 'none',
        fontWeight: 600,
      },
      contained: {
        boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
        '&:hover': {
          boxShadow: '0 6px 20px rgba(0,0,0,0.23)',
          transform: 'translateY(-1px)',
        },
        transition: 'all 0.2s ease-in-out',
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: '24px',
        backdropFilter: 'blur(16px)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)', // Glassy
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundImage: 'none',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
        backdropFilter: 'blur(16px)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)', // Glassy
        border: '1px solid rgba(255, 255, 255, 0.05)',
        transition: 'all 0.3s ease-in-out',
      },
      rounded: {
        borderRadius: '24px',
      },
      elevation1: {
        boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.05)',
      },
      elevation2: {
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      elevation3: {
        boxShadow: '0 12px 48px 0 rgba(31, 38, 135, 0.1)',
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.1)',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.3)',
          },
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: '12px',
        backdropFilter: 'blur(4px)',
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: '28px',
        backdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(30, 30, 30, 0.8)', // Slightly more opaque for dialogs
        border: '1px solid rgba(255, 255, 255, 0.1)',
      },
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: {
        borderRadius: '16px',
        backdropFilter: 'blur(16px)',
        backgroundColor: 'rgba(30, 30, 30, 0.8)',
      },
    },
  },
};