import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { clientsService } from "../services/clients";
import type { Client } from "../types/models/client";

export function useClients() {
  return useQuery({
    queryKey: ["clients"],
    queryFn: () => clientsService.getAll(),
  });
}

export function useClient(id?: string) {
  return useQuery({
    queryKey: ["clients", id],
    queryFn: () => clientsService.getById(id!),
    enabled: !!id,
  });
}

export function useCreateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (client: Omit<Client, "id" | "createdAt" | "updatedAt">) =>
      clientsService.create(client),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
}

export function useUpdateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Client> }) =>
      clientsService.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      queryClient.invalidateQueries({ queryKey: ["clients", variables.id] });
    },
  });
}

export function useDeleteClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => clientsService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
}
