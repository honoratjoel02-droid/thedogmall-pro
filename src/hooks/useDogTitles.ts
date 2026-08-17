import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { dogTitlesService } from "../services/dogTitles";
import type { DogTitle } from "../types/models/dogTitle";

export function useDogTitles() {
  return useQuery({
    queryKey: ["dogTitles"],
    queryFn: () => dogTitlesService.getAll(),
  });
}

export function useDogTitlesByDog(dogId?: string) {
  return useQuery({
    queryKey: ["dogTitles", "dog", dogId],
    queryFn: () => dogTitlesService.getByDogId(dogId!),
    enabled: !!dogId,
  });
}

export function useCreateDogTitle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (title: Omit<DogTitle, "id" | "createdAt" | "updatedAt">) =>
      dogTitlesService.create(title),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["dogTitles"] });

      queryClient.invalidateQueries({
        queryKey: ["dogTitles", "dog", data.dogId],
      });
    },
  });
}

export function useUpdateDogTitle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<DogTitle> }) =>
      dogTitlesService.update(id, data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["dogTitles"] });

      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["dogTitles", "dog", data.dogId],
        });
      }
    },
  });
}

export function useDeleteDogTitle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string; dogId: string }) =>
      dogTitlesService.delete(id),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["dogTitles"] });

      queryClient.invalidateQueries({
        queryKey: ["dogTitles", "dog", variables.dogId],
      });
    },
  });
}
