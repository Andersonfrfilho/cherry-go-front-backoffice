import { interface_config } from './config.interface';

export const test: interface_config = {
  application: {
    name: 'Cherry-go',
  },
  backend: {
    base_url: 'http://localhost:3333',
  },
  password: {
    time_token_expires: 30,
  },
};
