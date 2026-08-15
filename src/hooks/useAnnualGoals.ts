import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { annualGoalsService } from "../services/annualGoals";
import type { AnnualGoal } from "../types/models/annualGoal";

export function useAnnualGoals() {
  return useQuery({
    queryKey: ["annualGoals"],
    queryFn: () => annualGoalsService.getAll(),
  });
}

export function useCreateAnnualGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (goal: Omit<AnnualGoal, "id" | "createdAt" | "updatedAt">) =>
      annualGoalsService.create(goal),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["annualGoals"] });
    },
  });
}

export function useUpdateAnnualGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<AnnualGoal> }) =>
      annualGoalsService.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["annualGoals"] });
    },
  });
}

export function useDeleteAnnualGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => annualGoalsService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["annualGoals"] });
    },
  });
}
