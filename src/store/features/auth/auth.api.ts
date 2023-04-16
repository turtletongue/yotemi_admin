import { createApi } from "@reduxjs/toolkit/query/react";

import baseQuery from "@store/base-query";
import { AuthResponse } from "./interfaces";

export interface LoginRequest {
  username: string;
  password: string;
}

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "authentication/admin",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "authentication/revoke",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;

export default authApi;
