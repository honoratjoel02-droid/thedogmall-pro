import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { feedingLogsService } from "../services/feedingLogs";
import type { FeedingLog } from "../types/models/feedingLog";

export function useFeedingLogs() {
  return useQuery({
    queryKey: ["feedingLogs"],
    queryFn: () => feedingLogsService.getAll(),
  });
}

export function useFeedingLogsByDog(dogId?: string) {
  return useQuery({
    queryKey: ["feedingLogs", "dog", dogId],
    queryFn: () => feedingLogsService.getByDogId(dogId!),
    enabled: !!dogId,
  });
}

export function useCreateFeedingLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (log: Omit<FeedingLog, "id" | "createdAt" | "updatedAt">) =>
      feedingLogsService.create(log),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["feedingLogs"] });

      queryClient.invalidateQueries({
        queryKey: ["feedingLogs", "dog", data.dogId],
      });
    },
  });
}

export function useUpdateFeedingLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<FeedingLog> }) =>
      feedingLogsService.update(id, data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["feedingLogs"] });

      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["feedingLogs", "dog", data.dogId],
        });
      }
    },
  });
}

export function useDeleteFeedingLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string; dogId: string }) =>
      feedingLogsService.delete(id),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["feedingLogs"] });

      queryClient.invalidateQueries({
        queryKey: ["feedingLogs", "dog", variables.dogId],
      });
    },
  });
}
