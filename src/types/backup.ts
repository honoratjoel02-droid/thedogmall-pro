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
    heatCycles: unknown[];
    sales: unknown[];
    waitlist: unknown[];
    clientInteractions: unknown[];
    kennelSettings: Record<string, unknown> | null;
    dogPhotos: unknown[];
    dogDocuments: unknown[];
    litterPhotos: unknown[];
    geneticTests: unknown[];
    annualGoals: unknown[];
    renewalReminders: unknown[];
    kennelNotes: unknown[];
    contractTemplates: unknown[];
  };
}
