import { apiClient } from "./client";
import type {
  Quiz,
  CreateQuizDto,
  UpdateQuizDto,
} from "../../types/quiz";

export const quizApi = {
  getAll: async (): Promise<Quiz[]> => {
    const { data } = await apiClient.get("/question");
    return data;
  },

  getById: async (id: string): Promise<Quiz> => {
    const { data } = await apiClient.get(`/question/${id}`);
    return data;
  },

  getByOwner: async (ownerId: string): Promise<Quiz[]> => {
    const { data } = await apiClient.get(`/question/owner/${ownerId}`);
    return data;
  },

  getByTags: async (tags: string[]): Promise<Quiz[]> => {
    const { data } = await apiClient.get(
      `/question/tags?tags=${tags.join(",")}`,
    );
    return data;
  },

  create: async (quiz: CreateQuizDto): Promise<Quiz> => {
    const { data } = await apiClient.post("/question", quiz);
    return data;
  },

  update: async (
    id: string,
    quiz: UpdateQuizDto,
  ): Promise<{ success: boolean; message: string; data?: Quiz }> => {
    const { data } = await apiClient.put(`/question/${id}`, quiz);
    return data;
  },

  delete: async (
    id: string,
  ): Promise<{ success: boolean; message: string }> => {
    const { data } = await apiClient.delete(`/question/${id}`);
    return data;
  },
};
