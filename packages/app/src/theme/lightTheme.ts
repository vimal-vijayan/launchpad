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
          main: '#343b58',
        },
        secondary: {
          main: '#565a6e',
        },
        error: {
          main: '#8c4351',
        },
        warning: {
          main: '#8f5e15',
        },
        info: {
          main: '#34548a',
        },
        success: {
          main: '#485e30',
        },
        background: {
          default: '#d5d6db',
          paper: '#d5d6db',
        },
        banner: {
          info: '#34548a',
          error: '#8c4351',
          text: '#343b58',
          link: '#565a6e',
        },
        errorBackground: '#8c4351',
        warningBackground: '#8f5e15',
        infoBackground: '#343b58',
        navigation: {
          background: '#343b58',
          indicator: '#8f5e15',
          color: '#d5d6db',
          selectedColor: '#ffffff',
        },
      },
      typography: {
        htmlFontSize: 16,
        fontFamily: 'Roboto, sans-serif',
        h1: {
          fontSize: 72,
          fontWeight: 700,
          marginBottom: 10,
        },
        h2: {
          fontSize: 40,
          fontWeight: 700,
          marginBottom: 8,
        },
        h3: {
          fontSize: 32,
          fontWeight: 700,
          marginBottom: 6,
        },
        h4: {
          fontWeight: 700,
          fontSize: 28,
          marginBottom: 6,
        },
        h5: {
          fontWeight: 700,
          fontSize: 24,
          marginBottom: 4,
        },
        h6: {
          fontWeight: 700,
          fontSize: 20,
          marginBottom: 2,
        },
      },
    }),
    defaultPageTheme: 'home',
    fontFamily: 'Roboto',
    
    /* below drives the header colors */
    pageTheme: {
      home: genPageTheme({ colors: ['#8c4351', '#343b58'], shape: shapes.wave }),
      documentation: genPageTheme({
        colors: ['#8c4351', '#343b58'],
        shape: shapes.wave2,
      }),
      tool: genPageTheme({ colors: ['#8c4351', '#343b58'], shape: shapes.round }),
      service: genPageTheme({
        colors: ['#8c4351', '#343b58'],
        shape: shapes.wave,
      }),
      website: genPageTheme({
        colors: ['#8c4351', '#343b58'],
        shape: shapes.wave,
      }),
      library: genPageTheme({
        colors: ['#8c4351', '#343b58'],
        shape: shapes.wave,
      }),
      other: genPageTheme({ colors: ['#8c4351', '#343b58'], shape: shapes.wave }),
      app: genPageTheme({ colors: ['#8c4351', '#343b58'], shape: shapes.wave }),
      apis: genPageTheme({ colors: ['#8c4351', '#343b58'], shape: shapes.wave }),
    },
  });