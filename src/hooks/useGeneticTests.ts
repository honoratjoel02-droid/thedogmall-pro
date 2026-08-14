import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { geneticTestsService } from "../services/geneticTests";
import type { GeneticTest } from "../types/models/geneticTest";

export function useGeneticTests() {
  return useQuery({
    queryKey: ["geneticTests"],
    queryFn: () => geneticTestsService.getAll(),
  });
}

export function useGeneticTestsByDog(dogId?: string) {
  return useQuery({
    queryKey: ["geneticTests", "dog", dogId],
    queryFn: () => geneticTestsService.getByDogId(dogId!),
    enabled: !!dogId,
  });
}

export function useCreateGeneticTest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (test: Omit<GeneticTest, "id" | "createdAt" | "updatedAt">) =>
      geneticTestsService.create(test),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["geneticTests"] });

      queryClient.invalidateQueries({
        queryKey: ["geneticTests", "dog", data.dogId],
      });
    },
  });
}

export function useUpdateGeneticTest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<GeneticTest> }) =>
      geneticTestsService.update(id, data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["geneticTests"] });

      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["geneticTests", "dog", data.dogId],
        });
      }
    },
  });
}

export function useDeleteGeneticTest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string; dogId: string }) =>
      geneticTestsService.delete(id),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["geneticTests"] });

      queryClient.invalidateQueries({
        queryKey: ["geneticTests", "dog", variables.dogId],
      });
    },
  });
}
