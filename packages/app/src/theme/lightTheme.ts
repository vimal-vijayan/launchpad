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
        main: '#1E3A8A',  // Dark blue matching your logo
      },
      secondary: {
        main: '#3B82F6',  // Bright blue for contrast
      },
      error: {
        main: '#EF4444',  // A vibrant red for errors
      },
      warning: {
        main: '#F59E0B',  // Bright amber for warnings
      },
      info: {
        main: '#2563EB',  // Strong blue for informational messages
      },
      success: {
        main: '#10B981',  // Bright green for success
      },
      background: {
        default: '#e0e4ff',  // Light blue for a clean, neutral background
        paper: '#FFFFFF',    // Pure white for paper elements
      },
      banner: {
        info: '#2563EB',
        error: '#EF4444',
        text: '#1E3A8A',
        link: '#3B82F6',
      },
      errorBackground: '#FFCDD2',  // Light red for error backgrounds
      warningBackground: '#FFECB3',  // Light amber for warning backgrounds
      infoBackground: '#BBDEFB',  // Light blue for info backgrounds
      navigation: {
        background: '#e0e4ff',  // Soft light blue background for the sidebar
        indicator: '#A52A2A',   // Dark blue indicator to match the logo
        color: '#2563EB',       // Dark blue text to match the logo
        selectedColor: '#3B82F6',  // Bright blue for selected items
        hoverBackground: '#e4e0ff', // Same background color as default for hover
        hoverColor: '#1E3A8A',   // Dark blue text for hover
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
      body1: {
        fontSize: 16,
        lineHeight: 1.5,
      },
      body2: {
        fontSize: 14,
        lineHeight: 1.5,
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
    home: genPageTheme({ colors: ['#1E3A8A', '#A52A2A'], shape: shapes.wave }),
    documentation: genPageTheme({
      colors: ['#2563EB', '#A52A2A'],
      shape: shapes.wave2,
    }),
    tool: genPageTheme({ colors: ['#3B82F6', '#A52A2A'], shape: shapes.round }),
    service: genPageTheme({
      colors: ['#2563EB', '#1E3A8A'],
      shape: shapes.wave,
    }),
    website: genPageTheme({
      colors: ['#3B82F6', '#2563EB'],
      shape: shapes.wave,
    }),
    library: genPageTheme({
      colors: ['#1E3A8A', '#3B82F6'],
      shape: shapes.wave,
    }),
    other: genPageTheme({ colors: ['#2563EB', '#3B82F6'], shape: shapes.wave }),
    app: genPageTheme({ colors: ['#1E3A8A', '#3B82F6'], shape: shapes.wave }),
    apis: genPageTheme({ colors: ['#2563EB', '#A52A2A'], shape: shapes.wave }),
  },
});



