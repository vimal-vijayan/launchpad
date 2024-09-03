import {
    createBaseThemeOptions,
    createUnifiedTheme,
    genPageTheme,
    palettes,
    shapes,
  } from '@backstage/theme';
  
  export const greenTheme = createUnifiedTheme({
    ...createBaseThemeOptions({
      palette: {
        ...palettes.light,
        primary: {
          main: '#1B5E20',  // Darker green for primary
        },
        secondary: {
          main: '#66BB6A',  // Light green for contrast
        },
        error: {
          main: '#D32F2F',  // Red for errors
        },
        warning: {
          main: '#FBC02D',  // Amber for warnings
        },
        info: {
          main: '#1976D2',  // Blue for informational messages
        },
        success: {
          main: '#388E3C',  // Green for success
        },
        background: {
          default: '#E8F5E9',  // Light green for a neutral background
          paper: '#FFFFFF',    // Pure white for paper elements
        },
        banner: {
          info: '#1B5E20',
          error: '#D32F2F',
          text: '#1B5E20',
          link: '#66BB6A',
        },
        errorBackground: '#FFCDD2',  // Light red for error backgrounds
        warningBackground: '#FFF9C4',  // Light yellow for warning backgrounds
        infoBackground: '#BBDEFB',  // Light blue for info backgrounds
        navigation: {
          background: '#1B5E20',  // Darker green background for the sidebar
          indicator: '#66BB6A',   // Light green indicator to provide contrast
          color: '#FFFFFF',       // White text for better contrast with green background
          selectedColor: '#66BB6A',  // Light green for selected items
          hoverBackground: '#388E3C', // Green background for hover effect
          hoverColor: '#FFFFFF',   // White text for hover effect
        },
      },
      typography: {
        htmlFontSize: 16,
        fontFamily: 'Roboto, sans-serif',
        h1: {
          fontSize: 64,
          fontWeight: 600,
          marginBottom: 16,
          // color: '#1B5E20',
        },
        h2: {
          fontSize: 48,
          fontWeight: 600,
          marginBottom: 14,
          // color: '#1B5E20',
        },
        h3: {
          fontSize: 36,
          fontWeight: 600,
          marginBottom: 12,
          // color: '#1B5E20',
        },
        h4: {
          fontSize: 30,
          fontWeight: 600,
          marginBottom: 10,
          // color: '#1B5E20',
        },
        h5: {
          fontSize: 24,
          fontWeight: 600,
          marginBottom: 8,
          // color: '#1B5E20',
        },
        h6: {
          fontSize: 20,
          fontWeight: 600,
          marginBottom: 6,
          // color: '#1B5E20',
        },
        // body1: {
        //   fontSize: 16,
        //   lineHeight: 1.5,
        //   color: '#1B5E20',
        // },
        // body2: {
        //   fontSize: 14,
        //   lineHeight: 1.5,
        //   color: '#1B5E20',
        // },
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
      home: genPageTheme({ colors: ['#1B5E20', '#66BB6A'], shape: shapes.wave }),
      documentation: genPageTheme({
        colors: ['#1B5E20', '#66BB6A'],
        shape: shapes.wave2,
      }),
      tool: genPageTheme({ colors: ['#66BB6A', '#1B5E20'], shape: shapes.round }),
      service: genPageTheme({
        colors: ['#1B5E20', '#66BB6A'],
        shape: shapes.wave,
      }),
      website: genPageTheme({
        colors: ['#66BB6A', '#1B5E20'],
        shape: shapes.wave,
      }),
      library: genPageTheme({
        colors: ['#1B5E20', '#66BB6A'],
        shape: shapes.wave,
      }),
      other: genPageTheme({ colors: ['#1B5E20', '#66BB6A'], shape: shapes.wave }),
      app: genPageTheme({ colors: ['#1B5E20', '#66BB6A'], shape: shapes.wave }),
      apis: genPageTheme({ colors: ['#1B5E20', '#66BB6A'], shape: shapes.wave }),
    },
  });
  