import {composePlugins, withNx} from '@nx/webpack';
import {withReact} from '@nx/react';
import {withModuleFederation} from '@nx/react/module-federation';
import baseConfig from './module-federation.config';
import {container} from "webpack";
import {ModuleFederationPlugin} from '@module-federation/enhanced/webpack';

const config = {
  ...baseConfig,
};

export default composePlugins(
  withNx(),
  withReact(),
  (config, {options, context}) => {


    config.output = {
      publicPath: 'auto',
      uniqueName: 'remote',
      scriptType: 'text/javascript'
    }

    config.plugins.push(new container.ModuleFederationPlugin({
      name: 'host',

      shared: {
        react: {
          eager: true,
          singleton: true,
          requiredVersion: '18.2.0',
        }
      }
    }));

    return config;
  }
);
