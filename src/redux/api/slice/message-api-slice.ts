import { MESSAGE_URL } from "@/redux/constants";
import { apiSlice } from "./api-slice";

export const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMessage: builder.mutation({
      query: (data) => ({
        url: `${MESSAGE_URL}/send-message`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Message"],
    }),

    getMessage: builder.query({
      query: (receiverId) => ({
        url: `${MESSAGE_URL}/${receiverId}`,
      }),
      providesTags: ["Message"],
    }),

    updateMessage: builder.mutation({
      query: ({ messageId, content }) => ({
        url: `${MESSAGE_URL}/${messageId}`,
        method: "PUT",
        body: { content },
      }),
      invalidatesTags: ["Message"],
    }),

    deleteMessage: builder.mutation({
      query: (messageId) => ({
        url: `${MESSAGE_URL}/${messageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Message"],
    }),
  }),
});

export const {
  useCreateMessageMutation,
  useGetMessageQuery,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = messageApiSlice;
