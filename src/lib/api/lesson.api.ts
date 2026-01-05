import { apiClient } from './client';
import type { Lesson, CreateLessonDto, UpdateLessonDto } from '../../types/lesson';

export const lessonApi = {
  getAll: async (): Promise<Lesson[]> => {
    const { data } = await apiClient.get('/lesson');
    return data;
  },

  getById: async (id: string): Promise<Lesson> => {
    const { data } = await apiClient.get(`/lesson/${id}`);
    return data;
  },

  getByModuleId: async (moduleId: string): Promise<Lesson[]> => {
    const { data } = await apiClient.get(`/lesson/module/${moduleId}`);
    return data;
  },

  create: async (lesson: CreateLessonDto): Promise<Lesson> => {
    const { data } = await apiClient.post('/lesson', lesson);
    return data;
  },

  update: async (id: string, lesson: UpdateLessonDto): Promise<{ success: boolean; message: string; data?: Lesson }> => {
    const { data } = await apiClient.put(`/lesson/${id}`, lesson);
    return data;
  },

  delete: async (id: string): Promise<{ success: boolean; message: string }> => {
    const { data } = await apiClient.delete(`/lesson/${id}`);
    return data;
  },
};
