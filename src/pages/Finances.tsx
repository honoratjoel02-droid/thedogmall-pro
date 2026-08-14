import { Download, Wallet } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import FinanceSummary from "../components/finances/FinanceSummary";
import AddExpenseDialog from "../components/finances/AddExpenseDialog";
import AddIncomeDialog from "../components/finances/AddIncomeDialog";
import ExpensesTable from "../components/finances/ExpensesTable";
import IncomesTable from "../components/finances/IncomesTable";
import MonthlyIncomeExpenseChart from "../components/charts/MonthlyIncomeExpenseChart";
import CategoryBreakdownChart from "../components/charts/CategoryBreakdownChart";

import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

import { useExpenses } from "../hooks/useExpenses";
import { useIncomes } from "../hooks/useIncomes";

import { computeMonthlyTotals, computeExpensesByCategory } from "../lib/financeStats";
import { downloadCsv, toCsv } from "../lib/csv";
import type { Expense } from "../types/models/expense";
import type { Income } from "../types/models/income";

const EXPENSE_COLUMNS = [
  { header: "Titre", accessor: (e: Expense) => e.title },
  { header: "Montant (FCFA)", accessor: (e: Expense) => e.amount },
  { header: "Catégorie", accessor: (e: Expense) => e.category },
  {
    header: "Date",
    accessor: (e: Expense) => new Date(e.expenseDate).toLocaleDateString("fr-FR"),
  },
  { header: "Description", accessor: (e: Expense) => e.description },
];

const INCOME_COLUMNS = [
  { header: "Titre", accessor: (i: Income) => i.title },
  { header: "Montant (FCFA)", accessor: (i: Income) => i.amount },
  { header: "Catégorie", accessor: (i: Income) => i.category },
  {
    header: "Date",
    accessor: (i: Income) => new Date(i.incomeDate).toLocaleDateString("fr-FR"),
  },
  { header: "Description", accessor: (i: Income) => i.description },
];

export default function Finances() {
  const { data: expenses = [], isLoading: loadingExpenses } = useExpenses();
  const { data: incomes = [], isLoading: loadingIncomes } = useIncomes();

  const monthlyTotals = computeMonthlyTotals(expenses, incomes);
  const categoryTotals = computeExpensesByCategory(expenses);

  function handleExportExpenses() {
    downloadCsv("depenses.csv", toCsv(expenses, EXPENSE_COLUMNS));
  }

  function handleExportIncomes() {
    downloadCsv("recettes.csv", toCsv(incomes, INCOME_COLUMNS));
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold sm:text-4xl">
            <Wallet className="size-8 text-primary" />
            Finances
          </h1>

          <p className="text-muted-foreground">
            Suivez les dépenses, les recettes et la rentabilité de votre
            élevage.
          </p>
        </div>

        <FinanceSummary expenses={expenses} incomes={incomes} />

        <div className="grid gap-6 lg:grid-cols-2">
          <MonthlyIncomeExpenseChart data={monthlyTotals} />
          <CategoryBreakdownChart data={categoryTotals} />
        </div>

        <Tabs defaultValue="expenses">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TabsList>
              <TabsTrigger value="expenses">Dépenses</TabsTrigger>
              <TabsTrigger value="incomes">Recettes</TabsTrigger>
            </TabsList>

            <div className="flex flex-wrap gap-2">
              <AddExpenseDialog />
              <AddIncomeDialog />
            </div>
          </div>

          <TabsContent value="expenses" className="space-y-4">
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportExpenses}
                disabled={expenses.length === 0}
              >
                <Download className="mr-1.5 size-4" />
                Exporter en CSV
              </Button>
            </div>

            <ExpensesTable expenses={expenses} isLoading={loadingExpenses} />
          </TabsContent>

          <TabsContent value="incomes" className="space-y-4">
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportIncomes}
                disabled={incomes.length === 0}
              >
                <Download className="mr-1.5 size-4" />
                Exporter en CSV
              </Button>
            </div>

            <IncomesTable incomes={incomes} isLoading={loadingIncomes} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
