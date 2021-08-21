import Router, { useRouter } from 'next/router';
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

type CreateResetPasswordUserFormData = {
  token: string;
  password: string;
};

const createResetPasswordFormSchema = yup.object().shape({
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'No minimo 6 caracteres'),
  password_confirm: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais')
    .required('Senha obrigatória'),
});

export default function ResetUserPassword() {
  const router = useRouter();
  const { token } = router.query;
  const { createResetPasswordUserInsides } = useUsersInsides();
  const { appError, setAppError, isLoading, setIsLoading } = useCommons();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createResetPasswordFormSchema),
  });

  const handleCreateUser: SubmitHandler<CreateResetPasswordUserFormData> =
    async (values, event) => {
      event.preventDefault();
      setIsLoading(true);
      setAppError({});
      const { password } = values;

      try {
        const data: CreateResetPasswordUserFormData = {
          password,
          token: String(token),
        };

        await createResetPasswordUserInsides(data);
        await Router.push('/');
      } catch (error) {
        setAppError(appErrorVerifyError(error));
      } finally {
        setIsLoading(false);
      }
    };

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
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar Usuário Insider
          </Heading>
          <Divider marginY="6" borderColor="gray.700" />
          <VStack spacing="8">
            {!!appError && <Text color="red">{appError.message}</Text>}

            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} width="100%">
              <Input
                name="password"
                type="password"
                label="Senha"
                {...register('password')}
                error={errors.password}
                isDisabled={isLoading}
              />
              <Input
                name="password_confirm"
                type="password"
                label="Confirme a senha"
                {...register('password_confirm')}
                error={errors.password_confirm}
                isDisabled={isLoading}
              />
            </SimpleGrid>
          </VStack>
          <Flex marginTop="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/" passHref>
                <Button
                  as="a"
                  colorScheme="whiteAlpha"
                  isLoading={formState.isSubmitting || isLoading}
                >
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                isLoading={formState.isSubmitting || isLoading}
                colorScheme="pink"
              >
                Avançar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
