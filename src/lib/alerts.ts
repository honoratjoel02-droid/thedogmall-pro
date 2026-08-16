// src/lib/alerts.ts

import type { Dog } from "../types/dog";
import type { Task } from "../types/models/task";
import type { Pregnancy } from "../types/models/pregnancy";
import type { Puppy } from "../types/models/puppy";
import type { HealthRecord } from "../types/models/healthRecord";
import type { HeatCycle } from "../types/models/heatCycle";
import type { RenewalReminder } from "../types/models/renewalReminder";
import type { RecurringExpense } from "../types/models/recurringExpense";
import { predictNextHeat } from "./heatCycle";

export type AlertSeverity = "overdue" | "soon" | "info";

export interface Alert {
  id: string;
  message: string;
  date: string;
  severity: AlertSeverity;
  link?: string;
}

const SOON_WINDOW_DAYS = 7;
const BACKUP_REMINDER_DAYS = 14;

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
  heatCycles?: HeatCycle[];
  renewalReminders?: RenewalReminder[];
  recurringExpenses?: RecurringExpense[];
  lastBackupAt?: string | null;
  now?: Date;
};

export function computeAlerts({
  tasks,
  pregnancies,
  puppies,
  dogs,
  healthRecords = [],
  heatCycles = [],
  renewalReminders = [],
  recurringExpenses = [],
  lastBackupAt,
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

  for (const reminder of renewalReminders) {
    const severity = severityFor(reminder.dueDate, now);

    if (severity === "info") continue;

    const dog = dogs.find((d) => d.id === reminder.dogId);

    alerts.push({
      id: `renewal-${reminder.id}`,
      message: `${reminder.type} à renouveler : ${dog?.name ?? reminder.label}`,
      date: reminder.dueDate,
      severity,
      link: `/dogs/${reminder.dogId}`,
    });
  }

  for (const item of recurringExpenses) {
    if (!item.active) continue;

    const severity = severityFor(item.nextDueDate, now);

    if (severity === "info") continue;

    alerts.push({
      id: `recurring-expense-${item.id}`,
      message: `Dépense récurrente à régler : ${item.title}`,
      date: item.nextDueDate,
      severity,
      link: "/finances",
    });
  }

  const cyclesByDog = new Map<string, HeatCycle[]>();

  for (const cycle of heatCycles) {
    const list = cyclesByDog.get(cycle.dogId) ?? [];

    list.push(cycle);
    cyclesByDog.set(cycle.dogId, list);
  }

  for (const [dogId, cycles] of cyclesByDog) {
    const prediction = predictNextHeat(cycles);

    if (!prediction) continue;

    const severity = severityFor(prediction.predictedDate, now);

    if (severity === "info") continue;

    const dog = dogs.find((d) => d.id === dogId);

    alerts.push({
      id: `heat-${dogId}`,
      message: `Chaleur prévue pour ${dog?.name ?? "une femelle"}`,
      date: prediction.predictedDate,
      severity,
      link: `/dogs/${dogId}`,
    });
  }

  if (lastBackupAt !== undefined) {
    const dueDate = lastBackupAt
      ? new Date(
          new Date(lastBackupAt).getTime() +
            BACKUP_REMINDER_DAYS * 24 * 60 * 60 * 1000,
        ).toISOString()
      : now.toISOString();

    const severity = severityFor(dueDate, now);

    if (severity !== "info") {
      alerts.push({
        id: "backup-reminder",
        message: lastBackupAt
          ? "Sauvegarde recommandée : plus de 14 jours depuis la dernière"
          : "Aucune sauvegarde n'a encore été effectuée",
        date: dueDate,
        severity,
        link: "/settings",
      });
    }
  }

  return alerts.sort((a, b) => {
    const rankDiff = SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity];

    if (rankDiff !== 0) return rankDiff;

    return a.date.localeCompare(b.date);
  });
}
