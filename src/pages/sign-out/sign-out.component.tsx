import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { selectIsAuthenticated, useLogoutMutation } from "@store/features/auth";
import { useAppDispatch, useAppSelector } from "@store/hooks";

const SignOut = () => {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [logout] = useLogoutMutation();

  useEffect(() => {
    if (isAuthenticated) {
      logout();
    }
  }, [dispatch, isAuthenticated, logout]);

  return <Navigate to="/sign-in" replace />;
};

export default SignOut;
