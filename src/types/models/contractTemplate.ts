// src/types/models/contractTemplate.ts

export interface ContractClause {
  id: string;

  title: string;

  content: string;
}

export interface ContractTemplate {
  id: string;

  name: string;

  clauses: ContractClause[];

  isDefault: boolean;

  createdAt: string;

  updatedAt: string;
}
