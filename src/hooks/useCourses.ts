import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { courseApi } from '../lib/api';
import type { CreateCourseDto, UpdateCourseDto } from '../types/course';

export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: courseApi.getAll,
  });
};

export const useCoursesByInstructor = (instructorId: string) => {
  return useQuery({
    queryKey: ['courses', 'instructor', instructorId],
    queryFn: () => courseApi.getByInstructorId(instructorId),
    enabled: !!instructorId,
  });
};

export const useCourse = (id: string) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => courseApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (course: CreateCourseDto) => courseApi.create(course),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, course }: { id: string; course: UpdateCourseDto }) =>
      courseApi.update(id, course),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => courseApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
};
