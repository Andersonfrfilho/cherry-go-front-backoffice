import { Button, Flex, Image, Stack, Text } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useState } from 'react';
import { RiRotateLockLine, RiUserAddLine } from 'react-icons/ri';
import { Input } from '../components/Form/Input';
import { AuthContext } from '../contexts/AuthContext';
import { withSSRGuest } from '../utils/withSSRGuest';

type SignInFormData = {
  email: string;
  password: string;
};

type SignErrorData = {
  status_code: number;
  message: string;
  code?: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
});

export default function SignIn() {
  const [appError, setAppError] = useState<Partial<SignErrorData>>({});

  const { signIn } = useContext(AuthContext);

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { errors } = formState;

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
        as="form"
        width="100%"
        maxWidth={360}
        backgroundColor="gray.800"
        padding="8"
        borderRadius={8}
        flexDirection="column"
        onSubmit={handleSubmit(handleSignIn)}
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
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
        <Flex marginTop="3" flexDirection="row" justifyContent="space-between">
          <Button
            marginRight="2"
            flex="1"
            size="lg"
            colorScheme="pink"
            aria-label="Search database"
            leftIcon={<RiUserAddLine />}
            onClick={() => {}}
          >
            Cadastrar
          </Button>
          <Button
            marginLeft="2"
            flex="1"
            size="lg"
            colorScheme="pink"
            aria-label="Search database"
            leftIcon={<RiRotateLockLine />}
            onClick={() => {}}
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
