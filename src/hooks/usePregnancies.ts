import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { pregnanciesService } from "../services/pregnancies";
import type { Pregnancy } from "../types/models/pregnancy";

export function usePregnancyByBreeding(breedingId?: string) {
  return useQuery({
    queryKey: ["pregnancies", "breeding", breedingId],
    queryFn: () => pregnanciesService.getByBreedingId(breedingId!),
    enabled: !!breedingId,
  });
}

export function usePregnancies() {
  return useQuery({
    queryKey: ["pregnancies"],
    queryFn: () => pregnanciesService.getAll(),
  });
}

export function useCreatePregnancy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      pregnancy: Omit<Pregnancy, "id" | "createdAt" | "updatedAt">,
    ) => pregnanciesService.create(pregnancy),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["pregnancies", "breeding", data.breedingId],
      });

      queryClient.invalidateQueries({ queryKey: ["pregnancies"] });
    },
  });
}

export function useUpdatePregnancy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Pregnancy> }) =>
      pregnanciesService.update(id, data),

    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["pregnancies", "breeding", data.breedingId],
        });
      }

      queryClient.invalidateQueries({ queryKey: ["pregnancies"] });
    },
  });
}
