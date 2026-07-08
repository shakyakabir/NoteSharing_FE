import customBaseQuery from "@/service/BaseApi";
import { createApi } from "@reduxjs/toolkit/query/react";

export const NoteSlice = createApi({
  reducerPath: "NoteSlice",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getNotes: builder.query<any, void>({
      query: () => ({
        url: `/notes`,
        method: "GET",
        params: { email: "xiregev461@getasail.com" },
      }),
    }),
    getNotesID: builder.query({
      query: (id) => ({
        url: `/notes/${id}`,
        method: "GET",
        params: { email: "xiregev461@getasail.com" },
      }),
    }),
    PostNotes: builder.mutation({
      query: (noteData) => ({
        url: `/notes`,
        method: "POST",
        body: noteData,
        params: { email: "xiregev461@getasail.com" },
      }),
    }),

    updateNotes: builder.mutation({
      query: ({ noteData, id }) => ({
        url: `/notes/${id}`,
        method: "PUT",
        body: noteData,
        params: { email: "xiregev461@getasail.com" },
      }),
    }),

    PostQuiz: builder.mutation({
      query: (QuizNote) => ({
        url: `/from-note`,
        method: "POST",
        body: QuizNote,
        params: { email: "xiregev461@getasail.com" },
      }),
    }),
    getQuizID: builder.query({
      query: (id) => ({
        url: `/quiz/${id}`,
        method: "GET",
        // params: { email: "xiregev461@getasail.com" },
      }),
    }),
  }),
});
export const {
  useGetNotesQuery,
  usePostNotesMutation,
  useUpdateNotesMutation,
  useGetNotesIDQuery,
  usePostQuizMutation,
  useGetQuizIDQuery,
} = NoteSlice;
