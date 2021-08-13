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
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import InputMask from 'react-input-mask';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { RiCalendarEventFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';

import { Input } from '../components/Form/Input';
import { DatePicker } from '../components/DatePicker';
import { useUsersInsides } from '../contexts/UsersInsides.context';
import { ErrorData } from '../errors/Error.type';
import { validaCpf, verifyAge } from '../utils/validate';
import { appVerifyError } from '../errors/appVerify';

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

yup.addMethod(yup.string, 'cpfValidation', function (errorMessage) {
  return this.test('test-cpf-validation', errorMessage, function (value) {
    const { path, createError } = this;

    return validaCpf(value) || createError({ path, message: errorMessage });
  });
});

yup.addMethod(yup.string, 'ageValidation', function (errorMessage) {
  return this.test('test-age-validation', errorMessage, function (value) {
    const { path, createError } = this;

    return verifyAge(value) || createError({ path, message: errorMessage });
  });
});

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatória'),
  last_name: yup.string().required('Sobrenome obrigatória'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  cpf: yup
    .string()
    .cpfValidation('cpf validation')
    .length(14, 'Digite um cpf valido')
    .required('CPF obrigatório'),
  rg: yup
    .string()
    .min(11, 'Digite um rg valido')
    .max(12, 'Digite um rg valido')
    .required('CPF obrigatório'),
  gender: yup.string().required('Gênero obrigatório'),
  birth_date: yup
    .string()
    .ageValidation('Sua idade não é permitida')
    .required('Data de nascimento obrigatória'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'No minimo 6 caracteres'),
  password_confirm: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais')
    .required('Senha obrigatória'),
});

export default function CreateUser() {
  const { createUserInsides } = useUsersInsides();

  const [appError, setAppError] = useState<Partial<ErrorData>>({});
  const [visibleCalendar, setVisibleCalendar] = useState(false);
  const [day, setDay] = useState(null);
  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  useEffect(() => {
    if (day) {
      const date = new Date(day).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      setValue('birth_date', date, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [day]);

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values,
    event
  ) => {
    event.preventDefault();
    const {
      cpf,
      birth_date,
      gender,
      last_name,
      name,
      rg,
      email,
      password,
      password_confirm,
      phone,
    } = values;
    setAppError({});
    try {
      const data: CreateUserFormData = {
        cpf,
        birth_date,
        gender,
        last_name,
        name,
        rg,
        email,
        password,
        password_confirm,
        phone,
      };

      await createUserInsides(data);
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
            Criar Usuário Insider
          </Heading>
          <Divider marginY="6" borderColor="gray.700" />
          <VStack spacing="8">
            {!!appError && <Text color="red">{appError.message}</Text>}
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} width="100%">
              <Input
                name="name"
                label="Nome"
                {...register('name')}
                error={errors.name}
              />
              <Input
                name="last_name"
                label="Sobrenome"
                {...register('last_name')}
                error={errors.last_name}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} width="100%">
              <Input
                name="email"
                type="email"
                label="E-mail"
                {...register('email')}
                error={errors.email}
              />
              <Input
                as={InputMask}
                mask="***.***.***-**"
                name="cpf"
                type="cpf"
                label="CPF"
                {...register('cpf')}
                error={errors.cpf}
              />
              <Input
                as={InputMask}
                mask="**.***.***-*"
                name="rg"
                type="rg"
                label="RG"
                {...register('rg')}
                error={errors.rg}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} width="100%">
              {/* <Input
                as={InputMask}
                mask="+55 (**) * ****-****"
                name="phone"
                type="phone"
                label="Celular:"
                {...register('phone')}
                error={errors.phone}
              /> */}

              <Stack>
                <Text>Gênero</Text>
                <Select
                  size="lg"
                  label="Gênero:"
                  name="gender"
                  focusBorderColor="pink.500"
                  backgroundColor="gray.900"
                  {...register('gender')}
                >
                  <option
                    style={{ color: 'withe', backgroundColor: '#181B23' }}
                    value="female"
                  >
                    Feminino
                  </option>
                  <option
                    style={{ color: 'withe', backgroundColor: '#181B23' }}
                    value="male"
                  >
                    Masculino
                  </option>
                  <option
                    style={{ color: 'withe', backgroundColor: '#181B23' }}
                    value="other"
                  >
                    Outro
                  </option>
                </Select>
              </Stack>
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} width="100%">
              <Stack>
                <Input
                  as={InputMask}
                  name="birth_date"
                  label="Data de nascimento"
                  {...register('birth_date')}
                  error={errors.birth_date}
                  mask="**/**/****"
                  button
                  buttonProps={{
                    onClick: () => setVisibleCalendar(!visibleCalendar),
                    transition: !visibleCalendar,
                    title: 'abrir calendário',
                    icon: () => <RiCalendarEventFill />,
                  }}
                />
                {visibleCalendar && <DatePicker day={day} setDay={setDay} />}
              </Stack>
              <Input
                name="password"
                type="password"
                label="Senha"
                {...register('password')}
                error={errors.password}
              />
              <Input
                name="password_confirm"
                type="password"
                label="Confirme a senha"
                {...register('password_confirm')}
                error={errors.password_confirm}
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
