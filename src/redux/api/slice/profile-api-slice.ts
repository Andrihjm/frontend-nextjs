import { PROFILE_URL } from "@/redux/constants";
import { apiSlice } from "./api-slice";

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProfile: builder.mutation({
      query: (data) => ({
        url: `${PROFILE_URL}/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${PROFILE_URL}/update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),

    getprofile: builder.query({
      query: () => ({
        url: `${PROFILE_URL}`,
      }),
      providesTags: ["Profile"],
    }),
  }),
});

export const {
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useGetprofileQuery,
} = profileApiSlice;
