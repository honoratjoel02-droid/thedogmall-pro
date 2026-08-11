// src/types/models/dogDocument.ts

export type DogDocumentType =
  | "Pedigree"
  | "Certificat vétérinaire"
  | "Certificat de vaccination"
  | "Contrat"
  | "Autre";

export interface DogDocument {
  id: string;

  dogId: string;

  title: string;

  type: DogDocumentType;

  fileName: string;

  dataUrl: string;

  createdAt: string;
}
