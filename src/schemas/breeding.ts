import { z } from "zod";

export const breedingSchema = z.object({
  femaleId: z.string().min(1, "Veuillez sélectionner une femelle."),

  maleId: z.string().min(1, "Veuillez sélectionner un mâle."),

  breedingDate: z.string().min(1, "Veuillez choisir une date."),

  method: z.enum(["Naturelle", "Insémination"]),

  notes: z.string().optional(),
});

export type BreedingFormData = z.infer<typeof breedingSchema>;
