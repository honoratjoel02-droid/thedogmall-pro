import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { tasksService } from "../services/tasks";
import type { Task } from "../types/models/task";

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => tasksService.getAll(),
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) =>
      tasksService.create(task),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Task> }) =>
      tasksService.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => tasksService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
