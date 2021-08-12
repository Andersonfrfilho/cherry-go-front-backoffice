import Router from 'next/router';
import { createContext, ReactNode, useContext } from 'react';
import { AppError } from '../errors/AppError';
import { api } from '../services/apiClient';

type CreateUserInsidesServiceDTO = {
  name: string;
  last_name: string;
  cpf: string;
  rg: string;
  email: string;
  password: string;
  birth_date: string;
  gender: string;
  details?: any;
  active?: boolean;
};

type UsersInsidesContextData = {
  createUserInsides: (data: CreateUserInsidesServiceDTO) => Promise<void>;
};

type RegisterProviderProps = {
  children: ReactNode;
};

export const UsersInsidesContext = createContext({} as UsersInsidesContextData);

export function UsersInsidesProvider({ children }: RegisterProviderProps) {
  async function createUserInsides({
    email,
    password,
    birth_date,
    cpf,
    gender,
    last_name,
    name,
    rg,
    details,
  }: CreateUserInsidesServiceDTO) {
    console.log('######chegando##########');
    console.log({
      email,
      password,
      birth_date,
      cpf,
      gender,
      last_name,
      name,
      rg,
      details,
    });
    try {
      // await api.post('/v1/users/clients', {
      //   email,
      //   password,
      //   birth_date,
      //   cpf,
      //   gender,
      //   last_name,
      //   name,
      //   rg,
      //   details,
      // });
      // Router.push('/');
    } catch (err) {
      throw new AppError({
        message: err.response.data.message,
        status_code: err.response.status,
      });
    }
  }

  return (
    <UsersInsidesContext.Provider value={{ createUserInsides }}>
      {children}
    </UsersInsidesContext.Provider>
  );
}

export const useUsersInsides = () => useContext(UsersInsidesContext);
