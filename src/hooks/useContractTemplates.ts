import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { contractTemplatesService } from "../services/contractTemplates";
import type { ContractTemplate } from "../types/models/contractTemplate";

export function useContractTemplates() {
  return useQuery({
    queryKey: ["contractTemplates"],
    queryFn: () => contractTemplatesService.getAll(),
  });
}

export function useCreateContractTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      template: Omit<ContractTemplate, "id" | "createdAt" | "updatedAt">,
    ) => contractTemplatesService.create(template),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contractTemplates"] });
    },
  });
}

export function useUpdateContractTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<ContractTemplate>;
    }) => contractTemplatesService.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contractTemplates"] });
    },
  });
}

export function useDeleteContractTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => contractTemplatesService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contractTemplates"] });
    },
  });
}
