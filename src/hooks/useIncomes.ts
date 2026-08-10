import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { incomesService } from "../services/incomes";
import type { Income } from "../types/models/income";

export function useIncomes() {
  return useQuery({
    queryKey: ["incomes"],
    queryFn: () => incomesService.getAll(),
  });
}

export function useCreateIncome() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (income: Omit<Income, "id" | "createdAt" | "updatedAt">) =>
      incomesService.create(income),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
    },
  });
}

export function useUpdateIncome() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Income> }) =>
      incomesService.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
    },
  });
}

export function useDeleteIncome() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => incomesService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
    },
  });
}
