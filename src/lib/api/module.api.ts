import { apiClient } from './client';
import type { Module, CreateModuleDto, UpdateModuleDto } from '../../types/module';

export const moduleApi = {
  getAll: async (): Promise<Module[]> => {
    const { data } = await apiClient.get('/module');
    return data;
  },

  getById: async (id: string): Promise<Module> => {
    const { data } = await apiClient.get(`/module/${id}`);
    return data;
  },

  getByCourseId: async (courseId: string): Promise<Module[]> => {
    const { data } = await apiClient.get(`/module/course/${courseId}`);
    return data;
  },

  create: async (module: CreateModuleDto): Promise<Module> => {
    const { data } = await apiClient.post('/module', module);
    return data;
  },

  update: async (id: string, module: UpdateModuleDto): Promise<{ success: boolean; message: string; data?: Module }> => {
    const { data } = await apiClient.put(`/module/${id}`, module);
    return data;
  },

  delete: async (id: string): Promise<{ success: boolean; message: string }> => {
    const { data } = await apiClient.delete(`/module/${id}`);
    return data;
  },
};
