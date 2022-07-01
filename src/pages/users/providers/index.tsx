import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  Image,
} from '@chakra-ui/react';
import { AiFillCheckCircle, AiFillWarning } from 'react-icons/ai';
import { RiAddLine } from 'react-icons/ri';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Header } from '../../../components/Header';
import { Pagination } from '../../../components/Pagination';
import { Sidebar } from '../../../components/Sidebar';
import {
  getUsersProviders,
  PaginationPropsDTO,
  useUsers,
} from '../../../services/hooks/useUsers';
import { queryClient } from '../../../services/queryClient';
import { api } from '../../../services/apiClient';
import { User, User_Document } from '../../../contexts/Auth.context';
import { useUsersInsides } from '../../../contexts/UsersInsides.context';

interface UserProviderListDTO {
  users: User[];
  total: number;
  current_page: number;
  pages_total: number;
}

interface UserListFormatted extends User {
  select: boolean;
}

export default function UserProviderList({
  users,
  total,
  current_page,
  pages_total,
}: UserProviderListDTO) {
  const [pageProps, setPageProps] = useState<PaginationPropsDTO>({
    limit: 10,
    skip: 0,
    order: 'created_at-',
    fields: undefined,
  });
  const [formattedListProviders, setFormattedListProviders] = useState<
    UserListFormatted[]
  >([] as UserListFormatted[]);

  const [allListProvidersSelect, setAllListProvidersSelect] =
    useState<boolean>(false);
  const [oneProvidersSelect, setOneProvidersSelect] = useState<boolean>(false);
  const [isOpenModalDocumentImages, setIsOpenModalDocumentImages] =
    useState<boolean>(false);
  const [listDocumentImage, setListDocumentImage] = useState<User_Document[]>(
    [] as User_Document[],
  );
  const [indexModalImage, setIndexModalImage] = useState(0);
  const { isLoading, isFetching, error } = useUsers(pageProps, {
    initialData: users,
  });
  const { activeUserProviders } = useUsersInsides();

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

  const selectAllProviders = () => {
    if (allListProvidersSelect) {
      const newList = formattedListProviders.map(userList => ({
        ...userList,
        select: false,
      }));
      setFormattedListProviders(newList);
    } else {
      const newList = formattedListProviders.map(userList => ({
        ...userList,
        select: true,
      }));
      setFormattedListProviders(newList);
    }
  };

  const selectOneProviders = (idParam: string) => {
    const newListUser = formattedListProviders.map(user =>
      user.id === idParam
        ? {
            ...user,
            select: !user.select,
          }
        : user,
    );
    setFormattedListProviders(newListUser);
    setAllListProvidersSelect(newListUser.every(user => user.select));
  };

  interface HandleActiveUserDTO {
    user_id: string;
    active: boolean;
    user_type_user_id: string;
  }

  const handleActiveUser = async (userParam: HandleActiveUserDTO) => {
    const newListActiveUsers = await activeUserProviders({
      users: [userParam],
      paginationProps: pageProps,
    });
    const newListUsers = newListActiveUsers.map(user => ({
      ...user,
      select: false,
    }));

    setFormattedListProviders(newListUsers);
  };

  const handleChangeActiveAllUser = async () => {
    const usersChangeActive = formattedListProviders
      .filter(user => user.select)
      .map(user => {
        const [user_type] = user.types;
        return {
          user_id: user.id,
          active: user.select ? !user_type.active : user_type.active,
          user_type_user_id: user_type.id,
        };
      });

    const newListActiveUsers = await activeUserProviders({
      users: usersChangeActive,
      paginationProps: pageProps,
    });

    const newListUsers = newListActiveUsers.map(user => ({
      ...user,
      select: false,
    }));

    setFormattedListProviders(newListUsers);
  };

  useEffect(() => {
    const newListUsers = users.map(user => ({
      ...user,
      select: false,
    }));

    setFormattedListProviders(newListUsers);
  }, []);

  useEffect(() => {
    setAllListProvidersSelect(
      formattedListProviders.every(user => user.select),
    );
    setOneProvidersSelect(formattedListProviders.some(user => user.select));
  }, [formattedListProviders]);
  function onCloseModalDocumentImage() {
    setIsOpenModalDocumentImages(false);
  }
  function onOpenModalDocumentImage(documentsImages: User_Document[]) {
    setIsOpenModalDocumentImages(true);
    setListDocumentImage(documentsImages);
  }
  return (
    <Box>
      <Modal
        onClose={onCloseModalDocumentImage}
        size="xl"
        isOpen={isOpenModalDocumentImages}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Imagens dos documentos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid
              templateRows="repeat(1, 1fr)"
              templateColumns="repeat(6, 1fr)"
              gap={4}
            >
              <GridItem rowSpan={1} colSpan={1}>
                {indexModalImage > 0 && (
                  <Button
                    colorScheme="teal"
                    size="lg"
                    onClick={() =>
                      setIndexModalImage(
                        indexModalImage > 0 ? indexModalImage - 1 : 0,
                      )
                    }
                  >
                    {`<`}
                  </Button>
                )}
              </GridItem>
              <GridItem rowSpan={1} colSpan={4}>
                {listDocumentImage &&
                  listDocumentImage.length > 0 &&
                  listDocumentImage[indexModalImage] && (
                    <Image
                      src={listDocumentImage[indexModalImage].image.link}
                      alt={listDocumentImage[indexModalImage].value}
                    />
                  )}
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                {indexModalImage < listDocumentImage.length - 1 && (
                  <Button
                    colorScheme="teal"
                    size="lg"
                    onClick={() =>
                      setIndexModalImage(
                        indexModalImage < listDocumentImage.length - 1
                          ? indexModalImage + 1
                          : listDocumentImage.length - 1,
                      )
                    }
                  >
                    {`>`}
                  </Button>
                )}
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onCloseModalDocumentImage}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
              Provedores
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
                      <Checkbox
                        colorScheme="pink"
                        onChange={selectAllProviders}
                        isChecked={allListProvidersSelect}
                      />
                    </Th>
                    <Th>Usuário</Th>
                    <Th>Documento</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th>Imagens</Th>
                    <Th>Ativação</Th>
                    <Th width="2">
                      {allListProvidersSelect ||
                        (oneProvidersSelect && (
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="pink"
                            leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                            onClick={() => handleChangeActiveAllUser()}
                          >
                            Ativar
                          </Button>
                        ))}
                    </Th>
                    <Th width="8" />
                  </Tr>
                </Thead>
                <Tbody>
                  {formattedListProviders &&
                    formattedListProviders.length > 0 &&
                    formattedListProviders.map(user => {
                      const [userType] = user.types;

                      const { active, id: user_type_user_id } = userType;
                      const titleActive = active ? 'desativar' : 'ativar';
                      return (
                        <Tr key={user.id}>
                          <Td paddingX={['4', '4', '6']}>
                            <Checkbox
                              isChecked={user.select}
                              colorScheme="pink"
                              onChange={() => selectOneProviders(user.id)}
                            />
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
                          <Td>
                            <Text>{user.cpf}</Text>
                          </Td>
                          {isWideVersion && (
                            <Td>
                              <Text>{user.created_at}</Text>
                            </Td>
                          )}
                          <Td>
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              colorScheme="pink"
                              onClick={() =>
                                onOpenModalDocumentImage(user.documents)
                              }
                              leftIcon={
                                <Icon
                                  as={
                                    active ? AiFillCheckCircle : AiFillWarning
                                  }
                                  fontSize="16"
                                  color={active ? 'green.500' : 'black.500'}
                                />
                              }
                            >
                              Documentos
                            </Button>
                          </Td>
                          <Td>
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              colorScheme={active ? 'pink' : 'yellow'}
                              onClick={() =>
                                handleActiveUser({
                                  user_id: user.id,
                                  active: !active,
                                  user_type_user_id,
                                })
                              }
                              leftIcon={
                                <Icon
                                  as={
                                    active ? AiFillCheckCircle : AiFillWarning
                                  }
                                  fontSize="16"
                                  color={active ? 'green.500' : 'black.500'}
                                />
                              }
                            >
                              {isWideVersion ? titleActive : ''}
                            </Button>
                          </Td>
                        </Tr>
                      );
                    })}
                </Tbody>
              </Table>
              <Pagination
                total={total}
                currentPage={Number(current_page)}
                pageProps={pageProps}
                onPageChange={setPageProps}
                lastPage={Number(pages_total)}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { users, total, current_page, pages_total } = await getUsersProviders(
    {},
  );
  return {
    props: { users, total, current_page, pages_total },
  };
};
