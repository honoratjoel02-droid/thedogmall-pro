import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { dogsService } from "../services/dogs";
import type { Dog } from "../types/dog";

export function useDogs() {
  return useQuery({
    queryKey: ["dogs"],
    queryFn: () => dogsService.getAll(),
  });
}

export function useDog(id?: string) {
  return useQuery({
    queryKey: ["dogs", id],
    queryFn: () => dogsService.getById(id!),
    enabled: !!id,
  });
}

export function useCreateDog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dog: Omit<Dog, "id">) => dogsService.create(dog),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dogs"],
      });
    },
  });
}
export function useUpdateDog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Dog> }) =>
      dogsService.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["dogs"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dogs", variables.id],
      });
    },
  });
}
