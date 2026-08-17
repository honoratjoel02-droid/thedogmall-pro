import type { FeedingLog } from "../types/models/feedingLog";

export function getCurrentDiet(logs: FeedingLog[]): FeedingLog | null {
  if (logs.length === 0) return null;

  return [...logs].sort((a, b) => b.date.localeCompare(a.date))[0];
}
