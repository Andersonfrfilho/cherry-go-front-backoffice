import { interface_config } from './config.interface';

export const staging: interface_config = {
  application: {
    name: 'Cherry-go',
  },
  backend: {
    base_url: process.env.BACKEND_BASE_URL || 'http://localhost:3333',
  },
  password: {
    time_token_expires: 30,
  },
};
