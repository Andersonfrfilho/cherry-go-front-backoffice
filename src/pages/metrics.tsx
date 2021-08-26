import decode from 'jwt-decode';
import { setupAPIClient } from '../services/api';
import { withSSRAuth } from '../utils/withSSRAuth';

export function Metrics() {
  return (
    <>
      <h1>Metrics:</h1>
    </>
  );
}

export const getServerSideProps = withSSRAuth(
  async ctx => {
    const apiClient = setupAPIClient(ctx);
    console.log('##########token - pages');
    const response = await apiClient.get('/v1/users/me');

    return {
      props: {},
    };
  },
  {
    permissions: ['metrics.list'],
    roles: ['administrador'],
  }
);
