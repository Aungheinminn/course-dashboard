import { apiClient } from './client';
import type { Question, CreateQuestionDto, UpdateQuestionDto } from '../../types/question';

export const questionApi = {
  getAll: async (): Promise<Question[]> => {
    const { data } = await apiClient.get('/question');
    return data;
  },

  getById: async (id: string): Promise<Question> => {
    const { data } = await apiClient.get(`/question/${id}`);
    return data;
  },

  getByOwner: async (ownerId: string): Promise<Question[]> => {
    const { data } = await apiClient.get(`/question/owner/${ownerId}`);
    return data;
  },

  getByTags: async (tags: string[]): Promise<Question[]> => {
    const { data } = await apiClient.get(`/question/tags?tags=${tags.join(',')}`);
    return data;
  },

  create: async (question: CreateQuestionDto): Promise<Question> => {
    const { data } = await apiClient.post('/question', question);
    return data;
  },

  update: async (id: string, question: UpdateQuestionDto): Promise<{ success: boolean; message: string; data?: Question }> => {
    const { data } = await apiClient.put(`/question/${id}`, question);
    return data;
  },

  delete: async (id: string): Promise<{ success: boolean; message: string }> => {
    const { data } = await apiClient.delete(`/question/${id}`);
    return data;
  },
};
