// src/services/kennelSettings.ts

import {
  DEFAULT_KENNEL_SETTINGS,
  type KennelSettings,
} from "../types/models/kennelSettings";

const STORAGE_KEY = "thedogmall.kennelSettings";

class KennelSettingsService {
  private settings: KennelSettings;

  constructor() {
    this.settings = this.load();
  }

  private load(): KennelSettings {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return DEFAULT_KENNEL_SETTINGS;

    try {
      return { ...DEFAULT_KENNEL_SETTINGS, ...JSON.parse(saved) };
    } catch {
      return DEFAULT_KENNEL_SETTINGS;
    }
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));
  }

  async get(): Promise<KennelSettings> {
    return this.settings;
  }

  async update(data: Partial<KennelSettings>): Promise<KennelSettings> {
    this.settings = { ...this.settings, ...data };

    this.save();

    return this.settings;
  }
}

export const kennelSettingsService = new KennelSettingsService();
