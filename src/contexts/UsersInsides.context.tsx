import axios from 'axios';
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

export type CreateAddressesUserInsidesServiceDTO = {
  user_id?: string;
  street: string;
  number: string;
  zipcode: string;
  district: string;
  city: string;
  state: string;
  country: string;
  longitude?: string;
  latitude?: string;
};

type User = {
  id: string;
  name: string;
  last_name: string;
  cpf: string;
  rg: string;
  email: string;
  birth_date: string;
  gender: string;
  details?: any;
  active?: boolean;
  password_confirm: string;
};

type UsersInsidesContextData = {
  createUserInsides: (data: CreateUserInsidesServiceDTO) => Promise<void>;
  resendActiveMailUser: (token: string) => Promise<void>;
  resendActiveMailUserByMail: (email: string) => Promise<void>;
  createPhoneUserInsides: (phone: string) => Promise<void>;
  createAddressUserInsides: (
    data: CreateAddressesUserInsidesServiceDTO
  ) => Promise<void>;
  user: User;
};

type RegisterProviderProps = {
  children: ReactNode;
};

export const UsersInsidesContext = createContext({} as UsersInsidesContextData);

export function UsersInsidesProvider({ children }: RegisterProviderProps) {
  const [user, setUser] = useState<User>(null);
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
      const { data } = await api.post('/v1/users/insides', {
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
      setUser(data);
    } catch (err) {
      throw new AppError({
        message: err.response.data.message,
        status_code: err.response.status,
        code: err.response.data.code,
      });
    }
  }

  async function resendActiveMailUser(token: string) {
    try {
      await api.post('/v1/users/confirm/mail/resend', {
        token,
      });
    } catch (err) {
      throw new AppError({
        message: err.response.data.message,
        status_code: err.response.status,
        code: err.response.data.code,
      });
    }
  }

  async function resendActiveMailUserByMail(email: string) {
    try {
      await api.post('/v1/users/confirm/mail/resend/mail', {
        email,
      });
    } catch (err) {
      throw new AppError({
        message: err.response.data.message,
        status_code: err.response.status,
        code: err.response.data.code,
      });
    }
  }

  async function createPhoneUserInsides(phone: string) {
    try {
      await api.post('/v1/users/confirm/mail/resend/mail', {
        phone,
      });
    } catch (err) {
      throw new AppError({
        message: err.response.data.message,
        status_code: err.response.status,
        code: err.response.data.code,
      });
    }
  }

  async function createAddressUserInsides({
    zipcode,
    city,
    country,
    district,
    number,
    state,
    street,
  }: CreateAddressesUserInsidesServiceDTO) {
    try {
      // TODO:: adicionar a longitude e latitude
      await api.post('/v1/users/insides/addresses', {
        user_id: user.id,
        zipcode,
        city,
        country,
        district,
        number,
        state,
        street,
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
    <UsersInsidesContext.Provider
      value={{
        createUserInsides,
        resendActiveMailUser,
        resendActiveMailUserByMail,
        createPhoneUserInsides,
        createAddressUserInsides,
        user,
      }}
    >
      {children}
    </UsersInsidesContext.Provider>
  );
}

export const useUsersInsides = () => useContext(UsersInsidesContext);
