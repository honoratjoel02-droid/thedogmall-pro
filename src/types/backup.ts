export interface BackupData {
  app: "TheDogMall Pro";
  version: string;
  createdAt: string;

  data: {
    dogs: unknown[];
    breedings: unknown[];
    pregnancies: unknown[];
    litters: unknown[];
    puppies: unknown[];
    clients: unknown[];
    expenses: unknown[];
    incomes: unknown[];
    tasks: unknown[];
    healthRecords: unknown[];
    sales: unknown[];
    kennelSettings: Record<string, unknown> | null;
  };
}
