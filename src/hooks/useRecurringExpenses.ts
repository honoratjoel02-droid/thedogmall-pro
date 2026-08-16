import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { recurringExpensesService } from "../services/recurringExpenses";
import type { RecurringExpense } from "../types/models/recurringExpense";

export function useRecurringExpenses() {
  return useQuery({
    queryKey: ["recurringExpenses"],
    queryFn: () => recurringExpensesService.getAll(),
  });
}

export function useCreateRecurringExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      item: Omit<RecurringExpense, "id" | "createdAt" | "updatedAt">,
    ) => recurringExpensesService.create(item),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recurringExpenses"] });
    },
  });
}

export function useUpdateRecurringExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<RecurringExpense>;
    }) => recurringExpensesService.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recurringExpenses"] });
    },
  });
}

export function useDeleteRecurringExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => recurringExpensesService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recurringExpenses"] });
    },
  });
}
