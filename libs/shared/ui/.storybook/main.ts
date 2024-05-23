import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  stories: ['../src/lib/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-interactions',
    // 'storybook-addon-apollo-client',
    '@storybook/addon-styling'
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: ''
      }
    }
  },
  core: {
    disableTelemetry: true
  },
  docs: {
    autodocs: 'tag'
  },
  typescript: {
    check: false,
    // checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false

      },
      // speeds up storybook build time
      // allowSyntheticDefaultImports: false,
      // speeds up storybook build time

      // makes union prop types like variant and size appear as select controls
      shouldExtractLiteralValuesFromEnum: true,
      // makes string and boolean types that can be undefined appear as inputs and switches
      shouldRemoveUndefinedFromOptional: true,
      // Filter out third-party props from node_modules except @mui packages
      propFilter: (prop) =>
        prop.parent ? !/node_modules\/(?!@mui)/.test(prop.parent.fileName) : true
    }
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [
        tsconfigPaths({
          projects: ['../../..tsconfig.base.json'] // exact path to your workspace tsconfig.json
        })
      ]
    });
  }
};


export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration

