import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { moduleApi } from '../lib/api/module.api';
import type { CreateModuleDto, UpdateModuleDto } from '../types/module';

export const useModules = () => {
  return useQuery({
    queryKey: ['modules'],
    queryFn: moduleApi.getAll,
  });
};

export const useModulesByCourse = (courseId: string) => {
  return useQuery({
    queryKey: ['modules', 'course', courseId],
    queryFn: () => moduleApi.getByCourseId(courseId),
    enabled: !!courseId,
  });
};

export const useModule = (id: string) => {
  return useQuery({
    queryKey: ['modules', id],
    queryFn: () => moduleApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateModule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (module: CreateModuleDto) => moduleApi.create(module),
    onSuccess: (newModule) => {
      queryClient.invalidateQueries({ queryKey: ['modules'] });
      queryClient.invalidateQueries({ queryKey: ['modules', 'course', newModule.course_id] });
    },
  });
};

export const useUpdateModule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, module }: { id: string; module: UpdateModuleDto }) =>
      moduleApi.update(id, module),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['modules'] });
      queryClient.invalidateQueries({ queryKey: ['modules', variables.id] });
      if (variables.module.course_id) {
        queryClient.invalidateQueries({ queryKey: ['modules', 'course', variables.module.course_id] });
      }
    },
  });
};

export const useDeleteModule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => moduleApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['modules'] });
    },
  });
};
