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
import { Input } from '../../components/Form/Input';
import {
  CreateAddressesUserInsidesServiceDTO,
  useUsersInsides,
} from '../../contexts/UsersInsides.context';
import { appVerifyError } from '../../errors/appVerify';
import { useCommons } from '../../contexts/Commons.context';

type CreateUserAddressesFormData = {
  street: string;
  number: string;
  zipcode: string;
  district: string;
  city: string;
  state: string;
  country: string;
  longitude: string;
  latitude: string;
};

const createUserFormSchema = yup.object().shape({
  street: yup.string().required('Nome obrigatória'),
  number: yup.string().required('Sobrenome obrigatória'),
  zipcode: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  district: yup
    .string()
    .length(14, 'Digite um cpf valido')
    .required('CPF obrigatório'),
  city: yup
    .string()
    .min(11, 'Digite um rg valido')
    .max(12, 'Digite um rg valido')
    .required('CPF obrigatório'),
  state: yup.string().required('Gênero obrigatório'),
  country: yup.string().required('Data de nascimento obrigatória'),
  longitude: yup.string().required('Data de nascimento obrigatória'),
  latitude: yup.string().required('Data de nascimento obrigatória'),
});

export default function CreateUser() {
  const { createAddressUserInsides, user } = useUsersInsides();
  const { appError, setAppError, isLoading, setIsLoading } = useCommons();

  const { register, handleSubmit, formState, watch } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });
  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
  }, [watch]);
  const handleCreateUser: SubmitHandler<CreateUserAddressesFormData> = async (
    values,
    event
  ) => {
    event.preventDefault();
    setIsLoading(true);
    setAppError({});
    const {
      street,
      number,
      zipcode,
      district,
      city,
      state,
      country,
      longitude,
      latitude,
    } = values;
    try {
      const data: CreateAddressesUserInsidesServiceDTO = {
        user_id: user.id,
        street,
        number,
        zipcode,
        district,
        city,
        state,
        country,
        longitude,
        latitude,
      };

      await createAddressUserInsides(data);
      Router.push('/create/phone');
    } catch (error) {
      setAppError(appVerifyError(error));
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
                as={InputMask}
                mask="**.***-***"
                name="zipcode"
                label="CEP:"
                {...register('zipcode')}
                error={errors.zipcode}
              />
              <Input
                name="street"
                label="Rua"
                {...register('street')}
                error={errors.street}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} width="100%">
              <Input
                name="number"
                type="number"
                label="Número"
                {...register('number')}
                error={errors.number}
              />
              <Input
                name="district"
                type="district"
                label="Bairro"
                {...register('district')}
                error={errors.district}
              />
              <Input
                name="city"
                type="city"
                label="Cidade"
                {...register('city')}
                error={errors.city}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} width="100%">
              <Input
                name="state"
                type="state"
                label="Estado"
                {...register('state')}
                error={errors.state}
              />
              <Input
                name="country"
                type="country"
                label="País"
                {...register('country')}
                error={errors.country}
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
