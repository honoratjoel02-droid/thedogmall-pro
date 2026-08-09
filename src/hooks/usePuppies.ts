import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { puppiesService } from "../services/puppies";
import type { Puppy } from "../types/models/puppy";

export function usePuppiesByLitter(litterId?: string) {
  return useQuery({
    queryKey: ["puppies", "litter", litterId],
    queryFn: () => puppiesService.getByLitterId(litterId!),
    enabled: !!litterId,
  });
}

export function useCreatePuppy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (puppy: Omit<Puppy, "id" | "createdAt" | "updatedAt">) =>
      puppiesService.create(puppy),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["puppies", "litter", data.litterId],
      });
    },
  });
}

export function useUpdatePuppy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Puppy> }) =>
      puppiesService.update(id, data),

    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["puppies", "litter", data.litterId],
        });
      }
    },
  });
}

export function useDeletePuppy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string; litterId: string }) =>
      puppiesService.delete(id),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["puppies", "litter", variables.litterId],
      });
    },
  });
}
