import { useMutation, useQueryClient } from "@tanstack/react-query";

import { puppiesService } from "../services/puppies";
import { mergeScheduleEntries, type ScheduleItem } from "../lib/vaccinationSchedule";
import type { Puppy } from "../types/models/puppy";

type ApplyScheduleInput = {
  puppies: Puppy[];
  items: ScheduleItem[];
  birthDate: string;
};

export function useApplyVaccinationSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ puppies, items, birthDate }: ApplyScheduleInput) => {
      const vaccinationItems = items.filter((item) => item.kind === "vaccination");
      const dewormingItems = items.filter((item) => item.kind === "deworming");

      for (const puppy of puppies) {
        await puppiesService.update(puppy.id, {
          vaccinations: mergeScheduleEntries(
            puppy.vaccinations,
            vaccinationItems,
            birthDate,
          ),
          dewormings: mergeScheduleEntries(
            puppy.dewormings,
            dewormingItems,
            birthDate,
          ),
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
