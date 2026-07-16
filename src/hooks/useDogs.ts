import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { dogsService } from "../services/dogs";
import type { Dog } from "../types/dog";

export function useDogs() {
  return useQuery({
    queryKey: ["dogs"],
    queryFn: async () => dogsService.getAll(),
  });
}

export function useCreateDog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dog: Omit<Dog, "id">) => {
      return dogsService.create(dog);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dogs"],
      });
    },
  });
}
