import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { waitlistService } from "../services/waitlist";
import { puppiesService } from "../services/puppies";
import type { WaitlistEntry } from "../types/models/waitlistEntry";

export function useWaitlist() {
  return useQuery({
    queryKey: ["waitlist"],
    queryFn: () => waitlistService.getAll(),
  });
}

export function useWaitlistByLitter(litterId?: string) {
  return useQuery({
    queryKey: ["waitlist", "litter", litterId],
    queryFn: () => waitlistService.getByLitterId(litterId!),
    enabled: !!litterId,
  });
}

export function useCreateWaitlistEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (entry: Omit<WaitlistEntry, "id" | "createdAt" | "updatedAt">) =>
      waitlistService.create(entry),

    onSuccess: (entry) => {
      queryClient.invalidateQueries({ queryKey: ["waitlist"] });
      queryClient.invalidateQueries({
        queryKey: ["waitlist", "litter", entry.litterId],
      });
    },
  });
}

export function useUpdateWaitlistEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<WaitlistEntry> }) =>
      waitlistService.update(id, data),

    onSuccess: (entry) => {
      queryClient.invalidateQueries({ queryKey: ["waitlist"] });

      if (entry) {
        queryClient.invalidateQueries({
          queryKey: ["waitlist", "litter", entry.litterId],
        });
      }
    },
  });
}

export function useDeleteWaitlistEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (entry: WaitlistEntry) => waitlistService.delete(entry.id),

    onSuccess: (_, entry) => {
      queryClient.invalidateQueries({ queryKey: ["waitlist"] });
      queryClient.invalidateQueries({
        queryKey: ["waitlist", "litter", entry.litterId],
      });
    },
  });
}

type ConvertInput = {
  entry: WaitlistEntry;
  puppyId: string;
};

export function useConvertWaitlistEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ entry, puppyId }: ConvertInput) => {
      await puppiesService.update(puppyId, {
        status: "Réservé",
        reservedForClientId: entry.clientId,
      });

      return waitlistService.update(entry.id, { status: "Converti" });
    },

    onSuccess: (_, { entry }) => {
      queryClient.invalidateQueries({ queryKey: ["waitlist"] });
      queryClient.invalidateQueries({
        queryKey: ["waitlist", "litter", entry.litterId],
      });
      queryClient.invalidateQueries({ queryKey: ["puppies"] });
      queryClient.invalidateQueries({
        queryKey: ["puppies", "litter", entry.litterId],
      });
    },
  });
}
