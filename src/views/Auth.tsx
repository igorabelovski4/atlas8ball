import {
  Box,
  Button,
  Center,
  Container,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { supabaseClient } from '../supabase/supabaseClient';
import { useUser } from '../supabase/loader';
import { Navigate } from 'react-router-dom';

export function Authentication() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  // redirect if logged in
  const { user } = useUser();

  if (user) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <Box bg="#0c3256">
      <Center h="100vh" w="100%">
        <Container size={620} miw={375}>
          <Title ta="center" c="#e6fcf5">
            Login
          </Title>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <form
              onSubmit={form.onSubmit(async (values) => {
                await supabaseClient.auth.signInWithPassword({
                  email: values.email,
                  password: values.password,
                });
              })}
            >
              <TextInput
                label="Email"
                placeholder="example@gmail.com"
                required
                {...form.getInputProps('email')}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                mt="md"
                {...form.getInputProps('password')}
              />

              <Button fullWidth mt="xl" type="submit">
                Sign in
              </Button>
            </form>
          </Paper>
        </Container>
      </Center>
    </Box>
  );
}
