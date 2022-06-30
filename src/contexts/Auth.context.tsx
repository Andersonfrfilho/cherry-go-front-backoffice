import Router from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { BroadcastChannel } from 'broadcast-channel';
import { AppError } from '../errors/AppError';
import { api } from '../services/apiClient';

type UserTypes = {
  id: string;
  name: string;
  description?: string | null;
};

type Types = {
  id: string;
  user_id: string;
  user_type_id: string;
  active: boolean;
  roles: string[];
  permissions: string[];
  created_at: Date;
  updated_at?: Date | null;
  deleted_at?: Date | null;
  user_type: UserTypes;
};
type User_Document_Image = {
  id: string;
  link: string;
};
export type User_Document = {
  id: string;
  user_id: string;
  image_id: string;
  value: string;
  description: string;
  created_at: string;
  updated_at: null;
  deleted_at: null;
  image: User_Document_Image;
};
export type User = {
  id: string;
  email: string;
  name: string;
  last_name: string;
  image: any;
  roles: string[];
  permissions: string[];
  types: Types[];
  documents: User_Document[];
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  user: User;
};

type AuthProviderProps = {
  children: ReactNode;
};

let authChannel = new BroadcastChannel('auth');

export async function signOut() {
  destroyCookie(undefined, 'nextauth.token');
  destroyCookie(undefined, 'nextauth.refresh_token');
  authChannel.postMessage('logout');
  await Router.push('/');
}
export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({
    name: 'admin',
    last_name: 'super user',
    email: 'admin@cherry-go.love',
    image: [],
    types: [],
    roles: [],
    permissions: [],
  });
  const isAuthenticated = !!user;
  useEffect(() => {
    authChannel = new BroadcastChannel('auth');
    authChannel.onmessage = message => {
      switch (message.data) {
        case 'signOut':
          signOut();
          break;
        default:
          break;
      }
    };
  }, []);
  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies();

    if (token) {
      api
        .get('/v1/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
          const { email, types, name, last_name, image_profile } =
            response.data;
          const data = types
            .map(type => ({
              roles: type.roles,
              permissions: type.permissions,
              types: [type.user_type.name],
            }))
            .reduce(
              (accumulator, currentValue) => ({
                ...accumulator,
                ...currentValue,
              }),
              {},
            );

          setUser({
            email,
            name,
            last_name,
            image: image_profile,
            permissions: data.permissions,
            roles: data.roles,
            types: data.types,
          });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/v1/users/sessions', {
        email,
        password,
      });

      const { user: user_response, token, refresh_token } = response.data;
      // sempre que executar do lado do browser deixe undefined
      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      setCookie(undefined, 'nextauth.refresh_token', refresh_token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      const data = user_response.types
        .map(type => ({
          roles: type.roles,
          permissions: type.permissions,
          types: [type.user_type.name],
        }))
        .reduce(
          (accumulator, currentValue) => ({
            ...accumulator,
            ...currentValue,
          }),
          {},
        );

      setUser({
        email,
        name: user_response.name,
        last_name: user_response.last_name,
        image: user_response.image_profile,
        permissions: data.permissions,
        roles: data.roles,
        types: data.types,
      });

      api.defaults.headers.Authorization = `Bearer ${token}`;

      await Router.push('/dashboard');
    } catch (err) {
      throw new AppError({
        message: err.response.data.message,
        status_code: err.response.status,
        code: err.response.data.code,
      });
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
