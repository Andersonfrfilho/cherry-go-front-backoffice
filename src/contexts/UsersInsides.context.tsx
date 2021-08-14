import Router from 'next/router';
import { createContext, ReactNode, useContext, useState } from 'react';
import { AppError } from '../errors/AppError';
import { api } from '../services/apiClient';
import { formattedDate, removeCharacterSpecial } from '../utils/validate';

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
  password_confirm: string;
};

type ActiveUserInsidesServiceDTO = {
  token: string;
  last_name: string;
  cpf: string;
  rg: string;
  email: string;
  password: string;
  birth_date: string;
  gender: string;
  details?: any;
  active?: boolean;
  password_confirm: string;
};

type UsersInsidesContextData = {
  createUserInsides: (data: CreateUserInsidesServiceDTO) => Promise<void>;
  activeUser: (data: CreateUserInsidesServiceDTO) => Promise<void>;
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
    password_confirm,
  }: CreateUserInsidesServiceDTO) {
    try {
      await api.post('/v1/users/insides', {
        email,
        password,
        password_confirm,
        birth_date: formattedDate(birth_date),
        cpf: removeCharacterSpecial(cpf),
        gender,
        last_name,
        name,
        rg: removeCharacterSpecial(rg),
        details,
      });
    } catch (err) {
      throw new AppError({
        message: err.response.data.message,
        status_code: err.response.status,
        code: err.response.data.code,
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
