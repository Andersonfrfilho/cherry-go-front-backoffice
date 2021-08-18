import { Button, Flex, Image, Stack, Text } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { RiRotateLockLine, RiUserAddLine } from 'react-icons/ri';
import Router from 'next/router';
import { Input } from '../components/Form/Input';
import { useAuth } from '../contexts/Auth.context';
import { withSSRGuest } from '../utils/withSSRGuest';
import { useCommons } from '../contexts/Commons.context';

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
});

export default function SignIn() {
  const { appError, setAppError, isLoading, setIsLoading } = useCommons();

  const { signIn } = useAuth();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { errors } = formState;
  async function handleRegisterPage() {
    setIsLoading(true);
    await Router.push('/create');
    setIsLoading(false);
  }

  const handleSignIn: SubmitHandler<SignInFormData> = async (value, event) => {
    setAppError({});
    event.preventDefault();
    const { email, password } = value;
    const data = {
      email,
      password,
    };
    try {
      await signIn(data);
    } catch (error) {
      setAppError(error);
    }
  };

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
        <Flex
          as="form"
          onSubmit={handleSubmit(handleSignIn)}
          flexDirection="column"
        >
          <Stack spacing="4">
            <Image
              src="./images/logo-title.svg"
              fallbackSrc="./images/placeholder/240.png"
              fit="contain"
              width="400px"
              height="300px"
            />
            {!!appError && <Text color="red">{appError.message}</Text>}
            <Input
              name="email"
              type="email"
              label="E-mail"
              {...register('email')}
              error={errors.email}
            />
            <Input
              name="password"
              type="password"
              label="Senha"
              {...register('password')}
              error={errors.password}
            />
          </Stack>
          <Button
            type="submit"
            marginTop="6"
            colorScheme="pink"
            size="lg"
            isLoading={formState.isSubmitting || isLoading}
          >
            Entrar
          </Button>
        </Flex>
        <Flex marginTop="3" flexDirection="row" justifyContent="space-between">
          <Button
            type="button"
            marginRight="2"
            flex="1"
            size="lg"
            colorScheme="pink"
            aria-label="Search database"
            leftIcon={<RiUserAddLine />}
            onClick={handleRegisterPage}
            isLoading={isLoading}
          >
            Cadastrar
          </Button>
          <Button
            type="button"
            marginLeft="2"
            flex="1"
            size="lg"
            colorScheme="pink"
            aria-label="Search database"
            leftIcon={<RiRotateLockLine />}
            onClick={() => {}}
            isLoading={isLoading}
          >
            Senha
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = withSSRGuest(async ctx => {
  return {
    props: {},
  };
});
