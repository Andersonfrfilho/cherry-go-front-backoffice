import { Router } from 'next/router';
import { createContext, ReactNode, useContext, useState } from 'react';
import {
  Dispatch,
  SetStateAction,
} from 'toasted-notes/node_modules/@types/react';
import { AppError } from '../errors/AppError';
import { api } from '../services/apiClient';
import { PaginationPropsDTO } from '../services/hooks/useUsers';
import { formattedDate, removeCharacterSpecial } from '../utils/validate';
import { User as UserAuth } from '../../../contexts/Auth.context';

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

export type CreateForgotPasswordUserInsidesServiceDTO = {
  email: string;
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

export type CreatePhoneDTO = {
  country_code: string;
  ddd: string;
  number: string;
};

type CreateResetPasswordUserFormDTO = {
  token: string;
  password: string;
};

interface ActiveUserProvidersDTO {
  user_id: string;
  active: boolean;
  user_type_user_id: string;
}
interface ActiveUserProviderWithPaginationDTO {
  users: ActiveUserProvidersDTO[];
  paginationProps: PaginationPropsDTO;
}

type UsersInsidesContextData = {
  createUserInsides: (data: CreateUserInsidesServiceDTO) => Promise<void>;
  resendActiveMailUser: (token: string) => Promise<void>;
  resendActiveMailUserByMail: (email: string) => Promise<void>;
  createPhoneUserInsides: (data: CreatePhoneDTO) => Promise<void>;
  activeUserProviders: (
    data: ActiveUserProviderWithPaginationDTO,
  ) => Promise<User[]>;
  createAddressUserInsides: (
    data: CreateAddressesUserInsidesServiceDTO,
  ) => Promise<void>;
  confirmPhoneUserInsides: (code: string) => Promise<void>;
  createForgotPasswordUserInsides: (email: string) => Promise<void>;
  createResetPasswordUserInsides: (
    data: CreateResetPasswordUserFormDTO,
  ) => Promise<void>;
  user: User;
  phoneConfirmation: boolean;
  resetPasswordConfirmation: boolean;
  setResetPasswordConfirmation: Dispatch<SetStateAction<boolean>>;
};

type RegisterProviderProps = {
  children: ReactNode;
};

export const UsersInsidesContext = createContext({} as UsersInsidesContextData);

export function UsersInsidesProvider({ children }: RegisterProviderProps) {
  const [user, setUser] = useState<User>(null);
  const [phoneConfirmation, setPhoneConfirmation] = useState<boolean>(false);
  const [resetPasswordConfirmation, setResetPasswordConfirmation] =
    useState<boolean>(false);
  const [phoneToken, setPhoneToken] = useState<string>('');
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

  async function createPhoneUserInsides({
    ddd,
    country_code,
    number,
  }: CreatePhoneDTO) {
    try {
      const {
        data: { token },
      } = await api.post('/v1/users/insides/phones', {
        ddd: removeCharacterSpecial(ddd),
        country_code,
        number: removeCharacterSpecial(number),
        user_id: `59a4a391-e4c6-4940-acc3-4d0a8e2d8a56`,
      });
      setPhoneToken(token);
      setPhoneConfirmation(true);
    } catch (err) {
      throw new AppError({
        message: err.response.data.message,
        status_code: err.response.status,
        code: err.response.data.code,
      });
    }
  }

  async function confirmPhoneUserInsides(code: string) {
    try {
      await api.post('/v1/users/insides/phones/confirm', {
        code,
        token: phoneToken,
        user_id: user.id,
      });
      setPhoneToken('');
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

  async function createForgotPasswordUserInsides(email: string) {
    try {
      // TODO:: adicionar a longitude e latitude
      await api.post('/v1/users/password/forgot', {
        email,
      });
      setResetPasswordConfirmation(true);
    } catch (err) {
      throw new AppError({
        message: err.response.data.message,
        status_code: err.response.status,
        code: err.response.data.code,
      });
    }
  }

  async function createResetPasswordUserInsides({
    password,
    token,
  }: CreateResetPasswordUserFormDTO) {
    try {
      // TODO:: adicionar a longitude e latitude
      await api.post('/v1/users/password/reset', {
        password,
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

  async function activeUserProviders({
    users: data,
    paginationProps,
  }: ActiveUserProviderWithPaginationDTO): Promise<UserAuth[]> {
    try {
      // TODO:: adicionar a longitude e latitude
      const { limit, skip } = paginationProps;
      const {
        data: { results: users },
      } = await api.patch(
        `/v1/users/providers/type/active?limit=${limit}&skip=${skip}`,
        data,
      );
      return users;
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
        confirmPhoneUserInsides,
        createForgotPasswordUserInsides,
        createResetPasswordUserInsides,
        activeUserProviders,
        user,
        phoneConfirmation,
        resetPasswordConfirmation,
        setResetPasswordConfirmation,
      }}
    >
      {children}
    </UsersInsidesContext.Provider>
  );
}

export const useUsersInsides = () => useContext(UsersInsidesContext);
