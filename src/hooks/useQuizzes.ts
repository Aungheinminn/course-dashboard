import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { quizApi } from "../lib/api/quiz.api";
import type { CreateQuizDto, UpdateQuizDto } from "../types/quiz";

export const useQuizzes = () => {
  return useQuery({
    queryKey: ["quizzes"],
    queryFn: quizApi.getAll,
  });
};

export const useQuiz = (id: string) => {
  return useQuery({
    queryKey: ["quiz", id],
    queryFn: () => quizApi.getById(id),
    enabled: !!id,
  });
};

export const useQuizzesByOwner = (ownerId: string) => {
  return useQuery({
    queryKey: ["quizzes", "owner", ownerId],
    queryFn: () => quizApi.getByOwner(ownerId),
    enabled: !!ownerId,
  });
};

export const useQuizzesByTags = (tags: string[]) => {
  return useQuery({
    queryKey: ["quizzes", "tags", tags],
    queryFn: () => quizApi.getByTags(tags),
    enabled: tags.length > 0,
  });
};

export const useCreateQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (quiz: CreateQuizDto) => quizApi.create(quiz),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
  });
};

export const useUpdateQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, quiz }: { id: string; quiz: UpdateQuizDto }) =>
      quizApi.update(id, quiz),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
  });
};

export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => quizApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
  });
};
