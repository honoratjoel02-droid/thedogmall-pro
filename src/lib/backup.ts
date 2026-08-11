import type { BackupData } from "../types/backup";
import { STORAGE_KEYS } from "./storage";

const APP_NAME = "TheDogMall Pro";
const VERSION = "0.6.0";

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

function readObject(key: string) {
  const value = localStorage.getItem(key);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    return null;
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
      pregnancies: read(STORAGE_KEYS.pregnancies),
      litters: read(STORAGE_KEYS.litters),
      puppies: read(STORAGE_KEYS.puppies),
      clients: read(STORAGE_KEYS.clients),
      expenses: read(STORAGE_KEYS.expenses),
      incomes: read(STORAGE_KEYS.incomes),
      tasks: read(STORAGE_KEYS.tasks),
      healthRecords: read(STORAGE_KEYS.healthRecords),
      sales: read(STORAGE_KEYS.sales),
      kennelSettings: readObject(STORAGE_KEYS.kennelSettings),
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
  write(STORAGE_KEYS.pregnancies, backup.data.pregnancies ?? []);
  write(STORAGE_KEYS.litters, backup.data.litters);
  write(STORAGE_KEYS.puppies, backup.data.puppies ?? []);
  write(STORAGE_KEYS.clients, backup.data.clients);
  write(STORAGE_KEYS.expenses, backup.data.expenses ?? []);
  write(STORAGE_KEYS.incomes, backup.data.incomes ?? []);
  write(STORAGE_KEYS.tasks, backup.data.tasks ?? []);
  write(STORAGE_KEYS.healthRecords, backup.data.healthRecords ?? []);
  write(STORAGE_KEYS.sales, backup.data.sales ?? []);

  if (backup.data.kennelSettings) {
    write(STORAGE_KEYS.kennelSettings, backup.data.kennelSettings);
  }

  window.location.reload();
}
