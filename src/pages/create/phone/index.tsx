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
import InputMask from 'react-input-mask';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useEffect } from 'react';
import { Input } from '../../../components/Form/Input';
import {
  CreatePhoneDTO,
  useUsersInsides,
} from '../../../contexts/UsersInsides.context';
import { appErrorVerifyError } from '../../../errors/appErrorVerify';
import { useCommons } from '../../../contexts/Commons.context';

type CreatePhoneUserFormData = {
  phone: string;
};
type ConfirmPhoneUserFormData = {
  code: string;
};
const createUserFormSchema = yup.object().shape({
  phone: yup.string().required('Celular obrigatória'),
});

const confirmUserFormSchema = yup.object().shape({
  code: yup
    .string()
    .length(4, 'Código invalido')
    .required('Código obrigatória'),
});

export default function CreatePhoneUser() {
  const { appError, setAppError, isLoading, setIsLoading } = useCommons();
  const {
    createPhoneUserInsides,
    phoneConfirmation,
    confirmPhoneUserInsides,
    user,
  } = useUsersInsides();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const {
    register: registerConfirm,
    handleSubmit: handleSubmitConfirm,
    formState: formStateConfirm,
  } = useForm({
    resolver: yupResolver(confirmUserFormSchema),
  });

  async function goToHome() {
    setIsLoading(true);
    await Router.replace('/');
    setIsLoading(false);
  }

  useEffect(() => {
    if (!user) {
      goToHome();
    }
  }, []);

  const handleCreatePhoneUser: SubmitHandler<CreatePhoneUserFormData> =
    async values => {
      setIsLoading(true);
      const { phone } = values;
      setAppError({});
      const [country_code, ddd, digit, number] = phone.split(' ');

      try {
        const data: CreatePhoneDTO = {
          country_code,
          ddd,
          number: `${digit}${number}`,
        };

        await createPhoneUserInsides(data);
      } catch (error) {
        setAppError(appErrorVerifyError(error));
      } finally {
        setIsLoading(false);
      }
    };

  const handleConfirmPhoneUser: SubmitHandler<ConfirmPhoneUserFormData> =
    async (values, event) => {
      setIsLoading(true);
      event.preventDefault();
      const { code } = values;
      setAppError({});
      try {
        await confirmPhoneUserInsides(code);
        await Router.push('/');
      } catch (error) {
        setAppError(appErrorVerifyError(error));
      } finally {
        setIsLoading(false);
      }
    };

  const { errors } = formState;
  const { errors: errorsConfirmation } = formStateConfirm;
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
          flex="1"
          as="form"
          borderRadius={8}
          backgroundColor="gray.800"
          padding={['6', '8']}
          onSubmit={
            phoneConfirmation
              ? handleSubmitConfirm(handleConfirmPhoneUser)
              : handleSubmit(handleCreatePhoneUser)
          }
        >
          <Heading size="lg" fontWeight="normal">
            {phoneConfirmation ? 'Confirmar celular' : 'Vincular celular'}
          </Heading>
          <Divider marginY="6" borderColor="gray.700" />
          <VStack spacing="8">
            {!!appError && <Text color="red">{appError.message}</Text>}
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} width="100%">
              <Input
                as={InputMask}
                mask="+55 (**) * ****-****"
                name="phone"
                type="phone"
                label="Celular"
                {...register('phone')}
                error={errors.phone}
                isDisabled={phoneConfirmation}
              />
              {phoneConfirmation && (
                <Input
                  name="code"
                  type="code"
                  label="Código:"
                  {...registerConfirm('code')}
                  error={errorsConfirmation.code}
                  max={4}
                  isDisabled={!phoneConfirmation}
                />
              )}
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
