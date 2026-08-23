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
