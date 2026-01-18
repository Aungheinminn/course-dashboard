// Question type definition matching backend schema
export type QuestionType = 'true-false' | 'multi-choice' | 'word-bank';

export interface QuestionOption {
  text: string;
  isCorrect: boolean;
  order?: number;
}

export interface Question {
  _id: string;
  content: string;
  type: QuestionType;
  options: QuestionOption[];
  explanation: string;
  owner: string;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateQuestionDto {
  content: string;
  type: QuestionType;
  options: QuestionOption[];
  explanation: string;
  owner: string;
  tags: string[];
}

export interface UpdateQuestionDto {
  content?: string;
  type?: QuestionType;
  options?: QuestionOption[];
  explanation?: string;
  tags?: string[];
}

// Legacy type for backward compatibility
export interface CreateQuestion {
  content: string;
  type: QuestionType;
  options: QuestionOption[];
  explanation: string;
  tags: string[];
}
