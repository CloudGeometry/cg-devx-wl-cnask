// import { MockedProvider } from '@apollo/client/testing';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import { darkTheme, lightTheme } from '../src/lib/theme/themes';
/* snipped for brevity */

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
    defaultTheme: 'light',
    Provider: ThemeProvider,
    GlobalStyles: CssBaseline,
  })];


export const parameters = {
  // apolloClient: {
  //   MockedProvider
  //   // any props you want to pass to MockedProvider on every story
  // },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true, // Adds the description and default columns
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};
