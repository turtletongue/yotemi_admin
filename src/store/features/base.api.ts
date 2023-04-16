import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithRefresh } from "@store/base-query";

const baseApi = createApi({
  baseQuery: baseQueryWithRefresh,
  reducerPath: "base",
  tagTypes: ["Topics", "Reviews", "Users"],
  endpoints: () => ({}),
});

export default baseApi;
