import { describe, it, expect } from "vitest";

import { computeAlerts } from "./alerts";
import type { Task } from "../types/models/task";
import type { Pregnancy } from "../types/models/pregnancy";
import type { Puppy } from "../types/models/puppy";
import type { Dog } from "../types/dog";
import type { HealthRecord } from "../types/models/healthRecord";

const NOW = new Date("2026-01-15T12:00:00Z");

function isoDaysFromNow(days: number): string {
  const date = new Date(NOW);
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

function makeTask(overrides: Partial<Task> & { id: string }): Task {
  return {
    title: "Tâche",
    dueDate: isoDaysFromNow(0),
    category: "Autre",
    done: false,
    createdAt: NOW.toISOString(),
    updatedAt: NOW.toISOString(),
    ...overrides,
  };
}

function makeDog(overrides: Partial<Dog> & { id: string }): Dog {
  return {
    name: overrides.id,
    sex: "Femelle",
    breed: "Berger Australien",
    color: "Noir",
    birthDate: "2020-01-01",
    weight: 20,
    weightHistory: [],
    status: "Disponible",
    ...overrides,
  };
}

describe("computeAlerts — tasks", () => {
  it("flags an overdue, undone task", () => {
    const task = makeTask({ id: "t1", title: "Vaccin", dueDate: isoDaysFromNow(-5) });

    const alerts = computeAlerts({ tasks: [task], pregnancies: [], puppies: [], dogs: [], now: NOW });

    expect(alerts).toHaveLength(1);
    expect(alerts[0].severity).toBe("overdue");
    expect(alerts[0].message).toBe("Tâche en retard : Vaccin");
  });

  it("flags a task due soon as 'soon' and one due later as excluded", () => {
    const soon = makeTask({ id: "t1", title: "Bientôt", dueDate: isoDaysFromNow(5) });
    const later = makeTask({ id: "t2", title: "Plus tard", dueDate: isoDaysFromNow(30) });

    const alerts = computeAlerts({ tasks: [soon, later], pregnancies: [], puppies: [], dogs: [], now: NOW });

    expect(alerts).toHaveLength(1);
    expect(alerts[0].severity).toBe("soon");
    expect(alerts[0].message).toBe("Tâche à venir : Bientôt");
  });

  it("ignores completed tasks even if overdue", () => {
    const task = makeTask({ id: "t1", dueDate: isoDaysFromNow(-5), done: true });

    const alerts = computeAlerts({ tasks: [task], pregnancies: [], puppies: [], dogs: [], now: NOW });

    expect(alerts).toHaveLength(0);
  });

  it("prefers dogId, then litterId, then clientId for the link", () => {
    const withDog = makeTask({ id: "t1", dueDate: isoDaysFromNow(-1), dogId: "d1", litterId: "l1" });
    const withLitter = makeTask({ id: "t2", dueDate: isoDaysFromNow(-1), litterId: "l1", clientId: "c1" });
    const withClient = makeTask({ id: "t3", dueDate: isoDaysFromNow(-1), clientId: "c1" });
    const withNone = makeTask({ id: "t4", dueDate: isoDaysFromNow(-1) });

    const alerts = computeAlerts({
      tasks: [withDog, withLitter, withClient, withNone],
      pregnancies: [],
      puppies: [],
      dogs: [],
      now: NOW,
    });

    expect(alerts.find((a) => a.id === "task-t1")?.link).toBe("/dogs/d1");
    expect(alerts.find((a) => a.id === "task-t2")?.link).toBe("/litters/l1");
    expect(alerts.find((a) => a.id === "task-t3")?.link).toBe("/clients/c1");
    expect(alerts.find((a) => a.id === "task-t4")?.link).toBeUndefined();
  });
});

describe("computeAlerts — pregnancies", () => {
  const basePregnancy: Pregnancy = {
    id: "p1",
    breedingId: "b1",
    femaleId: "f1",
    expectedBirthDate: isoDaysFromNow(30),
    status: "En cours",
    createdAt: NOW.toISOString(),
    updatedAt: NOW.toISOString(),
  };

  it("flags a pending ultrasound with no result", () => {
    const dog = makeDog({ id: "f1", name: "Maya" });

    const alerts = computeAlerts({
      tasks: [],
      pregnancies: [{ ...basePregnancy, ultrasoundDate: isoDaysFromNow(2) }],
      puppies: [],
      dogs: [dog],
      now: NOW,
    });

    expect(
      alerts.some((a) => a.message === "Échographie à prévoir pour Maya"),
    ).toBe(true);
  });

  it("ignores finished or interrupted pregnancies", () => {
    const alerts = computeAlerts({
      tasks: [],
      pregnancies: [
        { ...basePregnancy, status: "Terminée", ultrasoundDate: isoDaysFromNow(-10) },
        { ...basePregnancy, id: "p2", status: "Interrompue" },
      ],
      puppies: [],
      dogs: [],
      now: NOW,
    });

    expect(alerts).toHaveLength(0);
  });
});

describe("computeAlerts — puppies", () => {
  const basePuppy: Puppy = {
    id: "pup1",
    litterId: "l1",
    identifier: "Chiot 1",
    sex: "Mâle",
    status: "Disponible",
    weightHistory: [],
    vaccinations: [],
    dewormings: [],
    socialization: [],
    createdAt: NOW.toISOString(),
    updatedAt: NOW.toISOString(),
  };

  it("flags an overdue, undone vaccination", () => {
    const puppy: Puppy = {
      ...basePuppy,
      vaccinations: [{ id: "v1", label: "Vaccin", date: isoDaysFromNow(-3), done: false }],
    };

    const alerts = computeAlerts({ tasks: [], pregnancies: [], puppies: [puppy], dogs: [], now: NOW });

    expect(alerts).toHaveLength(1);
    expect(alerts[0].message).toBe("Vaccin en attente : Chiot 1");
    expect(alerts[0].link).toBe("/litters/l1");
  });

  it("ignores completed vaccinations and dewormings", () => {
    const puppy: Puppy = {
      ...basePuppy,
      vaccinations: [{ id: "v1", label: "Vaccin", date: isoDaysFromNow(-3), done: true }],
      dewormings: [{ id: "d1", label: "Vermifuge", date: isoDaysFromNow(-3), done: true }],
    };

    const alerts = computeAlerts({ tasks: [], pregnancies: [], puppies: [puppy], dogs: [], now: NOW });

    expect(alerts).toHaveLength(0);
  });
});

describe("computeAlerts — health records", () => {
  const baseRecord: HealthRecord = {
    id: "h1",
    dogId: "d1",
    type: "Vaccination",
    title: "Rappel annuel",
    date: isoDaysFromNow(-2),
    done: false,
    createdAt: NOW.toISOString(),
    updatedAt: NOW.toISOString(),
  };

  it("flags an overdue health record and resolves the dog name", () => {
    const dog = makeDog({ id: "d1", name: "Max" });

    const alerts = computeAlerts({
      tasks: [],
      pregnancies: [],
      puppies: [],
      dogs: [dog],
      healthRecords: [baseRecord],
      now: NOW,
    });

    expect(alerts).toHaveLength(1);
    expect(alerts[0].message).toBe("Vaccination en attente : Max");
    expect(alerts[0].severity).toBe("overdue");
  });

  it("falls back to the record title when the dog is missing", () => {
    const alerts = computeAlerts({
      tasks: [],
      pregnancies: [],
      puppies: [],
      dogs: [],
      healthRecords: [baseRecord],
      now: NOW,
    });

    expect(alerts[0].message).toBe("Vaccination en attente : Rappel annuel");
  });
});

describe("computeAlerts — backup reminder", () => {
  it("is omitted entirely when lastBackupAt is not provided", () => {
    const alerts = computeAlerts({ tasks: [], pregnancies: [], puppies: [], dogs: [], now: NOW });

    expect(alerts.find((a) => a.id === "backup-reminder")).toBeUndefined();
  });

  it("warns with 'soon' severity when no backup has ever been made", () => {
    const alerts = computeAlerts({
      tasks: [],
      pregnancies: [],
      puppies: [],
      dogs: [],
      lastBackupAt: null,
      now: NOW,
    });

    const reminder = alerts.find((a) => a.id === "backup-reminder");
    expect(reminder?.severity).toBe("soon");
    expect(reminder?.message).toBe("Aucune sauvegarde n'a encore été effectuée");
  });

  it("becomes overdue once the last backup is older than 14 days", () => {
    const oldBackup = new Date(NOW);
    oldBackup.setDate(oldBackup.getDate() - 20);

    const alerts = computeAlerts({
      tasks: [],
      pregnancies: [],
      puppies: [],
      dogs: [],
      lastBackupAt: oldBackup.toISOString(),
      now: NOW,
    });

    const reminder = alerts.find((a) => a.id === "backup-reminder");
    expect(reminder?.severity).toBe("overdue");
  });

  it("stays silent for a recent backup", () => {
    const recentBackup = new Date(NOW);
    recentBackup.setDate(recentBackup.getDate() - 2);

    const alerts = computeAlerts({
      tasks: [],
      pregnancies: [],
      puppies: [],
      dogs: [],
      lastBackupAt: recentBackup.toISOString(),
      now: NOW,
    });

    expect(alerts.find((a) => a.id === "backup-reminder")).toBeUndefined();
  });
});

describe("computeAlerts — sorting", () => {
  it("ranks overdue before soon, then by date", () => {
    const soonEarlier = makeTask({ id: "t1", title: "Soon earlier", dueDate: isoDaysFromNow(2) });
    const soonLater = makeTask({ id: "t2", title: "Soon later", dueDate: isoDaysFromNow(6) });
    const overdue = makeTask({ id: "t3", title: "Overdue", dueDate: isoDaysFromNow(-1) });

    const alerts = computeAlerts({
      tasks: [soonLater, soonEarlier, overdue],
      pregnancies: [],
      puppies: [],
      dogs: [],
      now: NOW,
    });

    expect(alerts.map((a) => a.id)).toEqual(["task-t3", "task-t1", "task-t2"]);
  });
});
