import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { healthRecordsService } from "../services/healthRecords";
import type { HealthRecord } from "../types/models/healthRecord";

export function useHealthRecords() {
  return useQuery({
    queryKey: ["healthRecords"],
    queryFn: () => healthRecordsService.getAll(),
  });
}

export function useHealthRecordsByDog(dogId?: string) {
  return useQuery({
    queryKey: ["healthRecords", "dog", dogId],
    queryFn: () => healthRecordsService.getByDogId(dogId!),
    enabled: !!dogId,
  });
}

export function useCreateHealthRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      record: Omit<HealthRecord, "id" | "createdAt" | "updatedAt">,
    ) => healthRecordsService.create(record),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["healthRecords"] });

      queryClient.invalidateQueries({
        queryKey: ["healthRecords", "dog", data.dogId],
      });
    },
  });
}

export function useUpdateHealthRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<HealthRecord>;
    }) => healthRecordsService.update(id, data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["healthRecords"] });

      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["healthRecords", "dog", data.dogId],
        });
      }
    },
  });
}

export function useDeleteHealthRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string; dogId: string }) =>
      healthRecordsService.delete(id),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["healthRecords"] });

      queryClient.invalidateQueries({
        queryKey: ["healthRecords", "dog", variables.dogId],
      });
    },
  });
}
