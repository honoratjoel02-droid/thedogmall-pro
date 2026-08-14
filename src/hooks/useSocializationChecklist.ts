import { useMutation, useQueryClient } from "@tanstack/react-query";

import { puppiesService } from "../services/puppies";
import { mergeChecklistEntries, type ChecklistItem } from "../lib/socializationChecklist";
import type { Puppy } from "../types/models/puppy";

type ApplyChecklistInput = {
  puppies: Puppy[];
  items: ChecklistItem[];
  birthDate: string;
};

export function useApplySocializationChecklist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ puppies, items, birthDate }: ApplyChecklistInput) => {
      for (const puppy of puppies) {
        await puppiesService.update(puppy.id, {
          socialization: mergeChecklistEntries(puppy.socialization, items, birthDate),
        });
      }
    },

    onSuccess: (_, { puppies }) => {
      queryClient.invalidateQueries({ queryKey: ["puppies"] });

      if (puppies[0]) {
        queryClient.invalidateQueries({
          queryKey: ["puppies", "litter", puppies[0].litterId],
        });
      }
    },
  });
}
