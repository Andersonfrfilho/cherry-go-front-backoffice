import Router from 'next/router';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '../../components/Form/Input';
import { useUsersInsides } from '../../contexts/UsersInsides.context';
import { appErrorVerifyError } from '../../errors/appErrorVerify';
import { useCommons } from '../../contexts/Commons.context';

type CreateUserFormData = {
  name: string;
  last_name: string;
  email: string;
  cpf: string;
  rg: string;
  phone: string;
  gender: string;
  birth_date: string;
  password: string;
  password_confirm: string;
};

const sendForgotPasswordFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
});

export default function CreateUser() {
  const {
    createForgotPasswordUserInsides,
    resetPasswordConfirmation,
    setResetPasswordConfirmation,
  } = useUsersInsides();
  const { appError, setAppError, isLoading, setIsLoading } = useCommons();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(sendForgotPasswordFormSchema),
  });

  const handleForgotPasswordUser: SubmitHandler<CreateUserFormData> = async (
    values,
    event
  ) => {
    event.preventDefault();
    setIsLoading(true);
    setAppError({});
    const { email } = values;
    try {
      await createForgotPasswordUserInsides(email);
    } catch (error) {
      setAppError(appErrorVerifyError(error));
    } finally {
      setIsLoading(false);
    }
  };
  async function goToMain() {
    setIsLoading(true);
    await Router.push('/');
    setResetPasswordConfirmation(false);
    setIsLoading(false);
  }
  const { errors } = formState;

  return (
    <Box>
      <Flex
        width="100%"
        marginY="6"
        maxWidth={1480}
        marginX="auto"
        paddingX="6"
      >
        <Box
          as="form"
          flex="1"
          borderRadius={8}
          backgroundColor="gray.800"
          padding={['6', '8']}
          onSubmit={handleSubmit(handleForgotPasswordUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Solicitar redefinição de senha
          </Heading>
          <Divider marginY="6" borderColor="gray.700" />
          <VStack spacing="8">
            {resetPasswordConfirmation && (
              <Text>Um Email ✉ foi enviado para redefinição de senha</Text>
            )}
            {!!appError && <Text color="red">{appError.message}</Text>}

            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} width="100%">
              <Input
                name="email"
                type="email"
                label="E-mail"
                {...register('email')}
                error={errors.email}
                isDisabled={resetPasswordConfirmation || isLoading}
              />
            </SimpleGrid>
          </VStack>
          <Flex marginTop="8" justify="flex-end">
            <HStack spacing="4">
              {!resetPasswordConfirmation && (
                <Link href="/" passHref>
                  <Button
                    as="a"
                    colorScheme="whiteAlpha"
                    isLoading={formState.isSubmitting || isLoading}
                  >
                    Cancelar
                  </Button>
                </Link>
              )}
              {!resetPasswordConfirmation ? (
                <Button
                  type="submit"
                  isLoading={formState.isSubmitting || isLoading}
                  colorScheme="pink"
                >
                  Enviar
                </Button>
              ) : (
                <Button
                  type="button"
                  isLoading={formState.isSubmitting || isLoading}
                  colorScheme="pink"
                  onClick={goToMain}
                >
                  Concluir
                </Button>
              )}
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
