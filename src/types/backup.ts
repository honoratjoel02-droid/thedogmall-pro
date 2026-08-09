export interface BackupData {
  app: "TheDogMall Pro";
  version: string;
  createdAt: string;

  data: {
    dogs: unknown[];
    breedings: unknown[];
    litters: unknown[];
    clients: unknown[];
    settings: Record<string, unknown>;
  };
}
