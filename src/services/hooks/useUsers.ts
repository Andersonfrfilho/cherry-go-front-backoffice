import { useQuery, UseQueryOptions } from 'react-query';
import { api } from '../apiClient';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};
type GetUsersResponse = {
  total: number;
  users: User[];
  current_page: number;
  pages_total: number;
};

export interface PaginationPropsDTO {
  limit?: number;
  fields?: Partial<User>;
  skip?: number;
  order?: string;
}

export async function getUsersProviders({
  limit = 10,
  skip = 0,
  order = 'created_at-',
  fields = undefined,
}: PaginationPropsDTO): Promise<GetUsersResponse> {
  const { data } = await api.get('/v1/users/providers', {
    params: {
      limit,
      skip,
      order,
      fields,
    },
  });

  const { results, total, current_page, pages_total } = data;

  return {
    users: results,
    total,
    current_page,
    pages_total,
  };
}

export function useUsers(
  {
    per_page = '10',
    page = '1',
    order = { property: 'name', ordering: 'DESC' },
    fields = undefined,
  }: PaginationPropsDTO,
  options: UseQueryOptions,
) {
  return useQuery(
    ['users', page],
    () =>
      getUsersProviders({
        per_page,
        page,
        order,
        fields,
      }),
    {
      staleTime: 1000 * 60 * 10,
      ...options,
    },
  );
}
