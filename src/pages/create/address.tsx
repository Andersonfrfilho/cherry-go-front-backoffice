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
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '../../components/Form/Input';
import {
  CreateAddressesUserInsidesServiceDTO,
  useUsersInsides,
} from '../../contexts/UsersInsides.context';
import { appVerifyError } from '../../errors/appVerify';
import { useCommons } from '../../contexts/Commons.context';
import { STATES } from './states.enum';

type CreateUserAddressesFormData = {
  street: string;
  number: string;
  zipcode: string;
  district: string;
  city: string;
  state: string;
  country: string;
};

const createUserFormSchema = yup.object().shape({
  // street: yup.string().required('Nome da rua obrigatória'),
  number: yup
    .string()
    .max(5, 'Número muito grande')
    .required('Número obrigatório'),
  zipcode: yup
    .string()
    .length(10, 'código postal invalido')
    .required('código postal obrigatório'),
  district: yup.string().required('Bairro obrigatória'),
  city: yup.string().required('Cidade obrigatória'),
  state: yup.string().required('Estado obrigatório'),
  country: yup.string().required('País obrigatória'),
});

export default function CreateAddressUser() {
  const [zipcode, setZipCode] = useState('');
  const { createAddressUserInsides, user } = useUsersInsides();
  const { appError, setAppError, isLoading, setIsLoading } = useCommons();

  const { register, handleSubmit, formState, watch, setValue, setFocus } =
    useForm({
      resolver: yupResolver(createUserFormSchema),
    });
  watch(value => {
    return setZipCode(value.zipcode);
  });
  async function goToLogin() {
    setIsLoading(true);
    try {
      await Router.replace('/');
    } catch {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!user) {
      goToLogin();
    }
  }, []);

  async function findCep(cepParam: string) {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://viacep.com.br/ws/${cepParam}/json/`
      );

      if (data.erro) {
        setFocus('street');
      } else {
        const { logradouro, bairro, localidade, uf } = data;
        setValue('street', logradouro, { shouldValidate: true });
        setValue('district', bairro, { shouldValidate: true });
        setValue('city', localidade, { shouldValidate: true });
        setValue('state', STATES[uf], { shouldValidate: true });
        setFocus('number');
      }
    } catch (error) {
      setFocus('street');
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    const zipcodeFormatted = String(zipcode).replace(/[^\d]/g, '');
    if (zipcodeFormatted.length === 8) {
      findCep(zipcodeFormatted);
    }
  }, [zipcode]);

  const handleCreateAddressUser: SubmitHandler<CreateUserAddressesFormData> =
    async (values, event) => {
      event.preventDefault();
      setIsLoading(true);
      setAppError({});
      const { street, number, district, city, state, country } = values;
      try {
        const data: CreateAddressesUserInsidesServiceDTO = {
          street,
          number,
          zipcode: values.zipcode,
          district,
          city,
          state,
          country,
        };
        await createAddressUserInsides(data);
        await Router.push('/create/phone');
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
          onSubmit={handleSubmit(handleCreateAddressUser)}
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
