// src/services/dogs.ts

import type { Dog } from "../types/dog";
import { mockDogs } from "../data/mockDogs";

class DogsService {
  private dogs: Dog[] = [...mockDogs];

  getAll(): Dog[] {
    return this.dogs;
  }

  getById(id: string): Dog | undefined {
    return this.dogs.find((dog) => dog.id === id);
  }

  create(dog: Dog) {
    this.dogs.push(dog);
  }

  update(updatedDog: Dog) {
    this.dogs = this.dogs.map((dog) =>
      dog.id === updatedDog.id ? updatedDog : dog,
    );
  }

  delete(id: string) {
    this.dogs = this.dogs.filter((dog) => dog.id !== id);
  }
}

export const dogsService = new DogsService();
