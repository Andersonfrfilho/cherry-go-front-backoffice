import { Box, Flex, SimpleGrid, Text, theme } from '@chakra-ui/react';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import { parseCookies } from 'nookies';
import { useEffect } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
// import { useAuth } from '../contexts/Auth.context';
// import { setupAPIClient } from '../services/api';
import { api } from '../services/apiClient';
import { withSSRAuth } from '../utils/withSSRAuth';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const options: ApexOptions = {
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false },
    foreColor: theme.colors.gray['500'],
  },
  grid: { show: false },
  dataLabels: { enabled: false },
  tooltip: { enabled: false },
  xaxis: {
    type: 'datetime',
    axisBorder: { color: theme.colors.gray['600'] },
    axisTicks: { color: theme.colors.gray['600'] },
    categories: [
      '2021-04-02T00:00:00:00.000Z',
      '2021-04-03T00:00:00:00.000Z',
      '2021-04-04T00:00:00:00.000Z',
      '2021-04-05T00:00:00:00.000Z',
      '2021-04-06T00:00:00:00.000Z',
      '2021-04-07T00:00:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series = [{ name: 'series1', data: [57, 36, 13, 29, 6, 19] }];

export default function Dashboard() {
  // const { user, isAuthenticated, signOut } = useAuth();
  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies();

    api.get('/v1/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }, []);

  return (
    <Flex direction="column" height="100vh">
      <Header />
      <Flex
        width="100%"
        marginY="6"
        maxWidth={1480}
        marginX="auto"
        paddingX="6"
      >
        <Sidebar />
        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          {/* <Can permissions={['metrics.list']}> */}
          <Box
            padding={['6', '8']}
            backgroundColor="gray.800"
            borderRadius={8}
            paddingBottom="4"
          >
            <Text fontSize="lg" marginBottom="4">
              Inscritos da semana
            </Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
          <Box padding={['6', '8']} backgroundColor="gray.800" borderRadius={8}>
            <Text fontSize="lg" marginBottom="4">
              Taxa de abertura
            </Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
          {/* </Can> */}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = withSSRAuth(async () => {
  // async (ctx) => {
  // const apiClient = setupAPIClient(ctx);
  // const { 'nextauth.token': token } = parseCookies(ctx);
  // const response = await apiClient.get('/me');

  // console.log(response.data);
  return {
    props: {},
  };
});
