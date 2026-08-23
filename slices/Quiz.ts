import Config from "@/config/Index";
import customBaseQuery from "@/service/BaseApi";
import { createApi } from "@reduxjs/toolkit/query/react";

// --- Types ---

export interface QuizAnswerPayload {
  questionIndex: number;
  answer: string; // "A" | "B" | "C" | "D"
}

export interface CreateQuizArgs {
  /** Raw note text. Provide this OR `file`, not both. */
  noteText?: string;
  /** PDF or TXT upload. Provide this OR `noteText`, not both. */
  file?: File;
  email?: string;
  /** "beginner" | "intermediate" | "advanced" | "expert" */
  difficulty: string;
  /** "solo" | "collaborative" */
  mode: string;
  /** Metadata only for now - backend doesn't resolve this to note content yet. */
  notebookId?: string;
}

export interface PlayQuizArgs {
  quizId: string;
  /** Whoever is actually taking the quiz right now - defaults to Config.defaultEmail. */
  playerEmail?: string;
  answers: QuizAnswerPayload[];
}

export interface QuizResultDTO {
  score: number;
  total: number;
  pointsEarned: number;
  mode: string;
}

export interface Quiz {
  id: string;
  userEmail: string;
  sourceText: string;
  questionsJson: string;
  answerKeyJson: string;
  mode: string;
  difficulty: string;
  pointsPerCompletion: number;
  notebookId?: string;
  createdAt: string;
  updatedAt: string;
}

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Quiz"],
  endpoints: (builder) => ({
    /**
     * POST /api/quiz/create
     * multipart/form-data with two parts:
     *   - "data": JSON blob (email, difficulty, mode, noteText, notebookId)
     *   - "file": optional binary (PDF/TXT)
     *
     * IMPORTANT: don't set a Content-Type header for this request - the browser needs to
     * generate the multipart boundary itself. If customBaseQuery forces
     * "Content-Type: application/json" on every POST, this call will break; it needs to
     * skip/omit that header whenever `body instanceof FormData`.
     */
    postQuiz: builder.mutation<Quiz, CreateQuizArgs>({
      query: ({ noteText, file, email, difficulty, mode, notebookId }) => {
        const formData = new FormData();

        const data = {
          email: email || Config.defaultEmail,
          difficulty,
          mode,
          noteText: noteText || undefined,
          notebookId: notebookId || undefined,
        };

        formData.append(
          "data",
          new Blob([JSON.stringify(data)], { type: "application/json" }),
        );

        if (file) {
          formData.append("file", file);
        }

        return {
          url: "/quiz/create",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Quiz"],
    }),

    // GET /api/quiz/{id}
    getQuizID: builder.query<Quiz, string>({
      query: (id) => ({
        url: `/quiz/${id}`,
        method: "GET",
      }),
      providesTags: ["Quiz"],
    }),

    // POST /api/play?quizId=...&playerEmail=...
    playQuiz: builder.mutation<QuizResultDTO, PlayQuizArgs>({
      query: ({ quizId, playerEmail, answers }) => ({
        url: "/play",
        method: "POST",
        params: {
          quizId: quizId,
          playerEmail: playerEmail || Config.defaultEmail,
        },
        body: answers,
      }),
      invalidatesTags: ["Quiz"],
    }),
  }),
});

export const { usePostQuizMutation, useGetQuizIDQuery, usePlayQuizMutation } =
  quizApi;
