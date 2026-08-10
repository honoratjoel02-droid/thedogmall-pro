import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { expensesService } from "../services/expenses";
import type { Expense } from "../types/models/expense";

export function useExpenses() {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: () => expensesService.getAll(),
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (expense: Omit<Expense, "id" | "createdAt" | "updatedAt">) =>
      expensesService.create(expense),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
}

export function useUpdateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Expense> }) =>
      expensesService.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => expensesService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
}
