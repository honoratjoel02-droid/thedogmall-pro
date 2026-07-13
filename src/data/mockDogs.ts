import type { Dog } from "../types/dog";

export const mockDogs: Dog[] = [
  {
    id: "1",
    name: "Maya",
    sex: "Femelle",
    breed: "Chow Chow",
    color: "Crème",
    birthDate: "2023-03-12",
    weight: 24,
    status: "Gestante",
  },
  {
    id: "2",
    name: "Max",
    sex: "Mâle",
    breed: "Chow Chow",
    color: "Rouge",
    birthDate: "2022-09-01",
    weight: 27,
    status: "Disponible",
  },
  {
    id: "3",
    name: "Bella",
    sex: "Femelle",
    breed: "Chow Chow",
    color: "Noir",
    birthDate: "2021-11-18",
    weight: 23,
    status: "Réservé",
  },
];