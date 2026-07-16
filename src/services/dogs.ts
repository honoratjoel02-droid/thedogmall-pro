// src/services/dogs.ts

import type { Dog } from "../types/dog";
import { mockDogs } from "../data/mockDogs";

const STORAGE_KEY = "thedogmall.dogs";

class DogsService {
  private dogs: Dog[] = [];

  constructor() {
    this.load();
  }

  private load() {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      this.dogs = JSON.parse(saved);
      return;
    }

    this.dogs = [...mockDogs];
    this.save();
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.dogs));
  }

  async getAll(): Promise<Dog[]> {
    return [...this.dogs];
  }

  async getById(id: string): Promise<Dog | undefined> {
    return this.dogs.find((dog) => dog.id === id);
  }

  async create(dog: Omit<Dog, "id">): Promise<Dog> {
    const newDog: Dog = {
      ...dog,
      id: crypto.randomUUID(),
    };

    this.dogs.push(newDog);

    this.save();

    return newDog;
  }

  async update(updatedDog: Dog): Promise<void> {
    this.dogs = this.dogs.map((dog) =>
      dog.id === updatedDog.id ? updatedDog : dog,
    );

    this.save();
  }

  async delete(id: string): Promise<void> {
    this.dogs = this.dogs.filter((dog) => dog.id !== id);

    this.save();
  }
}

export const dogsService = new DogsService();
