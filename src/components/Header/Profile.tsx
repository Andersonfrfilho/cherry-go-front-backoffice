import { Avatar, Box, Flex, Text, IconButton, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import { RiShutDownLine } from 'react-icons/ri';
import { useAuth, User } from '../../contexts/Auth.context';
import { appErrorVerifyError } from '../../errors/appErrorVerify';
import { capitalize } from '../../utils/validate';
import { useCommons } from '../../contexts/Commons.context';

interface ProfileProps {
  showProfileData?: boolean;
  user: User;
}

export function Profile({ showProfileData = true, user }: ProfileProps) {
  const [viewLogout, setViewLogout] = useState<boolean>(false);
  const { setAppError, isLoading, setIsLoading } = useCommons();
  const { signOut } = useAuth();
  async function handleLogout() {
    setIsLoading(true);
    setAppError({});
    try {
      await signOut();
    } catch (error) {
      setAppError(appErrorVerifyError(error));
    } finally {
      setIsLoading(false);
    }
  }

  function handleViewLogout() {
    setViewLogout(!viewLogout);
  }

  return (
    <Flex
      flexDirection="column"
      flexWrap="wrap"
      marginTop={viewLogout ? '10' : '0'}
    >
      <Flex alignItems="center" as="button" onClick={handleViewLogout}>
        {showProfileData && (
          <Box>
            <Text>{`${capitalize(user.name)} ${capitalize(
              user.last_name,
            )}`}</Text>
            <Text color="gray.300" fontSize="small">
              {capitalize(user.email)}
            </Text>
          </Box>
        )}
        <Avatar size="md" name={`${user.name} ${user.last_name}`} src={null} />
      </Flex>
      {viewLogout && (
        <Flex alignItems="center" justifyContent="space-between">
          <Text>Logout</Text>
          <IconButton
            aria-label="Open Navigation"
            icon={<Icon as={RiShutDownLine} />}
            fontSize="24"
            variant="unstyled"
            onClick={handleLogout}
            marginRight="2"
            isLoading={isLoading}
          />
        </Flex>
      )}
    </Flex>
  );
}
