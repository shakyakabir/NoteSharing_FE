import Config from "@/config/Index";
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
        params: { email: Config.defaultEmail },
      }),
    }),
    getPublicNotes: builder.query<any, void>({
      query: () => ({
        url: `/notes/public`,
        method: "GET",
      }),
    }),
    getNotesID: builder.query({
      query: (id) => ({
        url: `/notes/${id}`,
        method: "GET",
        params: { email: Config.defaultEmail },
      }),
    }),
    getPublicNotesID: builder.query({
      query: (id) => ({
        url: `/notes/public/${id}`,
        method: "GET",
      }),
    }),
    PostNotes: builder.mutation({
      query: (noteData) => ({
        url: `/notes`,
        method: "POST",
        body: noteData,
        params: { email: Config.defaultEmail },
      }),
    }),

    postGroupNotes: builder.mutation({
      query: ({ noteData, id }) => ({
        url: `/notes/group/${id}`,
        method: "PUT",
        body: noteData,
        params: { email: Config.defaultEmail },
      }),
    }),
    getGroupNotes: builder.query<any, string>({
      query: (groupId) => ({
        url: `/notes/groups/${groupId}`,
        method: "GET",
        params: {
          email: Config.defaultEmail,
        },
      }),
    }),

    updateNotes: builder.mutation({
      query: ({ noteData, id }) => ({
        url: `/notes/${id}`,
        method: "PUT",
        // body: noteData?.content ?? noteData,
        body: noteData,
        params: { email: Config.defaultEmail },
      }),
    }),

    PostQuiz: builder.mutation({
      query: (QuizNote) => ({
        url: `/from-note`,
        method: "POST",
        body: QuizNote,
        params: { email: Config.defaultEmail },
      }),
    }),
    getQuizID: builder.query({
      query: (id) => ({
        url: `/quiz/${id}`,
        method: "GET",
        // params: { email: "xiregev461@getasail.com" },
      }),
    }),
    playQuiz: builder.mutation({
      query: ({ quizId, answers }) => ({
        url: `/play`,
        method: "POST",
        body: answers,
        params: { quizId, email: Config.defaultEmail },
      }),
    }),
  }),
});
export const {
  useGetNotesQuery,
  useGetPublicNotesQuery,
  useGetPublicNotesIDQuery,
  usePostNotesMutation,
  useGetGroupNotesQuery,
  usePostGroupNotesMutation,
  useUpdateNotesMutation,
  useGetNotesIDQuery,
  usePostQuizMutation,
  useGetQuizIDQuery,
  usePlayQuizMutation,
} = NoteSlice;
