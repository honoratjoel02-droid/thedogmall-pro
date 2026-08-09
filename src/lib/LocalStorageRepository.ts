export class LocalStorageRepository<
  T extends {
    id: string;
    createdAt: string;
    updatedAt: string;
  },
> {
  protected items: T[] = [];

  constructor(protected readonly storageKey: string) {
    this.load();
  }

  protected load() {
    const raw = localStorage.getItem(this.storageKey);

    if (!raw) {
      this.items = [];
      return;
    }

    try {
      this.items = JSON.parse(raw);
    } catch {
      this.items = [];
    }
  }

  protected save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  async getAll(): Promise<T[]> {
    return [...this.items];
  }

  async getById(id: string): Promise<T | undefined> {
    return this.items.find((item) => item.id === id);
  }

  async create(data: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T> {
    const item = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as T;

    this.items.push(item);

    this.save();

    return item;
  }

  async update(id: string, data: Partial<T>): Promise<T | undefined> {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      return undefined;
    }

    this.items[index] = {
      ...this.items[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.save();

    return this.items[index];
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id);

    this.save();
  }
}
