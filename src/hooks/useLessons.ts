import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { lessonApi } from '../lib/api/lesson.api';
import type { CreateLessonDto, UpdateLessonDto } from '../types/lesson';

export const useLessons = () => {
  return useQuery({
    queryKey: ['lessons'],
    queryFn: lessonApi.getAll,
  });
};

export const useLessonsByModule = (moduleId: string) => {
  return useQuery({
    queryKey: ['lessons', 'module', moduleId],
    queryFn: () => lessonApi.getByModuleId(moduleId),
    enabled: !!moduleId,
  });
};

export const useLesson = (id: string) => {
  return useQuery({
    queryKey: ['lessons', id],
    queryFn: () => lessonApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (lesson: CreateLessonDto) => lessonApi.create(lesson),
    onSuccess: (newLesson) => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
      queryClient.invalidateQueries({ queryKey: ['lessons', 'module', newLesson.module_id] });
    },
  });
};

export const useUpdateLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, lesson }: { id: string; lesson: UpdateLessonDto }) =>
      lessonApi.update(id, lesson),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
      queryClient.invalidateQueries({ queryKey: ['lessons', variables.id] });
      if (variables.lesson.module_id) {
        queryClient.invalidateQueries({ queryKey: ['lessons', 'module', variables.lesson.module_id] });
      }
    },
  });
};

export const useDeleteLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => lessonApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
    },
  });
};
