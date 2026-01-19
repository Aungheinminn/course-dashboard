// Quiz type definition matching backend schema
export type QuizType = "true-false" | "multi-choice" | "word-bank";

export interface QuizOption {
  text: string;
  isCorrect: boolean;
  order?: number;
}

export interface Quiz {
  _id: string;
  content: string;
  type: QuizType;
  options: QuizOption[];
  explanation: string;
  owner: string;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateQuizDto {
  content: string;
  type: QuizType;
  options: QuizOption[];
  explanation: string;
  owner: string;
  tags: string[];
}

export interface UpdateQuizDto {
  content?: string;
  type?: QuizType;
  options?: QuizOption[];
  explanation?: string;
  tags?: string[];
}

// Legacy type for backward compatibility
export interface CreateQuiz {
  content: string;
  type: QuizType;
  options: QuizOption[];
  explanation: string;
  tags: string[];
}
