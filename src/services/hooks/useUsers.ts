import { useQuery, UseQueryOptions } from 'react-query';
import { api } from '../apiClient';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};
type GetUsersResponse = {
  totalCount: number;
  users: User[];
};

interface Order {
  property: string;
  ordering: 'ASC' | 'DESC';
}
export interface PaginationPropsDTO {
  per_page?: string;
  fields?: Partial<User>;
  page?: string;
  order?: Order;
}

export async function getUsers(
  data: PaginationPropsDTO
): Promise<GetUsersResponse> {
  const { data: data_response } = await api.get('/users', {
    params: {
      ...data,
    },
  });

  console.log(data_response);

  // const totalCount = Number(headers['x-total-count']);
  // const users = data_response.users.map(user => {
  //   return {
  //     id: user.id,
  //     name: user.name,
  //     email: user.email,
  //     createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
  //       day: '2-digit',
  //       month: 'long',
  //       year: 'numeric',
  //     }),
  //   };
  // });

  return {
    users: [
      {
        id: 'user.id',
        name: 'user.name',
        email: 'user.email',
      },
    ],
    totalCount: 10,
  };
}

export function useUsers(page: number, options: UseQueryOptions) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10,
    ...options,
  });
}
