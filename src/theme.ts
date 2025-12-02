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
    contrastText: '#21005D',
  },
  secondary: {
    main: '#CCC2DC',
    light: '#E8DEF8',
    dark: '#332D41',
    contrastText: '#1D192B',
  },
  tertiary: {
    main: '#EFB8C8',
    light: '#FFD8E4',
    dark: '#492532',
    contrastText: '#31111D',
  },
  error: {
    main: '#F2B8B5',
    light: '#F9DEDC',
    dark: '#601410',
    contrastText: '#410E0B',
  },
  background: {
    default: '#0D0C10', // Darker for better contrast
    paper: '#1A1820', // Surface container
  },
  text: {
    primary: '#E6E1E5',
    secondary: '#CAC4D0',
  },
  divider: 'rgba(202, 196, 208, 0.12)',
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
    'var(--font-outfit)', // Use the CSS variable
    'Outfit',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    'sans-serif',
  ].join(','),
  // Display styles - for hero sections
  h1: {
    fontSize: '3.5rem', // 56px
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: '-0.02em', // Tighter for large text
  },
  h2: {
    fontSize: '2.75rem', // 44px
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: '-0.015em',
  },
  h3: {
    fontSize: '2.125rem', // 34px
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
  },
  // Headline styles - for section titles
  h4: {
    fontSize: '1.75rem', // 28px
    fontWeight: 600,
    lineHeight: 1.25,
    letterSpacing: '-0.005em',
  },
  h5: {
    fontSize: '1.5rem', // 24px
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '0em',
  },
  h6: {
    fontSize: '1.25rem', // 20px
    fontWeight: 600,
    lineHeight: 1.35,
    letterSpacing: '0.005em',
  },
  // Body styles
  body1: {
    fontSize: '1rem', // 16px
    fontWeight: 400,
    lineHeight: 1.6,
    letterSpacing: '0.01em',
  },
  body2: {
    fontSize: '0.875rem', // 14px
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0.015em',
  },
  // Button and UI elements
  button: {
    fontSize: '0.9375rem', // 15px
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '0.02em',
    textTransform: 'none', // No uppercase for modern feel
  },
  caption: {
    fontSize: '0.75rem', // 12px
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: '0.03em',
  },
  overline: {
    fontSize: '0.75rem', // 12px
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
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
        borderRadius: '12px',
        padding: '10px 20px',
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '0.9375rem',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      contained: {
        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.12)',
        '&:hover': {
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          transform: 'translateY(-1px)',
        },
        '&:active': {
          transform: 'translateY(0)',
        },
      },
      outlined: {
        borderWidth: '1.5px',
        '&:hover': {
          borderWidth: '1.5px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: '24px',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(24px)',
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        position: 'relative' as const,
        overflow: 'hidden',
        '&::before': { // Noise texture
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.02,
          pointerEvents: 'none',
          zIndex: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        },
        '&::after': { // Specular highlight
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
          background: 'linear-gradient(125deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.01) 40%, transparent 100%)',
        },
        '&:hover': {
          transform: 'translateY(-4px) scale(1.01)',
          boxShadow: '0 12px 48px 0 rgba(0, 0, 0, 0.12)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backgroundColor: 'rgba(255, 255, 255, 0.06)',
          '&::after': {
             background: 'linear-gradient(125deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 40%, transparent 100%)',
          }
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
        backdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        transition: 'all 0.3s ease-in-out',
        position: 'relative' as const,
        overflow: 'hidden',
        '&::before': { // Noise texture
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.02,
          pointerEvents: 'none',
          zIndex: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        },
      },
      rounded: {
        borderRadius: '24px',
      },
      elevation1: { boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.05)' },
      elevation2: { boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.07)' },
      elevation3: { boxShadow: '0 12px 48px 0 rgba(0, 0, 0, 0.1)' },
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