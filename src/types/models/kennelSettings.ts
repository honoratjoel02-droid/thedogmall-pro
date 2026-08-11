// src/types/models/kennelSettings.ts

export interface KennelSettings {
  name: string;

  ownerName: string;

  address: string;

  phone: string;

  email: string;

  registrationNumber?: string;
}

export const DEFAULT_KENNEL_SETTINGS: KennelSettings = {
  name: "",
  ownerName: "",
  address: "",
  phone: "",
  email: "",
};
