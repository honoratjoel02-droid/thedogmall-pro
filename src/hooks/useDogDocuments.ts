import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { dogDocumentsService } from "../services/dogDocuments";
import type { DogDocument } from "../types/models/dogDocument";

export function useDogDocumentsByDog(dogId?: string) {
  return useQuery({
    queryKey: ["dogDocuments", "dog", dogId],
    queryFn: () => dogDocumentsService.getByDogId(dogId!),
    enabled: !!dogId,
  });
}

export function useCreateDogDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (doc: Omit<DogDocument, "id" | "createdAt">) =>
      dogDocumentsService.create(doc),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["dogDocuments", "dog", data.dogId],
      });
    },
  });
}

export function useDeleteDogDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string; dogId: string }) =>
      dogDocumentsService.delete(id),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["dogDocuments", "dog", variables.dogId],
      });
    },
  });
}
