import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { kennelNotesService } from "../services/kennelNotes";
import type { KennelNote } from "../types/models/kennelNote";

export function useKennelNotes() {
  return useQuery({
    queryKey: ["kennelNotes"],
    queryFn: () => kennelNotesService.getAll(),
  });
}

export function useCreateKennelNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (note: Omit<KennelNote, "id" | "createdAt" | "updatedAt">) =>
      kennelNotesService.create(note),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kennelNotes"] });
    },
  });
}

export function useUpdateKennelNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<KennelNote> }) =>
      kennelNotesService.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kennelNotes"] });
    },
  });
}

export function useDeleteKennelNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => kennelNotesService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kennelNotes"] });
    },
  });
}
