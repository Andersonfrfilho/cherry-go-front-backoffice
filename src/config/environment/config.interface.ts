interface app {
  name: string;
}

interface backend {
  base_url: string;
}

interface password {
  time_token_expires: number;
}

export interface interface_config {
  application: app;
  backend: backend;
  password: password;
}

export interface InterfaceConfig {
  development: interface_config;
  staging: interface_config;
  production: interface_config;
  test: interface_config;
}
