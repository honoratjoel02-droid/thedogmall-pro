import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { clientInteractionsService } from "../services/clientInteractions";
import type { ClientInteraction } from "../types/models/clientInteraction";

export function useClientInteractions() {
  return useQuery({
    queryKey: ["clientInteractions"],
    queryFn: () => clientInteractionsService.getAll(),
  });
}

export function useClientInteractionsByClient(clientId?: string) {
  return useQuery({
    queryKey: ["clientInteractions", "client", clientId],
    queryFn: () => clientInteractionsService.getByClientId(clientId!),
    enabled: !!clientId,
  });
}

export function useCreateClientInteraction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      interaction: Omit<ClientInteraction, "id" | "createdAt" | "updatedAt">,
    ) => clientInteractionsService.create(interaction),

    onSuccess: (interaction) => {
      queryClient.invalidateQueries({ queryKey: ["clientInteractions"] });
      queryClient.invalidateQueries({
        queryKey: ["clientInteractions", "client", interaction.clientId],
      });
    },
  });
}

export function useUpdateClientInteraction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<ClientInteraction>;
    }) => clientInteractionsService.update(id, data),

    onSuccess: (interaction) => {
      queryClient.invalidateQueries({ queryKey: ["clientInteractions"] });

      if (interaction) {
        queryClient.invalidateQueries({
          queryKey: ["clientInteractions", "client", interaction.clientId],
        });
      }
    },
  });
}

export function useDeleteClientInteraction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (interaction: ClientInteraction) =>
      clientInteractionsService.delete(interaction.id),

    onSuccess: (_, interaction) => {
      queryClient.invalidateQueries({ queryKey: ["clientInteractions"] });
      queryClient.invalidateQueries({
        queryKey: ["clientInteractions", "client", interaction.clientId],
      });
    },
  });
}
