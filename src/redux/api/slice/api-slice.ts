import { BASE_API_URL } from "@/redux/constants";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
});
const tagTypes = ["User"];

export const apiSlice = createApi({
  baseQuery,
  tagTypes,
  endpoints: () => ({}),
});
