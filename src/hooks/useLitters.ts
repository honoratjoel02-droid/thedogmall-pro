import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { littersService } from "../services/litters";
import type { Litter } from "../types/models/litter";

export function useLitters() {
  return useQuery({
    queryKey: ["litters"],
    queryFn: () => littersService.getAll(),
  });
}

export function useLitter(id?: string) {
  return useQuery({
    queryKey: ["litters", id],
    queryFn: () => littersService.getById(id!),
    enabled: !!id,
  });
}

export function useCreateLitter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (litter: Omit<Litter, "id" | "createdAt" | "updatedAt">) =>
      littersService.create(litter),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["litters"] });
    },
  });
}

export function useUpdateLitter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Litter> }) =>
      littersService.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["litters"] });
      queryClient.invalidateQueries({ queryKey: ["litters", variables.id] });
    },
  });
}

export function useDeleteLitter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => littersService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["litters"] });
    },
  });
}
