// src/services/tasks.ts

import type { Task } from "../types/models/task";

const STORAGE_KEY = "thedogmall.tasks";

class TasksService {
  private tasks: Task[] = [];

  constructor() {
    this.load();
  }

  private load() {
    const saved = localStorage.getItem(STORAGE_KEY);

    this.tasks = saved ? JSON.parse(saved) : [];
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
  }

  async getAll(): Promise<Task[]> {
    return [...this.tasks];
  }

  async create(
    task: Omit<Task, "id" | "createdAt" | "updatedAt">,
  ): Promise<Task> {
    const now = new Date().toISOString();

    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    this.tasks.push(newTask);

    this.save();

    return newTask;
  }

  async update(id: string, data: Partial<Task>): Promise<Task | undefined> {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      return undefined;
    }

    this.tasks[index] = {
      ...this.tasks[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.save();

    return this.tasks[index];
  }

  async delete(id: string): Promise<void> {
    this.tasks = this.tasks.filter((task) => task.id !== id);

    this.save();
  }
}

export const tasksService = new TasksService();
