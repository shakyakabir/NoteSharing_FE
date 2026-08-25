import customBaseQuery from "@/service/BaseApi";
import { createApi } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    Register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/verify-otp",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        body: data,
        method: "POST",
      }),
    }),
    getUserProfile: builder.query<any, void>({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
    }),
  }),
});
export const {
  useRegisterMutation,
  useVerifyOtpMutation,
  useGetUserProfileQuery,
  useLoginMutation,
} = authApi;
