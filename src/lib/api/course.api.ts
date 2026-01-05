import { apiClient } from './client';
import type { Course, CreateCourseDto, UpdateCourseDto } from '../../types/course';

export const courseApi = {
  getAll: async (): Promise<Course[]> => {
    const { data } = await apiClient.get('/course');
    return data;
  },

  getByInstructorId: async (instructorId: string): Promise<Course[]> => {
    const { data } = await apiClient.get(`/course/instructor/${instructorId}`);
    return data;
  },

  getById: async (id: string): Promise<Course> => {
    const { data } = await apiClient.get(`/course/${id}`);
    return data;
  },

  create: async (course: CreateCourseDto): Promise<Course> => {
    const { data } = await apiClient.post('/course', course);
    return data;
  },

  update: async (id: string, course: UpdateCourseDto): Promise<{ success: boolean; message: string; data?: Course }> => {
    const { data } = await apiClient.put(`/course/${id}`, course);
    return data;
  },

  delete: async (id: string): Promise<{ success: boolean; message: string }> => {
    const { data } = await apiClient.delete(`/course/${id}`);
    return data;
  },
};
