import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@store/index";
import { AuthResponse } from "./interfaces";
import authInitialState from "./auth.initial-state";
import authApi from "./auth.api";

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    refreshTokens: (
      state,
      { payload }: PayloadAction<Omit<AuthResponse, "admin">>
    ) => {
      state.accessToken = state.admin ? payload.accessToken : null;
    },
    loggedOut: (state) => {
      state.accessToken = null;
      state.admin = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.accessToken = payload.accessToken;
          state.admin = payload.admin;
        }
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.accessToken = null;
        state.admin = null;
      });
  },
});

export const { refreshTokens, loggedOut } = authSlice.actions;

export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectAdmin = (state: RootState) => state.auth.admin;
export const selectIsAuthenticated = (state: RootState) =>
  !!state.auth.accessToken;

export default authSlice.reducer;
