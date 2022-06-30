import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Link,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import NextLink from 'next/link';
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { Header } from '../../components/Header';
import { Pagination, PaginationProps } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';
import {
  getUsers,
  PaginationPropsDTO,
  useUsers,
} from '../../services/hooks/useUsers';
import { queryClient } from '../../services/queryClient';
import { api } from '../../services/apiClient';

export default function UserList({ users, total }) {
  const [pageProps, setPageProps] = useState<PaginationPropsDTO>({
    per_page: '10',
    page: '1',
    order: { property: 'name', ordering: 'DESC' },
    fields: undefined,
  });
  const { data, isLoading, isFetching, error } = useUsers(pageProps, {
    initialData: users,
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handlePrefectUser(userId: string) {
    await queryClient.prefetchQuery(
      ['user', userId],
      async () => {
        const response = await api.get(`/v1/users/${userId}`);
        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10,
      },
    );
  }

  return (
    <Box>
      <Header />
      <Flex
        width="100%"
        marginY="6"
        maxWidth={1480}
        marginX="auto"
        paddingX="6"
      >
        <Sidebar />
        <Box flex="1" borderRadius={8} backgroundColor="gray.800" padding="8">
          <Flex
            marginBottom="8"
            justifyContent="space-between"
            alignItems="center"
          >
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" marginLeft="4" />
              )}
            </Heading>
            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>
          {isLoading ? (
            <Flex justifyContent="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justifyContent="center">
              <Text>Falha ao obter dados do usuário</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th paddingX={['4', '4', '6']} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th width="8" />
                  </Tr>
                </Thead>
                <Tbody>
                  {users.map(user => {
                    return (
                      <Tr key={user.id}>
                        <Td paddingX={['4', '4', '6']}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Link
                              color="purple.400"
                              onMouseEnter={() => handlePrefectUser(user.id)}
                            >
                              <Text fontWeight="bold">{user.name}</Text>
                            </Link>
                            <Text fontWeight="sm" color="gray.300">
                              {user.email}
                            </Text>
                          </Box>
                        </Td>
                        {isWideVersion && (
                          <Td>
                            <Text>{user.createdAt}</Text>
                          </Td>
                        )}
                        <Td>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="pink"
                            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                          >
                            {isWideVersion ? 'Editar' : ''}
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
              <Pagination
                totalCountOfRegisters={total}
                currentPage={Number(pageProps.page)}
                pageProps={pageProps}
                onPageChange={setPageProps}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { users, total } = await getUsers({});
  return {
    props: { users, total },
  };
};
