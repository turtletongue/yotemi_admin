import baseApi from "@store/features/base.api";
import { ModerateReview, Review } from "@store/features/reviews/interfaces";
import PaginationResult from "@store/pagination-result";
import { Id } from "@app/declarations";

type SearchReviewsParams = {
  page: number;
  isModerated?: boolean;
};

const reviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listReviews: builder.query<PaginationResult<Review>, SearchReviewsParams>({
      query: (params) => ({
        url: "reviews",
        params,
      }),
      providesTags: (result) => {
        return result
          ? [
              ...result.items.map(
                ({ id }) => ({ type: "Reviews", id } as const)
              ),
              { type: "Reviews", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Reviews", id: "PARTIAL-LIST" }];
      },
    }),
    getReview: builder.query<Review, Id>({
      query: (id) => `reviews/${id}`,
      providesTags: (_result, _error, id) => {
        return [{ type: "Reviews", id }];
      },
    }),
    moderateReview: builder.mutation<void, ModerateReview>({
      query: ({ id, ...data }) => ({
        url: `reviews/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => {
        return [
          { type: "Reviews", id },
          { type: "Reviews", id: "PARTIAL-LIST" },
        ];
      },
    }),
  }),
});

export const {
  useListReviewsQuery,
  useGetReviewQuery,
  useModerateReviewMutation,
} = reviewsApi;

export default reviewsApi;
