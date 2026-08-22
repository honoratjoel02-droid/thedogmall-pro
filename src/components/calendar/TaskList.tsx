import type { Task } from "../../types/models/task";
import { useUpdateTask } from "../../hooks/useTasks";
import { useDogs } from "../../hooks/useDogs";
import { useLitters } from "../../hooks/useLitters";
import { useClients } from "../../hooks/useClients";

import { ListTodo } from "lucide-react";

import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import EmptyState from "../ui/empty-state";
import LoadingState from "../ui/loading-state";

import EditTaskDialog from "./EditTaskDialog";
import DeleteTaskDialog from "./DeleteTaskDialog";

type Props = {
  tasks: Task[];
  isLoading?: boolean;
};

export default function TaskList({ tasks, isLoading = false }: Props) {
  const updateTask = useUpdateTask();
  const { data: dogs = [] } = useDogs();
  const { data: litters = [] } = useLitters();
  const { data: clients = [] } = useClients();

  if (isLoading) {
    return <LoadingState rows={3} />;
  }

  if (tasks.length === 0) {
    return <EmptyState icon={ListTodo} label="Aucune tâche enregistrée." />;
  }

  const sorted = [...tasks].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;

    return a.dueDate.localeCompare(b.dueDate);
  });

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-3">
      {sorted.map((task) => {
        const linkedTo =
          dogs.find((d) => d.id === task.dogId)?.name ??
          (task.litterId &&
            `Portée du ${new Date(
              litters.find((l) => l.id === task.litterId)?.birthDate ?? "",
            ).toLocaleDateString("fr-FR")}`) ??
          (() => {
            const client = clients.find((c) => c.id === task.clientId);
            return client ? `${client.firstName} ${client.lastName}` : null;
          })();

        const overdue = !task.done && task.dueDate.slice(0, 10) < today;

        return (
          <Card
            key={task.id}
            className={task.done ? "opacity-60" : undefined}
          >
            <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={(e) =>
                    updateTask.mutate({
                      id: task.id,
                      data: { done: e.target.checked },
                    })
                  }
                  className="mt-1 size-4 accent-primary"
                />

                <div className="space-y-1">
                  <p
                    className={
                      task.done
                        ? "font-medium line-through"
                        : "font-medium"
                    }
                  >
                    {task.title}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline">{task.category}</Badge>

                    <span className={overdue ? "text-destructive" : undefined}>
                      {new Date(task.dueDate).toLocaleDateString("fr-FR")}
                    </span>

                    {linkedTo && <span>· {linkedTo}</span>}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <EditTaskDialog task={task} />
                <DeleteTaskDialog task={task} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
