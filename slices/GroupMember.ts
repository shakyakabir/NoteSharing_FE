import Config from "@/config/Index";
import customBaseQuery from "@/service/BaseApi";
import { createApi } from "@reduxjs/toolkit/query/react";
export const memeberApi = createApi({
  reducerPath: "memeberApi",
  baseQuery: customBaseQuery,
  tagTypes: ["group"],
  endpoints: (builder) => ({
    createGroup: builder.mutation({
      query: (data) => ({
        url: "/groups",
        method: "POST",
        params: { email: Config.defaultEmail },
        body: data,
      }),
      invalidatesTags: ["group"],
    }),
    joinGroup: builder.mutation({
      query: (data) => ({
        url: "/groups/join",
        method: "POST",

        body: {
          userEmail: Config.defaultEmail,
          shareCode: data,
        },
      }),
      invalidatesTags: ["group"],
    }),

    getGroups: builder.query<any, string | void>({
      query: () => ({
        url: "/groups",
        method: "GET",
        params: { email: Config.defaultEmail },
      }),
      providesTags: ["group"],
    }),
  }),
});
export const {
  useCreateGroupMutation,
  useJoinGroupMutation,
  useGetGroupsQuery,
} = memeberApi;
