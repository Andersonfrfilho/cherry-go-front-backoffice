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
import { useMutation } from 'react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { RiCalendarEventFill } from 'react-icons/ri';
import { useState } from 'react';
import { Input } from '../components/Form/Input';
import { DatePicker } from '../components/DatePicker';
import { api } from '../services/apiClient';

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatória'),
  last_name: yup.string().required('Sobrenome obrigatória'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  cpf: yup
    .string()
    .length(11, 'Digite um cpf valido')
    .required('E-mail obrigatório')
    .email('E-mail inválido'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'No minimo 6 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais')
    .required('Senha obrigatória'),
});
type selectBirthDateParamsType = {
  value: any;
};
export default function CreateUser() {
  const [visibleCalendar, setVisibleCalendar] = useState(false);
  const [date, setDate] = useState(new Date());

  function selectBirthDate({ value }: selectBirthDateParamsType) {
    setVisibleCalendar(false);
    console.log(value);
  }
  // const { signIn } = useContext(AuthContext);
  const router = useRouter();
  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await api.post('users', {
        user: {
          ...user,
          created_at: new Date(),
        },
      });
      return response.data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
      },
    }
  );
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async values => {
    await createUser.mutateAsync(values);
    router.push('/users');
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
                maskChar={null}
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
              <Input
                as={InputMask}
                mask="+55 (**) * ****-****"
                name="phone"
                type="phone"
                label="Celular:"
                {...register('phone')}
                error={errors.phone}
              />

              <Stack>
                <Text>Gênero</Text>
                <Select
                  size="lg"
                  label="Gênero:"
                  name="gênero"
                  border="0"
                  focusBorderColor="pink.500"
                  backgroundColor="gray.900"
                >
                  <option
                    style={{ color: 'withe', backgroundColor: '#181B23' }}
                    value="fem"
                  >
                    Feminino
                  </option>
                  <option
                    style={{ color: 'withe', backgroundColor: '#181B23' }}
                    value="masc"
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
                  name="date_birth"
                  label="Data de nascimento"
                  {...register('date_birth')}
                  error={errors.date_birth}
                  button
                  buttonProps={{
                    onClick: () => setVisibleCalendar(!visibleCalendar),
                    transition: !visibleCalendar,
                    title: 'abrir calendário',
                    icon: () => <RiCalendarEventFill />,
                  }}
                />
                {visibleCalendar && (
                  <DatePicker
                    onChange={value => selectBirthDate(value)}
                    selectedDate={date}
                  />
                )}
              </Stack>
              <Input
                name="password"
                type="password"
                label="Senha"
                {...register('password')}
                error={errors.password}
              />
              <Input
                name="password_confirmation"
                type="password"
                label="Confirme a senha"
                {...register('password_confirmation')}
                error={errors.password_confirmation}
              />
            </SimpleGrid>
          </VStack>
          <Flex marginTop="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                isLoading={formState.isSubmitting}
                colorScheme="pink"
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
