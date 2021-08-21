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

type UserType = {
  type: string;
  permissions: string[];
  roles: string[];
};

type User = {
  email: string;
  types: UserType[];
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
  const [user, setUser] = useState<User>();
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
        .get('/me', {
          headers: { Authorization: token },
        })
        .then(response => {
          const { email, permissions, roles } = response.data;

          setUser({ email, permissions, roles });
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

      const user_types = user_response.types.map(user_type => ({
        type: user_type.user_type,
        roles: user_type.roles,
        permissions: user_type.permissions,
      }));

      setUser({
        email: user_response.email,
        types: user_types,
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
