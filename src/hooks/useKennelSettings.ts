import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { kennelSettingsService } from "../services/kennelSettings";
import type { KennelSettings } from "../types/models/kennelSettings";

export function useKennelSettings() {
  return useQuery({
    queryKey: ["kennelSettings"],
    queryFn: () => kennelSettingsService.get(),
  });
}

export function useUpdateKennelSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<KennelSettings>) =>
      kennelSettingsService.update(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kennelSettings"] });
    },
  });
}
