import { InterfaceConfig, interface_config } from './config.interface';
import { development } from './development';
import { production } from './production';
import { staging } from './staging';
import { test } from './test';

const configs: InterfaceConfig = {
  development,
  production,
  staging,
  test,
};

const config: interface_config = configs[process.env.NODE_ENV];

export { config };
