import {
  createBaseThemeOptions,
  createUnifiedTheme,
  genPageTheme,
  palettes,
  shapes,
} from '@backstage/theme';

export const lightTheme = createUnifiedTheme({
  ...createBaseThemeOptions({
    palette: {
      ...palettes.light,
      primary: {
        main: '#051d55',  // Dark blue for primary
      },
      secondary: {
        main: '#4D7CFE',  // Bright blue for secondary
      },
      error: {
        main: '#EF4444',  // Bright red for errors
      },
      warning: {
        main: '#F59E0B',  // Bright amber for warnings
      },
      info: {
        main: '#1C4E80',  // Strong blue for informational messages
      },
      success: {
        main: '#10B981',  // Bright green for success
      },
      background: {
        default: '#F3F4F6',  // Light gray for a neutral background with better contrast
        paper: '#FFFFFF',    // Pure white for paper elements
      },
      banner: {
        info: '#1C4E80',
        error: '#EF4444',
        text: '#0A369D',
        link: '#4D7CFE',
      },
      errorBackground: '#FFCDD2',  // Light red for error backgrounds
      warningBackground: '#FFECB3',  // Light amber for warning backgrounds
      infoBackground: '#BBDEFB',  // Light blue for info backgrounds
      navigation: {
        background: '#051d55',  // Dark blue background for the sidebar
        indicator: '#bb1a4a',   // Brown indicator to provide contrast
        color: '#FFFFFF',       // White text for better contrast with dark blue background
        selectedColor: '#E7527E', // Pink for selected items
        navItem: {
          hoverBackground: '#374A77',  // Bright blue background for hovered items
        },
        submenu: {
          background: '#374A77',  // Bright blue background for submenus
        }
      },
    },
    typography: {
      htmlFontSize: 16,
      fontFamily: 'Roboto, sans-serif',
      h1: {
        fontSize: 64,
        fontWeight: 600,
        marginBottom: 16,
      },
      h2: {
        fontSize: 48,
        fontWeight: 600,
        marginBottom: 14,
      },
      h3: {
        fontSize: 36,
        fontWeight: 600,
        marginBottom: 12,
      },
      h4: {
        fontSize: 30,
        fontWeight: 600,
        marginBottom: 10,
      },
      h5: {
        fontSize: 24,
        fontWeight: 600,
        marginBottom: 8,
      },
      h6: {
        fontSize: 20,
        fontWeight: 600,
        marginBottom: 6,
      },
    },
  }),
  defaultPageTheme: 'home',
  fontFamily: 'Roboto',
  components: {
    BackstageHeader: {
      styleOverrides: {
        header: ({ theme }) => ({
          width: 'auto',
          margin: '5px',
          boxShadow: 'none',
          borderBottom: `6px solid ${theme.palette.primary.main}`,
        }),
      },
    },
  },
  pageTheme: {
    home: genPageTheme({ colors: ['#0A369D', '#A52A2A'], shape: shapes.wave }),
    documentation: genPageTheme({
      colors: ['#1C4E80', '#A52A2A'],
      shape: shapes.wave2,
    }),
    tool: genPageTheme({ colors: ['#4D7CFE', '#A52A2A'], shape: shapes.round }),
    service: genPageTheme({
      colors: ['#1C4E80', '#0A369D'],
      shape: shapes.wave,
    }),
    website: genPageTheme({
      colors: ['#4D7CFE', '#1C4E80'],
      shape: shapes.wave,
    }),
    library: genPageTheme({
      colors: ['#0A369D', '#4D7CFE'],
      shape: shapes.wave,
    }),
    other: genPageTheme({ colors: ['#1C4E80', '#4D7CFE'], shape: shapes.wave }),
    app: genPageTheme({ colors: ['#0A369D', '#4D7CFE'], shape: shapes.wave }),
    apis: genPageTheme({ colors: ['#1C4E80', '#A52A2A'], shape: shapes.wave }),
  },
});
