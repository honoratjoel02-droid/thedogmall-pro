import { useState } from "react";
import { CalendarDays } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import AddTaskDialog from "../components/calendar/AddTaskDialog";
import TaskList from "../components/calendar/TaskList";
import AlertsList from "../components/calendar/AlertsList";
import JournalList from "../components/calendar/JournalList";
import AddKennelNoteDialog from "../components/calendar/AddKennelNoteDialog";
import KennelNoteList from "../components/calendar/KennelNoteList";

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
import { useHealthRecords } from "../hooks/useHealthRecords";
import { useHeatCycles } from "../hooks/useHeatCycles";
import { useRenewalReminders } from "../hooks/useRenewalReminders";
import { useKennelNotes } from "../hooks/useKennelNotes";
import { useLastBackupAt } from "../hooks/useLastBackupAt";

import { computeAlerts } from "../lib/alerts";
import { computeJournal } from "../lib/journal";

export default function Calendar() {
  const [activeTab, setActiveTab] = useState("alerts");

  const { data: tasks = [], isLoading: loadingTasks } = useTasks();
  const { data: pregnancies = [] } = usePregnancies();
  const { data: puppies = [] } = usePuppies();
  const { data: dogs = [] } = useDogs();
  const { data: breedings = [] } = useBreedings();
  const { data: litters = [] } = useLitters();
  const { data: clients = [] } = useClients();
  const { data: expenses = [] } = useExpenses();
  const { data: incomes = [] } = useIncomes();
  const { data: healthRecords = [] } = useHealthRecords();
  const { data: heatCycles = [] } = useHeatCycles();
  const { data: renewalReminders = [] } = useRenewalReminders();
  const { data: kennelNotes = [], isLoading: loadingNotes } = useKennelNotes();
  const lastBackupAt = useLastBackupAt();

  const alerts = computeAlerts({
    tasks,
    pregnancies,
    puppies,
    dogs,
    healthRecords,
    heatCycles,
    renewalReminders,
    lastBackupAt,
  });

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
            Alertes, tâches, journal et notes d'élevage.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as string)}>
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
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
            </div>

            {activeTab === "tasks" && <AddTaskDialog />}
            {activeTab === "notes" && <AddKennelNoteDialog />}
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

          <TabsContent value="notes">
            <KennelNoteList notes={kennelNotes} isLoading={loadingNotes} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
