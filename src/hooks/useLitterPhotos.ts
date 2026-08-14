import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { litterPhotosService } from "../services/litterPhotos";
import type { LitterPhoto } from "../types/models/litterPhoto";

export function useLitterPhotosByLitter(litterId?: string) {
  return useQuery({
    queryKey: ["litterPhotos", "litter", litterId],
    queryFn: () => litterPhotosService.getByLitterId(litterId!),
    enabled: !!litterId,
  });
}

export function useCreateLitterPhoto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (photo: Omit<LitterPhoto, "id" | "createdAt">) =>
      litterPhotosService.create(photo),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["litterPhotos", "litter", data.litterId],
      });
    },
  });
}

export function useDeleteLitterPhoto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string; litterId: string }) =>
      litterPhotosService.delete(id),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["litterPhotos", "litter", variables.litterId],
      });
    },
  });
}
