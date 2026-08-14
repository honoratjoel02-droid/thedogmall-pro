import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { heatCyclesService } from "../services/heatCycles";
import type { HeatCycle } from "../types/models/heatCycle";

export function useHeatCycles() {
  return useQuery({
    queryKey: ["heatCycles"],
    queryFn: () => heatCyclesService.getAll(),
  });
}

export function useHeatCyclesByDog(dogId?: string) {
  return useQuery({
    queryKey: ["heatCycles", "dog", dogId],
    queryFn: () => heatCyclesService.getByDogId(dogId!),
    enabled: !!dogId,
  });
}

export function useCreateHeatCycle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cycle: Omit<HeatCycle, "id" | "createdAt" | "updatedAt">) =>
      heatCyclesService.create(cycle),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["heatCycles"] });

      queryClient.invalidateQueries({
        queryKey: ["heatCycles", "dog", data.dogId],
      });
    },
  });
}

export function useUpdateHeatCycle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<HeatCycle> }) =>
      heatCyclesService.update(id, data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["heatCycles"] });

      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["heatCycles", "dog", data.dogId],
        });
      }
    },
  });
}

export function useDeleteHeatCycle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string; dogId: string }) =>
      heatCyclesService.delete(id),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["heatCycles"] });

      queryClient.invalidateQueries({
        queryKey: ["heatCycles", "dog", variables.dogId],
      });
    },
  });
}
