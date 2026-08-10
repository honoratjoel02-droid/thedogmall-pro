import { CalendarDays } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import AddTaskDialog from "../components/calendar/AddTaskDialog";
import TaskList from "../components/calendar/TaskList";
import AlertsList from "../components/calendar/AlertsList";
import JournalList from "../components/calendar/JournalList";

import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

import { useTasks } from "../hooks/useTasks";
import { usePregnancies } from "../hooks/usePregnancies";
import { usePuppies } from "../hooks/usePuppies";
import { useDogs } from "../hooks/useDogs";
import { useBreedings } from "../hooks/useBreedings";
import { useLitters } from "../hooks/useLitters";
import { useClients } from "../hooks/useClients";
import { useExpenses } from "../hooks/useExpenses";
import { useIncomes } from "../hooks/useIncomes";

import { computeAlerts } from "../lib/alerts";
import { computeJournal } from "../lib/journal";

export default function Calendar() {
  const { data: tasks = [], isLoading: loadingTasks } = useTasks();
  const { data: pregnancies = [] } = usePregnancies();
  const { data: puppies = [] } = usePuppies();
  const { data: dogs = [] } = useDogs();
  const { data: breedings = [] } = useBreedings();
  const { data: litters = [] } = useLitters();
  const { data: clients = [] } = useClients();
  const { data: expenses = [] } = useExpenses();
  const { data: incomes = [] } = useIncomes();

  const alerts = computeAlerts({ tasks, pregnancies, puppies, dogs });

  const journal = computeJournal({
    dogs,
    breedings,
    litters,
    puppies,
    clients,
    expenses,
    incomes,
  });

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold sm:text-4xl">
            <CalendarDays className="size-8 text-primary" />
            Calendrier
          </h1>

          <p className="text-muted-foreground">
            Alertes, tâches et journal d'élevage.
          </p>
        </div>

        <Tabs defaultValue="alerts">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="overflow-x-auto">
              <TabsList>
                <TabsTrigger value="alerts" className="gap-1.5">
                  Alertes
                  {alerts.length > 0 && (
                    <Badge variant="destructive" className="ml-1">
                      {alerts.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="tasks">Tâches</TabsTrigger>
                <TabsTrigger value="journal">Journal</TabsTrigger>
              </TabsList>
            </div>

            <AddTaskDialog />
          </div>

          <TabsContent value="alerts">
            <AlertsList alerts={alerts} />
          </TabsContent>

          <TabsContent value="tasks">
            <TaskList tasks={tasks} isLoading={loadingTasks} />
          </TabsContent>

          <TabsContent value="journal">
            <JournalList entries={journal} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
