import type { BackupData } from "../types/backup";
import { STORAGE_KEYS } from "./storage";

const APP_NAME = "TheDogMall Pro";
const VERSION = "0.3.0";

function read(key: string) {
  const value = localStorage.getItem(key);

  if (!value) {
    return [];
  }

  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}

function write(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function createBackup(): BackupData {
  return {
    app: APP_NAME,
    version: VERSION,
    createdAt: new Date().toISOString(),

    data: {
      dogs: read(STORAGE_KEYS.dogs),
      breedings: read(STORAGE_KEYS.breedings),
      litters: read(STORAGE_KEYS.litters),
      clients: read(STORAGE_KEYS.clients),
      settings: read(STORAGE_KEYS.settings),
    },
  };
}

export function downloadBackup() {
  const backup = createBackup();

  const blob = new Blob([JSON.stringify(backup, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  const date = new Date().toISOString().slice(0, 10);

  link.href = url;
  link.download = `thedogmall-backup-${date}.json`;

  document.body.appendChild(link);

  link.click();

  link.remove();

  URL.revokeObjectURL(url);
}

export function restoreBackup(backup: BackupData) {
  if (backup.app !== APP_NAME) {
    throw new Error("Cette sauvegarde ne provient pas de TheDogMall Pro.");
  }

  write(STORAGE_KEYS.dogs, backup.data.dogs);
  write(STORAGE_KEYS.breedings, backup.data.breedings);
  write(STORAGE_KEYS.litters, backup.data.litters);
  write(STORAGE_KEYS.clients, backup.data.clients);
  write(STORAGE_KEYS.settings, backup.data.settings);

  window.location.reload();
}
