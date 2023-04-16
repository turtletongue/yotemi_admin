import { useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

import { selectIsAuthenticated } from "@store/features/auth";
import { useAppSelector } from "@store/hooks";
import SignInForm from "./sign-in.form";

type LocationState = { from?: { pathname: string } };

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as LocationState)?.from?.pathname || "/";

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [navigate, from, isAuthenticated]);

  return (
    <Flex
      width="full"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      bgImage="url('/images/sign-in-bg.jpg')"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      <SignInForm />
    </Flex>
  );
};

export default SignIn;
