import { combineReducers } from "@reduxjs/toolkit";

import auth, { authApi } from "./features/auth";
import baseApi from "./features/base.api";

const rootReducer = combineReducers({
  auth,
  [authApi.reducerPath]: authApi.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export default rootReducer;
