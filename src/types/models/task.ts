// src/types/models/task.ts

export type TaskCategory =
  | "Vaccination"
  | "Vermifuge"
  | "Rendez-vous"
  | "Appel client"
  | "Administratif"
  | "Autre";

export interface Task {
  id: string;

  title: string;

  dueDate: string;

  category: TaskCategory;

  dogId?: string;

  litterId?: string;

  clientId?: string;

  done: boolean;

  notes?: string;

  createdAt: string;

  updatedAt: string;
}
