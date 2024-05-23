import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    port: 4200,
    host: 'localhost'
  },

  preview: {
    port: 4300,
    host: 'localhost'
  },

  optimizeDeps: {
    include: ['@mui/material']
  },

  plugins: [
    react(),
    viteTsConfigPaths({
      root: '../../',
      projects: [
        './apps/web-client/tsconfig.json',
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
