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
import { useState } from 'react';

import { Input } from '../../../components/Form/Input';
import { useUsersInsides } from '../../../contexts/UsersInsides.context';
import { ErrorData } from '../../../errors/Error.type';
import { appVerifyError } from '../../../errors/appVerify';

type CreatePhoneUserFormData = {
  phone: string;
};

const createUserFormSchema = yup.object().shape({
  phone: yup.string().required('Celular obrigatória'),
});

export default function CreatePhoneUser() {
  const { createPhoneUserInsides } = useUsersInsides();

  const [appError, setAppError] = useState<Partial<ErrorData>>({});
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const handleCreateUser: SubmitHandler<CreatePhoneUserFormData> = async (
    values,
    event
  ) => {
    event.preventDefault();
    const { phone } = values;
    setAppError({});
    try {
      const data: CreatePhoneUserFormData = {
        phone,
      };

      await createPhoneUserInsides(data);
      Router.push('/');
    } catch (error) {
      setAppError(appVerifyError(error));
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
            Vincular celular
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
                label="Celular:"
                {...register('phone')}
                error={errors.phone}
              />
            </SimpleGrid>
          </VStack>
          <Flex marginTop="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                isLoading={formState.isSubmitting}
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
