import {
    createBaseThemeOptions,
    createUnifiedTheme,
    genPageTheme,
    palettes,
    shapes,
  } from '@backstage/theme';
  
  export const darkTheme = createUnifiedTheme({
    ...createBaseThemeOptions({
      palette: {
        ...palettes.dark,
        primary: {
          main: '#3B82F6',  // Brighter blue for better contrast
        },
        secondary: {
          main: '#60A5FA',  // Light blue for contrast
        },
        error: {
          main: '#EF4444',  // A vibrant red for errors
        },
        warning: {
          main: '#F59E0B',  // Bright amber for warnings
        },
        info: {
          main: '#60A5FA',  // Light blue for informational messages
        },
        success: {
          main: '#10B981',  // Bright green for success
        },
        background: {
          default: '#121212',  // Dark background
          paper: '#1E1E1E',    // Darker shade for paper elements
        },
        banner: {
          info: '#60A5FA',
          error: '#EF4444',
          text: '#FFFFFF', // White text for banners
          link: '#60A5FA',
        },
        errorBackground: '#442C2C',  // Dark red for error backgrounds
        warningBackground: '#4A3D29',  // Dark amber for warning backgrounds
        infoBackground: '#243447',  // Dark blue for info backgrounds
        navigation: {
          background: '#1E1E1E',  // Dark background for the sidebar
          indicator: '#60A5FA',   // Brighter blue indicator for better visibility
          color: '#FFFFFF',       // White text
          selectedColor: '#60A5FA',  // Brighter blue for selected items
          hoverBackground: '#2C2C2C', // Slightly lighter for hover background
          hoverColor: '#60A5FA',   // Brighter blue text for hover
        },
      },
      typography: {
        htmlFontSize: 16,
        fontFamily: 'Roboto, sans-serif',
        h1: {
          fontSize: 64,
          fontWeight: 600,
          marginBottom: 16,
          // color: '#FFFFFF', // White for better contrast
        },
        h2: {
          fontSize: 48,
          fontWeight: 600,
          marginBottom: 14,
          // color: '#FFFFFF', // White for better contrast
        },
        h3: {
          fontSize: 36,
          fontWeight: 600,
          marginBottom: 12,
          // color: '#FFFFFF', // White for better contrast
        },
        h4: {
          fontSize: 30,
          fontWeight: 600,
          marginBottom: 10,
          // color: '#FFFFFF', // White for better contrast
        },
        h5: {
          fontSize: 24,
          fontWeight: 600,
          marginBottom: 8,
          // color: '#FFFFFF', // White for better contrast
        },
        h6: {
          fontSize: 20,
          fontWeight: 600,
          marginBottom: 6,
          // color: '#FFFFFF', // White for better contrast
        },
        // body1: {
        //   fontSize: 16,
        //   lineHeight: 1.5,
        //   color: '#DDDDDD',  // Lighter text for readability
        // },
        // body2: {
        //   fontSize: 14,
        //   lineHeight: 1.5,
        //   color: '#BBBBBB',  // Lighter text for secondary readability
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
      home: genPageTheme({ colors: ['#3B82F6', '#A52A2A'], shape: shapes.wave }),
      documentation: genPageTheme({
        colors: ['#60A5FA', '#A52A2A'],
        shape: shapes.wave2,
      }),
      tool: genPageTheme({ colors: ['#60A5FA', '#A52A2A'], shape: shapes.round }),
      service: genPageTheme({
        colors: ['#60A5FA', '#3B82F6'],
        shape: shapes.wave,
      }),
      website: genPageTheme({
        colors: ['#60A5FA', '#3B82F6'],
        shape: shapes.wave,
      }),
      library: genPageTheme({
        colors: ['#3B82F6', '#60A5FA'],
        shape: shapes.wave,
      }),
      other: genPageTheme({ colors: ['#60A5FA', '#3B82F6'], shape: shapes.wave }),
      app: genPageTheme({ colors: ['#3B82F6', '#60A5FA'], shape: shapes.wave }),
      apis: genPageTheme({ colors: ['#60A5FA', '#A52A2A'], shape: shapes.wave }),
    },
  });
  