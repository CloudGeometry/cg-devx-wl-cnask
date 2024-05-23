import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline, useMediaQuery } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';

export enum ColorMode {
  light = 'light',
  dark = 'dark'
}

type ThemeContextType = {
  mode: ColorMode;
  toggleThemeMode: (mode: ColorMode) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  mode: ColorMode.light,
  toggleThemeMode: (mode) => undefined
});

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    ? ColorMode.dark
    : ColorMode.light;

  const [mode, setMode] = useState<ColorMode>(prefersDarkMode);

  const toggleThemeMode = useCallback((mode: ColorMode) => {
    setMode(mode);
  }, []);

  const theme = useMemo(() => {
    return createTheme({
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              height: '100vh'
            },
            '#root': {
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }
          }
        }
      },
      palette: {
        mode
      }
    });
  }, [mode]);

  // LocalizationProvider is required for MUI DatePickers, so it placed here in ThemeProvider
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeContext.Provider value={{ mode, toggleThemeMode }}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </EmotionThemeProvider>
      </ThemeContext.Provider>
    </LocalizationProvider>
  );
};

export const useMuiTheme = () => useContext(ThemeContext);
