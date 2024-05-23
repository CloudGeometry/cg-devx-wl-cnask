export const setStoredTheme = (theme: string) => {
  localStorage.setItem('theme', theme);
};

export const getStoredTheme = () => {
  return localStorage.getItem('theme');
};
