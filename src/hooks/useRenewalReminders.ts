import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { renewalRemindersService } from "../services/renewalReminders";
import type { RenewalReminder } from "../types/models/renewalReminder";

export function useRenewalReminders() {
  return useQuery({
    queryKey: ["renewalReminders"],
    queryFn: () => renewalRemindersService.getAll(),
  });
}

export function useRenewalRemindersByDog(dogId?: string) {
  return useQuery({
    queryKey: ["renewalReminders", "dog", dogId],
    queryFn: () => renewalRemindersService.getByDogId(dogId!),
    enabled: !!dogId,
  });
}

export function useCreateRenewalReminder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      reminder: Omit<RenewalReminder, "id" | "createdAt" | "updatedAt">,
    ) => renewalRemindersService.create(reminder),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["renewalReminders"] });

      queryClient.invalidateQueries({
        queryKey: ["renewalReminders", "dog", data.dogId],
      });
    },
  });
}

export function useUpdateRenewalReminder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<RenewalReminder>;
    }) => renewalRemindersService.update(id, data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["renewalReminders"] });

      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["renewalReminders", "dog", data.dogId],
        });
      }
    },
  });
}

export function useDeleteRenewalReminder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string; dogId: string }) =>
      renewalRemindersService.delete(id),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["renewalReminders"] });

      queryClient.invalidateQueries({
        queryKey: ["renewalReminders", "dog", variables.dogId],
      });
    },
  });
}
