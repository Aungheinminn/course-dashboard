import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { questionApi } from "../lib/api/question.api";
import type { CreateQuestionDto, UpdateQuestionDto } from "../types/question";

export const useQuestions = () => {
  return useQuery({
    queryKey: ["questions"],
    queryFn: questionApi.getAll,
  });
};

export const useQuestion = (id: string) => {
  return useQuery({
    queryKey: ["question", id],
    queryFn: () => questionApi.getById(id),
    enabled: !!id,
  });
};

export const useQuestionsByOwner = (ownerId: string) => {
  return useQuery({
    queryKey: ["questions", "owner", ownerId],
    queryFn: () => questionApi.getByOwner(ownerId),
    enabled: !!ownerId,
  });
};

export const useQuestionsByTags = (tags: string[]) => {
  return useQuery({
    queryKey: ["questions", "tags", tags],
    queryFn: () => questionApi.getByTags(tags),
    enabled: tags.length > 0,
  });
};

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (question: CreateQuestionDto) => questionApi.create(question),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
};

export const useUpdateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, question }: { id: string; question: UpdateQuestionDto }) =>
      questionApi.update(id, question),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
};

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => questionApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
};
