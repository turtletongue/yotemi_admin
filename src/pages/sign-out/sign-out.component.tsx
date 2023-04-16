import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { loggedOut, selectIsAuthenticated } from "@store/features/auth";
import { useAppDispatch, useAppSelector } from "@store/hooks";

const SignOut = () => {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loggedOut());
    }
  }, [dispatch, isAuthenticated]);

  return <Navigate to="/sign-in" replace />;
};

export default SignOut;
