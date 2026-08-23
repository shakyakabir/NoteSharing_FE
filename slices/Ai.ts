import Config from "@/config/Index";
import customBaseQuery from "@/service/BaseApi";
import { createApi } from "@reduxjs/toolkit/query/react";

export const aiApi = createApi({
  reducerPath: "aiApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Presentation", "Report"],
  endpoints: (builder) => ({
    createPresentation: builder.mutation({
      query: (data) => ({
        url: "/presentations",
        method: "POST",
        body: {
          userEmail: Config.defaultEmail,
          ...data,
        },
      }),
      invalidatesTags: ["Presentation"],
    }),
    getPresentations: builder.query<any, string | void>({
      query: (email) => ({
        url: "/presentations",
        method: "GET",
        params: { email: email || Config.defaultEmail },
      }),
      providesTags: ["Presentation"],
    }),
    getPresentationById: builder.query({
      query: (id) => ({
        url: `/presentations/${id}`,
        method: "GET",
      }),
      providesTags: ["Presentation"],
    }),
    exportPresentation: builder.query({
      query: (id) => ({
        url: `/presentations/${id}/export`,
        method: "GET",
        responseHandler: "text",
      }),
    }),
    getReportById: builder.query({
      query: (id) => ({
        url: `/reports/${id}`,
        method: "GET",
        // responseHandler: "text",
      }),
    }),
    createReport: builder.mutation({
      query: (data) => ({
        url: "/reports",
        method: "POST",
        body: {
          userEmail: Config.defaultEmail,
          ...data,
        },
      }),
      invalidatesTags: ["Report"],
    }),
    summarize: builder.mutation({
      query: (data) => ({
        url: "/reports/summarize",
        method: "POST",
        body: {
          userEmail: Config.defaultEmail,
          reportType: "SUMMARY",
          ...data,
        },
      }),
      invalidatesTags: ["Report"],
    }),
    getReports: builder.query<any, string | void>({
      query: (email) => ({
        url: "/reports",
        method: "GET",
        params: { email: email || Config.defaultEmail },
      }),
      providesTags: ["Report"],
    }),
  }),
});

export const {
  useCreatePresentationMutation,
  useGetPresentationsQuery,
  useGetReportByIdQuery,
  useGetPresentationByIdQuery,
  useExportPresentationQuery,
  useCreateReportMutation,
  useSummarizeMutation,
  useGetReportsQuery,
} = aiApi;
