import Router from 'next/router';
import { createContext, ReactNode, useContext, useState } from 'react';
import { SetStateAction } from 'toasted-notes/node_modules/@types/react';
import { Dispatch } from 'toasted-notes/node_modules/@types/react';
import { AppError } from '../errors/AppError';
import { ErrorData } from '../errors/Error.type';
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

type CommonsContextData = {
  isLoading: boolean;
  appError: Partial<ErrorData>;
  setAppError: Dispatch<SetStateAction<Partial<ErrorData>>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

type CommonsProviderProps = {
  children: ReactNode;
};

export const CommonsContext = createContext({} as CommonsContextData);

export function CommonsProvider({ children }: CommonsProviderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [appError, setAppError] = useState<Partial<ErrorData>>({});
  return (
    <CommonsContext.Provider
      value={{ isLoading, setIsLoading, appError, setAppError }}
    >
      {children}
    </CommonsContext.Provider>
  );
}

export const useCommons = () => useContext(CommonsContext);
