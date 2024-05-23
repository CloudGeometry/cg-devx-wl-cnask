export const ACCESS_TOKEN = 'token_tenant_admin';
export const REFRESH_TOKEN = 'refresh_token_tenant_admin';

export const getToken = (key?: string): null | string => {
  return localStorage.getItem(key || ACCESS_TOKEN) || null;
};
export const setToken = (token: string, key?: string): void => {
  localStorage.setItem(key || ACCESS_TOKEN, token);
};
export const removeTokens = (): void => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};
