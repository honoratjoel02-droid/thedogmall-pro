// src/lib/alerts.ts

import type { Dog } from "../types/dog";
import type { Task } from "../types/models/task";
import type { Pregnancy } from "../types/models/pregnancy";
import type { Puppy } from "../types/models/puppy";
import type { HealthRecord } from "../types/models/healthRecord";

export type AlertSeverity = "overdue" | "soon" | "info";

export interface Alert {
  id: string;
  message: string;
  date: string;
  severity: AlertSeverity;
  link?: string;
}

const SOON_WINDOW_DAYS = 7;

function daysUntil(dateIso: string, now: Date): number {
  const date = new Date(dateIso);

  return Math.floor(
    (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );
}

function severityFor(dateIso: string, now: Date): AlertSeverity {
  const diff = daysUntil(dateIso, now);

  if (diff < 0) return "overdue";
  if (diff <= SOON_WINDOW_DAYS) return "soon";
  return "info";
}

const SEVERITY_RANK: Record<AlertSeverity, number> = {
  overdue: 0,
  soon: 1,
  info: 2,
};

type ComputeAlertsParams = {
  tasks: Task[];
  pregnancies: Pregnancy[];
  puppies: Puppy[];
  dogs: Dog[];
  healthRecords?: HealthRecord[];
  now?: Date;
};

export function computeAlerts({
  tasks,
  pregnancies,
  puppies,
  dogs,
  healthRecords = [],
  now = new Date(),
}: ComputeAlertsParams): Alert[] {
  const alerts: Alert[] = [];

  for (const task of tasks) {
    if (task.done) continue;

    const severity = severityFor(task.dueDate, now);

    if (severity === "info") continue;

    const link = task.dogId
      ? `/dogs/${task.dogId}`
      : task.litterId
        ? `/litters/${task.litterId}`
        : task.clientId
          ? `/clients/${task.clientId}`
          : undefined;

    alerts.push({
      id: `task-${task.id}`,
      message:
        severity === "overdue"
          ? `Tâche en retard : ${task.title}`
          : `Tâche à venir : ${task.title}`,
      date: task.dueDate,
      severity,
      link,
    });
  }

  for (const pregnancy of pregnancies) {
    if (pregnancy.status === "Terminée" || pregnancy.status === "Interrompue") {
      continue;
    }

    const female = dogs.find((dog) => dog.id === pregnancy.femaleId);
    const femaleName = female?.name ?? "Femelle";
    const link = `/breeding/${pregnancy.breedingId}`;

    if (pregnancy.ultrasoundDate && !pregnancy.ultrasoundResult) {
      const severity = severityFor(pregnancy.ultrasoundDate, now);

      if (severity !== "info") {
        alerts.push({
          id: `pregnancy-echo-${pregnancy.id}`,
          message: `Échographie à prévoir pour ${femaleName}`,
          date: pregnancy.ultrasoundDate,
          severity,
          link,
        });
      }
    }

    if (pregnancy.xrayDate && !pregnancy.xrayResult) {
      const severity = severityFor(pregnancy.xrayDate, now);

      if (severity !== "info") {
        alerts.push({
          id: `pregnancy-xray-${pregnancy.id}`,
          message: `Radiographie à prévoir pour ${femaleName}`,
          date: pregnancy.xrayDate,
          severity,
          link,
        });
      }
    }

    const birthSeverity = severityFor(pregnancy.expectedBirthDate, now);

    if (birthSeverity !== "info") {
      alerts.push({
        id: `pregnancy-birth-${pregnancy.id}`,
        message: `Mise bas prévue pour ${femaleName}`,
        date: pregnancy.expectedBirthDate,
        severity: birthSeverity,
        link,
      });
    }
  }

  for (const puppy of puppies) {
    for (const entry of puppy.vaccinations) {
      if (entry.done) continue;

      const severity = severityFor(entry.date, now);

      if (severity === "info") continue;

      alerts.push({
        id: `puppy-vacc-${puppy.id}-${entry.id}`,
        message: `Vaccin en attente : ${puppy.identifier}`,
        date: entry.date,
        severity,
        link: `/litters/${puppy.litterId}`,
      });
    }

    for (const entry of puppy.dewormings) {
      if (entry.done) continue;

      const severity = severityFor(entry.date, now);

      if (severity === "info") continue;

      alerts.push({
        id: `puppy-deworm-${puppy.id}-${entry.id}`,
        message: `Vermifuge en attente : ${puppy.identifier}`,
        date: entry.date,
        severity,
        link: `/litters/${puppy.litterId}`,
      });
    }
  }

  for (const record of healthRecords) {
    if (record.done) continue;

    const severity = severityFor(record.date, now);

    if (severity === "info") continue;

    const dog = dogs.find((d) => d.id === record.dogId);

    alerts.push({
      id: `health-${record.id}`,
      message: `${record.type} en attente : ${dog?.name ?? record.title}`,
      date: record.date,
      severity,
      link: `/dogs/${record.dogId}`,
    });
  }

  return alerts.sort((a, b) => {
    const rankDiff = SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity];

    if (rankDiff !== 0) return rankDiff;

    return a.date.localeCompare(b.date);
  });
}
