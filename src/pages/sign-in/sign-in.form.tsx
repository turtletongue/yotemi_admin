import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

import { useLoginMutation } from "@store/features/auth";
import { getErrorMessage } from "@utils";
import signInErrors from "./sign-in.errors";

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [signIn, { isLoading, error }] = useLoginMutation();

  return (
    <VStack
      spacing={4}
      p="2rem"
      rounded="md"
      boxShadow="base"
      w="20rem"
      bgColor="white"
    >
      <Box color="crimson" marginBottom="1rem" textAlign="center">
        {error && getErrorMessage(error, signInErrors, "Что-то пошло не так")}
      </Box>

      <FormControl>
        <FormLabel htmlFor="email">Логин</FormLabel>
        <Input
          name="username"
          placeholder="Логин"
          backgroundColor="white"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="password">Пароль</FormLabel>
        <Input
          type="password"
          name="password"
          placeholder="Пароль"
          backgroundColor="white"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </FormControl>

      <Button
        isLoading={isLoading}
        loadingText="Загрузка"
        colorScheme="purple"
        w="full"
        onClick={() => signIn({ username, password })}
      >
        Войти
      </Button>
    </VStack>
  );
};

export default SignInForm;
