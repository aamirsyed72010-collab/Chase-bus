// src/theme.ts

// Material Design 3 (Material You) Color Tokens
// Generated or approximated for a purple-based theme

export const darkPalette = {
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
  surface: {
    main: '#1D1B20',
    variant: '#49454F',
  },
  text: {
    primary: '#E6E1E5',
    secondary: '#CAC4D0',
  },
  divider: '#49454F',
};

export const lightPalette = {
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
    paper: '#FFFBFE', // Surface color in MD3 is often same as background or slightly tinted
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
        backgroundColor: 'transparent', // Transparent for dynamic color or surface color
        color: 'inherit',
        boxShadow: 'none',
        backgroundImage: 'none', // Remove default gradient
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '20px', // Pill shape
        padding: '10px 24px',
      },
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: '12px', // Medium shape
        boxShadow: 'none', // Use tonal elevation (background color)
        // backgroundColor is handled by palette.background.paper
        border: '1px solid transparent', // Optional: for outline variant
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none', // Disable overlay for dark mode
      },
      rounded: {
        borderRadius: '12px',
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: '4px', // Small shape for text fields
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: '8px', // Small shape
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: '28px', // Extra large shape
      },
    },
  },
};