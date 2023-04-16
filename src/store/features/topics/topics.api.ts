import baseApi from "@store/features/base.api";
import PaginationResult from "@store/pagination-result";
import { Id } from "@app/declarations";
import { ModerateTopic, Topic } from "./interfaces";

type SearchTopicsParams = {
  page: number;
  label?: string;
  isModerated?: boolean;
};

const topicsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listTopics: builder.query<PaginationResult<Topic>, SearchTopicsParams>({
      query: (params) => ({
        url: "topics",
        params,
      }),
      providesTags: (result) => {
        return result
          ? [
              ...result.items.map(
                ({ id }) => ({ type: "Topics", id } as const)
              ),
              { type: "Topics", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Topics", id: "PARTIAL-LIST" }];
      },
    }),
    getTopic: builder.query<Topic, Id>({
      query: (id) => `topics/${id}`,
      providesTags: (_result, _error, id) => {
        return [{ type: "Topics", id }];
      },
    }),
    moderateTopic: builder.mutation<void, ModerateTopic>({
      query: ({ id, ...data }) => ({
        url: `topics/${id}`,
        method: "PATCH",
        body: {
          ...data,
          isModerated: true,
        },
      }),
      invalidatesTags: (_result, _error, { id }) => {
        return [
          { type: "Topics", id },
          { type: "Topics", id: "PARTIAL-LIST" },
        ];
      },
    }),
    deleteTopic: builder.mutation<void, Id>({
      query: (id) => ({
        url: `topics/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => {
        return [
          { type: "Topics", id },
          { type: "Topics", id: "PARTIAL-LIST" },
        ];
      },
    }),
  }),
});

export const {
  useListTopicsQuery,
  useGetTopicQuery,
  useModerateTopicMutation,
  useDeleteTopicMutation,
} = topicsApi;

export default topicsApi;
