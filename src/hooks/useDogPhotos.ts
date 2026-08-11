import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { dogPhotosService } from "../services/dogPhotos";
import type { DogPhoto } from "../types/models/dogPhoto";

export function useDogPhotosByDog(dogId?: string) {
  return useQuery({
    queryKey: ["dogPhotos", "dog", dogId],
    queryFn: () => dogPhotosService.getByDogId(dogId!),
    enabled: !!dogId,
  });
}

export function useCreateDogPhoto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (photo: Omit<DogPhoto, "id" | "createdAt">) =>
      dogPhotosService.create(photo),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["dogPhotos", "dog", data.dogId],
      });
    },
  });
}

export function useDeleteDogPhoto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string; dogId: string }) =>
      dogPhotosService.delete(id),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["dogPhotos", "dog", variables.dogId],
      });
    },
  });
}
