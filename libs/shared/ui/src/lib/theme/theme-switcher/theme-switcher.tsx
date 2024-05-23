import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import {
  Box,
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { ColorMode, useMuiTheme } from '../theme-provider/theme-provider';
import { useEffect, useId, useState } from 'react';
import { getStoredTheme, setStoredTheme } from '../utils';
import { i18n } from '@cnask/i18n/feature';
import { useTranslation } from 'react-i18next';

const isDark = window.matchMedia('(prefers-color-scheme: dark)')?.matches;

const options = [
  {
    id: 'light',
    name: i18n.t('features.themeSelect.light'),
    code: ColorMode.light,
    icon: <LightModeIcon />
  },
  {
    id: 'system',
    name: i18n.t('features.themeSelect.system'),
    code: isDark ? ColorMode.dark : ColorMode.light,
    icon: <AutoModeIcon />
  },
  {
    id: 'dark',
    name: i18n.t('features.themeSelect.dark'),
    code: ColorMode.dark,
    icon: <DarkModeIcon />
  }
];

const lsTheme = getStoredTheme();
const initTheme =
  lsTheme && options.map(({ id }) => id).includes(lsTheme)
    ? lsTheme
    : options[1].id; // stored theme or system one as a fallback

const getThemeCode = (value: string) =>
  options.find((opt) => opt.id === value)?.code as ColorMode;

export function ThemeSwitcher() {
  const id = useId();
  const { toggleThemeMode, mode } = useMuiTheme();
  const [currentTheme, setCurrentTheme] = useState(() => initTheme);
  const { t } = useTranslation();
  const handleThemeChange = (e: SelectChangeEvent) => {
    const nextTheme = getThemeCode(e.target.value);

    toggleThemeMode(nextTheme);

    setStoredTheme(e.target.value);
    setCurrentTheme(e.target.value);
  };

  useEffect(() => {
    const currentMode = getThemeCode(currentTheme);

    if (currentMode !== mode) {
      toggleThemeMode(currentMode);
    }
  }, [currentTheme, mode, toggleThemeMode]);

  return (
    <Box>
      <FormControl
        variant='outlined'
        size='small'
        sx={{ minWidth: 120 }}
      >
        <InputLabel id={id}>{t('features.themeSelect.title')}</InputLabel>

        <Select
          onChange={handleThemeChange}
          value={currentTheme}
          id={id}
          label={t('features.themeSelect.title')}
        >
          {options.map((themeVariant) => (
            <MenuItem
              key={themeVariant.id}
              value={themeVariant.id}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ListItemIcon>{themeVariant.icon}</ListItemIcon>
                <ListItemText primary={themeVariant.name} />
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default ThemeSwitcher;
