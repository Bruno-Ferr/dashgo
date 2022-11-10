import { Flex, Button, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from "../components/Form/Input";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


type SignFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail required').email('Invalid e-mail'),
  password: yup.string().required('Password required'),
})

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const { errors } = formState

  const handleSignIn: SubmitHandler<SignFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  return (
    <Flex
      align="center"
      justify="center"
      h="100vh"
      w="100vw"
    >
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">   
          <Input name="email" type="email" label="E-mail" error={errors.email} {...register('email')} />

          <Input name="password" type="password" label="Password" error={errors.password} {...register('password')} />
        </Stack>
          <Button type="submit" marginTop="6" colorScheme="pink" size="lg" isLoading={formState.isSubmitting}>LogIn</Button>
      </Flex>
    </Flex>
  )
}
