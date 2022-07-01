// import { setupAPIClient } from '../services/api';
import { withSSRAuth } from '../utils/withSSRAuth';

export function Metrics() {
  return (
    <>
      <h1>Metrics:</h1>
    </>
  );
}

export const getServerSideProps = withSSRAuth(
  async () => {
    // const apiClient = setupAPIClient(ctx);
    // const response = await apiClient.get('/v1/users/me');

    return {
      props: {},
    };
  },
  {
    permissions: ['metrics.list'],
    roles: ['administrador'],
  },
);
