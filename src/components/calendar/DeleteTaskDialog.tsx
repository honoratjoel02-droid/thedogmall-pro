import { useState } from "react";

import type { Task } from "../../types/models/task";
import { useDeleteTask } from "../../hooks/useTasks";

import { Button } from "../ui/button";
import ConfirmDialog from "../ui/ConfirmDialog";

type Props = {
  task: Task;
};

export default function DeleteTaskDialog({ task }: Props) {
  const [open, setOpen] = useState(false);

  const deleteTask = useDeleteTask();

  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        Supprimer
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title={`Supprimer "${task.title}" ?`}
        description="Cette action est définitive."
        confirmLabel="Supprimer"
        onConfirm={() => deleteTask.mutate(task.id)}
      />
    </>
  );
}
