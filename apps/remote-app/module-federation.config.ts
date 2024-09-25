import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'remote-app',

  exposes: {
    './Module': './src/remote-entry.ts',
  },
};

export default config;
