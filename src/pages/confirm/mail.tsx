import { Button, Flex, Image, Stack, Text } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { RiRotateLockLine, RiUserAddLine } from 'react-icons/ri';
import { Router, useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';
import { Input } from '../../components/Form/Input';
import { useAuth } from '../../contexts/Auth.context';
import { withSSRGuest } from '../../utils/withSSRGuest';
import { ErrorData } from '../../errors/Error.type';
import { useCommons } from '../../contexts/Commons.context';
import { api } from '../../services/apiClient';
import { setupAPIClient, ssrApiClient } from '../../services/api';
import { AppError } from '../../errors/AppError';
import { appVerifyError } from '../../errors/appVerify';

type SignInFormData = {
  email: string;
  password: string;
};

export default function SignIn(props) {
  const { appError, setAppError, isLoading, setLoading } = useCommons();
  const [title, setTitle] = useState<string>('');
  // enviar email de confirmação novamente
  useEffect(() => {
    if (props?.confirm_mail) {
      setAppError({});
      setTitle('Conta ativada!');
    }

    setAppError(
      appVerifyError({
        status_code: props.appError.status_code,
        code: props.appError.code,
      })
    );
  }, []);

  return (
    <Flex
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        backgroundColor="gray.800"
        padding="8"
        borderRadius={8}
        flexDirection="column"
        // onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Image
            src="../../images/logo-title.svg"
            fallbackSrc="../../images/placeholder/240.png"
            fit="contain"
            width="400px"
            height="300px"
          />
          {!!appError && (
            <Flex justifyContent="center" alignItems="center">
              <Text color="red">{appError.message}</Text>
            </Flex>
          )}
        </Stack>
        {appError ? (
          <Button
            type="submit"
            colorScheme="whiteAlpha"
            marginTop="6"
            size="lg"
            isLoading={false}
          >
            Reenviar confirmação
          </Button>
        ) : (
          <Button
            type="submit"
            colorScheme="whiteAlpha"
            marginTop="6"
            size="lg"
            isLoading={false}
          >
            Entrar
          </Button>
        )}
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = async ctx => {
  // const apiClient = setupAPIClient(ctx);

  const { token } = ctx.query;

  try {
    await ssrApiClient.get(`/v1/users/confirm/mail?token=${token}`);

    return {
      props: {
        confirm_mail: true,
      },
    };
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      return {
        props: {
          appError: {
            message: err.response?.data?.message,
            code: err.response.data?.code,
            status_code: err.response.status,
          },
        },
      };
    }
  }
};
