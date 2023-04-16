import baseApi from "@store/features/base.api";
import PaginationResult from "@store/pagination-result";
import { Id } from "@app/declarations";
import { User } from "./interfaces";

type SearchUsersParams = {
  page: number;
  search?: string;
  isBlocked?: boolean;
};

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listUsers: builder.query<PaginationResult<User>, SearchUsersParams | void>({
      query: (params) => ({
        url: "users",
        params: {
          ...params,
          isOnlyFull: false,
        },
      }),
      providesTags: (result) => {
        return result
          ? [
              ...result.items.map(({ id }) => ({ type: "Users", id } as const)),
              { type: "Users", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Users", id: "PARTIAL-LIST" }];
      },
    }),
    getUser: builder.query<User, Id>({
      query: (id) => `users/${id}`,
      providesTags: (_result, _error, id) => {
        return [{ type: "Users", id }];
      },
    }),
    blockUser: builder.mutation<void, Id>({
      query: (id) => ({
        url: `users/${id}/block`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, id) => {
        return [
          { type: "Users", id },
          { type: "Users", id: "PARTIAL-LIST" },
        ];
      },
    }),
    unblockUser: builder.mutation<void, Id>({
      query: (id) => ({
        url: `users/${id}/unblock`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, id) => {
        return [
          { type: "Users", id },
          { type: "Users", id: "PARTIAL-LIST" },
        ];
      },
    }),
  }),
});

export const {
  useListUsersQuery,
  useGetUserQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
} = usersApi;

export default usersApi;
