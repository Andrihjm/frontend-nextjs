import { INTEREST_URL } from "@/redux/constants";
import { apiSlice } from "./api-slice";

export const interestApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createInterest: builder.mutation({
      query: (data) => ({
        url: `${INTEREST_URL}/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Interest"],
    }),

    updateInterest: builder.mutation({
      query: (data) => ({
        url: `${INTEREST_URL}/update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Interest"],
    }),

    getInterest: builder.query({
      query: () => ({
        url: `${INTEREST_URL}`,
      }),
      providesTags: ["Interest"],
    }),

    deleteInterest: builder.mutation({
      query: (interestId) => ({
        url: `${INTEREST_URL}/${interestId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Interest"],
    }),
  }),
});

export const {
  useCreateInterestMutation,
  useUpdateInterestMutation,
  useGetInterestQuery,
  useDeleteInterestMutation,
} = interestApiSlice;
