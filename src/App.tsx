import { Suspense, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import Users from "@pages/users";
import Reviews from "@pages/reviews";
import Topics from "@pages/topics";
import NotFound from "@pages/not-found";
import { ErrorBoundary, Navbar } from "@components";
import { useAppSelector } from "@store/hooks";
import { selectIsAuthenticated } from "@store/features/auth";
import navigationLinks from "@app/navigation-links";

const App = () => {
  const navigate = useNavigate();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/sign-in");
    }
  }, [navigate, isAuthenticated]);

  return (
    <Flex width="full" height="full">
      <Navbar links={navigationLinks} />
      <Box
        width="full"
        height="full"
        paddingLeft="3.5rem"
        paddingBottom="0.5rem"
      >
        <ErrorBoundary>
          <Suspense>
            <Routes>
              <Route index element={<Navigate to="users" />} />
              <Route path="users" element={<Users />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="topics" element={<Topics />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Box>
    </Flex>
  );
};

export default App;
