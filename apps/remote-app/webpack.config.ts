import { composePlugins, withNx } from '@nx/webpack';
import { withReact } from '@nx/react';
import { withModuleFederation } from '@nx/react/module-federation';
import {container} from 'webpack'
import baseConfig from './module-federation.config';
import { ModuleFederationPlugin } from '@module-federation/enhanced/webpack';

const config = {
  ...baseConfig,
};

// Nx plugins for webpack to build config object from Nx options and context.
export default composePlugins(
  withNx(),
  withReact(),
  (config, { options, context }) => {
    config.output = {
      publicPath: 'auto',
      uniqueName: 'remote',
      scriptType: 'text/javascript'
    }

    config.plugins.push(new container.ModuleFederationPlugin({
      name: 'remote',
      filename: 'remoteEntry.js',
      exposes: {
        '.': './src/remote-entry.ts',
      },
      shared: {
        react: {
          eager: true,
          singleton: true,
          requiredVersion: '18.2.0'
        }
      }
    }));

    return config;
  }
);
