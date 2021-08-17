import { Button, Flex, Image, Stack, Text, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import Router from 'next/router';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useCommons } from '../../contexts/Commons.context';
import { ssrApiClient } from '../../services/api';
import { appVerifyError } from '../../errors/appVerify';
import { useUsersInsides } from '../../contexts/UsersInsides.context';
import { Input } from '../../components/Form/Input';

export default function SignIn(props) {
  const { appError, setAppError, setIsLoading, isLoading } = useCommons();
  const { resendActiveMailUser, resendActiveMailUserByMail } =
    useUsersInsides();
  const [title, setTitle] = useState<string>('');
  const [token, setToken] = useState<string>('');

  const confirmMailUserFormSchema = yup.object().shape({
    email:
      appError?.code === '4004'
        ? yup.string().required('E-mail obrigatório').email('E-mail inválido')
        : yup.string().optional(),
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(confirmMailUserFormSchema),
  });
  // enviar email de confirmação novamente
  function handleEnterUser() {
    setIsLoading(true);
    Router.replace('/');
    setIsLoading(false);
  }

  async function handleSentEmailConfirmation(
    values,
    event,
    { token_param, error_code }
  ) {
    setIsLoading(true);
    event.preventDefault();
    if (!token_param) {
      Router.replace('/');
    }
    try {
      if (error_code === '4004') {
        await resendActiveMailUserByMail(values.email);
      } else {
        await resendActiveMailUser(token);
      }
      setTitle('E-mail reenviado!');
      setAppError(null);
    } catch (error) {
      setAppError(appVerifyError(error));
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    if (props.token) {
      setToken(props.token);
    }
    if (props.confirm_mail) {
      setAppError(null);
      setTitle('Conta ativada!');
      return;
    }
    setAppError(
      appVerifyError({
        status_code: props.appError.status_code,
        code: props.appError.code,
      })
    );
  }, []);
  const { errors } = formState;
  return (
    <Flex
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        width="100%"
        maxWidth={360}
        backgroundColor="gray.800"
        padding="8"
        borderRadius={8}
        flexDirection="column"
      >
        <Box
          as="form"
          flex="1"
          borderRadius={8}
          backgroundColor="gray.800"
          padding={['6', '8']}
          onSubmit={handleSubmit((values, event) =>
            handleSentEmailConfirmation(values, event, {
              error_code: appError.code,
              token_param: token,
            })
          )}
        >
          <Stack spacing="4" marginBottom="2">
            <Image
              src="../../images/logo-title.svg"
              fallbackSrc="../../images/placeholder/240.png"
              fit="contain"
              width="400px"
              height="300px"
            />
            {appError ? (
              <Flex justifyContent="center" alignItems="center">
                <Text color="red.500">{appError.message}</Text>
              </Flex>
            ) : (
              <Flex justifyContent="center" alignItems="center">
                <Text color="withe.500">{title}</Text>
              </Flex>
            )}
          </Stack>
          <Stack spacing="6">
            {appError?.code === '4004' && (
              <Input
                name="email"
                type="email"
                label="E-mail"
                {...register('email')}
                error={errors.email}
              />
            )}
            {appError ? (
              <Button
                type="submit"
                colorScheme="whiteAlpha"
                marginTop="6"
                size="lg"
                isLoading={isLoading}
              >
                {token ? 'Reenviar confirmação' : 'Voltar'}
              </Button>
            ) : (
              <Button
                type="button"
                colorScheme="pink"
                marginTop="6"
                size="lg"
                isLoading={isLoading}
                onClick={handleEnterUser}
              >
                Entrar
              </Button>
            )}
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = async ctx => {
  const { token } = ctx.query;

  if (!ctx.query?.token) {
    return {
      props: {
        appError: {
          message: 'Token não encontrado!',
          code: '4005',
          status_code: '404',
        },
        token: '',
      },
    };
  }
  try {
    await ssrApiClient.get(`/v1/users/confirm/mail?token=${token}`);

    return {
      props: {
        confirm_mail: true,
        token,
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
          token,
        },
      };
    }
  }
};
