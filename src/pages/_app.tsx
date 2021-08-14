import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClientProvider } from 'react-query';
import { theme } from '../styles/theme';
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';
import { queryClient } from '../services/queryClient';
import { UsersInsidesProvider } from '../contexts/UsersInsides.context';
import { AuthProvider } from '../contexts/Auth.context';
import { CommonsProvider } from '../contexts/Commons.context';

// if (process.env.NODE_ENV === 'development') {
//   makeServer();
// }

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <CommonsProvider>
          <AuthProvider>
            <UsersInsidesProvider>
              <SidebarDrawerProvider>
                <Component {...pageProps} />
              </SidebarDrawerProvider>
            </UsersInsidesProvider>
          </AuthProvider>
        </CommonsProvider>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
