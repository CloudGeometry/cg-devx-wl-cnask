import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/web-tenant-admin',

  server: {
    port: 4210,
    host: 'localhost'
  },

  preview: {
    port: 4300,
    host: 'localhost'
  },

  plugins: [
    react(),
    viteTsConfigPaths({
      root: '../../',
      projects: [
        './apps/web-tenant-admin/tsconfig.json',
        './libs/examples/tsconfig.json',
        './libs/casl/feature/tsconfig.json',
        './libs/i18n/feature/tsconfig.json',
        './libs/i18n/ui/tsconfig.json',
        './libs/shared/feature/tsconfig.json',
        './libs/shared/ui/tsconfig.json',
        './libs/utils/api-tenant/tsconfig.json',
        './libs/shared/utils/tsconfig.json',
        './libs/utils/api-client/tsconfig.json',
        './libs/shared/ui/.storybook/tsconfig.json'
      ]
    })
  ]
});
