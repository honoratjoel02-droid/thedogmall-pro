import { Wallet } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import FinanceSummary from "../components/finances/FinanceSummary";
import AddExpenseDialog from "../components/finances/AddExpenseDialog";
import AddIncomeDialog from "../components/finances/AddIncomeDialog";
import ExpensesTable from "../components/finances/ExpensesTable";
import IncomesTable from "../components/finances/IncomesTable";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

import { useExpenses } from "../hooks/useExpenses";
import { useIncomes } from "../hooks/useIncomes";

export default function Finances() {
  const { data: expenses = [], isLoading: loadingExpenses } = useExpenses();
  const { data: incomes = [], isLoading: loadingIncomes } = useIncomes();

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
