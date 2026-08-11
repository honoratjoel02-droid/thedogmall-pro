import { Wallet } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import FinanceSummary from "../components/finances/FinanceSummary";
import AddExpenseDialog from "../components/finances/AddExpenseDialog";
import AddIncomeDialog from "../components/finances/AddIncomeDialog";
import ExpensesTable from "../components/finances/ExpensesTable";
import IncomesTable from "../components/finances/IncomesTable";
import MonthlyIncomeExpenseChart from "../components/charts/MonthlyIncomeExpenseChart";
import CategoryBreakdownChart from "../components/charts/CategoryBreakdownChart";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

import { useExpenses } from "../hooks/useExpenses";
import { useIncomes } from "../hooks/useIncomes";

import { computeMonthlyTotals, computeExpensesByCategory } from "../lib/financeStats";

export default function Finances() {
  const { data: expenses = [], isLoading: loadingExpenses } = useExpenses();
  const { data: incomes = [], isLoading: loadingIncomes } = useIncomes();

  const monthlyTotals = computeMonthlyTotals(expenses, incomes);
  const categoryTotals = computeExpensesByCategory(expenses);

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

          <TabsContent value="expenses">
            <ExpensesTable expenses={expenses} isLoading={loadingExpenses} />
          </TabsContent>

          <TabsContent value="incomes">
            <IncomesTable incomes={incomes} isLoading={loadingIncomes} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
