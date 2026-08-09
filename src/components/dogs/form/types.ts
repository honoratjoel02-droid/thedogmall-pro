// src/components/dogs/form/types.ts

import type { Dog } from "../../../types/models/dog";

export type DogFormData = Omit<Dog, "id" | "createdAt" | "updatedAt">;

export const DEFAULT_DOG_FORM: DogFormData = {
  identity: {
    name: "",
    breed: "",
    sex: "Femelle",
    color: "",
    birthDate: "",
    microchip: "",
    tattoo: "",
    registrationNumber: "",
  },

  health: {
    weight: 0,
    bodyConditionScore: undefined,
    bloodType: "",
    allergies: [],
    notes: "",
  },

  reproduction: {
    breeder: true,
    fertile: true,
  },

  finance: {
    purchasePrice: undefined,
    currentValue: undefined,
  },

  media: {
    profilePhoto: "",
    gallery: [],
  },

  status: "Disponible",
};
