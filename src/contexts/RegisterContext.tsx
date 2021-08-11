import Router from 'next/router';
import { createContext, ReactNode } from 'react';
import { AppError } from '../errors/AppError';
import { api } from '../services/apiClient';

type CreateUserClientServiceDTO = {
  name: string;
  last_name: string;
  cpf: string;
  rg: string;
  email: string;
  password: string;
  birth_date: Date;
  gender: string;
  details?: any;
  active?: boolean;
};

type RegisterContextData = {
  createUser: (data: CreateUserClientServiceDTO) => Promise<void>;
};

type RegisterProviderProps = {
  children: ReactNode;
};

export const RegisterContext = createContext({} as RegisterContextData);

export function RegisterProvider({ children }: RegisterProviderProps) {
  async function createUser({
    email,
    password,
    birth_date,
    cpf,
    gender,
    last_name,
    name,
    rg,
    active,
    details,
  }: CreateUserClientServiceDTO) {
    try {
      const response = await api.post('/v1/users/clients', {
        email,
        password,
      });

      const { permissions, roles, token, refresh_token } = response.data;

      Router.push('/');
    } catch (err) {
      throw new AppError({
        message: err.response.data.message,
        status_code: err.response.status,
      });
    }
  }

  return (
    <RegisterContext.Provider value={{ createUser }}>
      {children}
    </RegisterContext.Provider>
  );
}
