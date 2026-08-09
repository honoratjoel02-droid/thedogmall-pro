import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { breedingService } from "../services/breedings";
import type { Breeding } from "../types/models/breeding";

export function useBreedings() {
  return useQuery({
    queryKey: ["breedings"],
    queryFn: () => breedingService.getAll(),
  });
}

export function useBreeding(id?: string) {
  return useQuery({
    queryKey: ["breedings", id],
    queryFn: () => breedingService.getById(id!),
    enabled: !!id,
  });
}

export function useCreateBreeding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (breeding: Omit<Breeding, "id" | "createdAt" | "updatedAt">) =>
      breedingService.create(breeding),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["breedings"],
      });
    },
  });
}

export function useUpdateBreeding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Breeding> }) =>
      breedingService.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["breedings"],
      });

      queryClient.invalidateQueries({
        queryKey: ["breedings", variables.id],
      });
    },
  });
}

export function useDeleteBreeding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => breedingService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["breedings"],
      });
    },
  });
}
