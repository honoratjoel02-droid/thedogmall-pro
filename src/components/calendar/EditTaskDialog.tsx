import { useState } from "react";

import type { Task } from "../../types/models/task";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import TaskForm from "./TaskForm";

type Props = {
  task: Task;
};

export default function EditTaskDialog({ task }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => (
          <Button {...props} variant="outline" size="sm">
            Modifier
          </Button>
        )}
      />

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Modifier la tâche</DialogTitle>
        </DialogHeader>

        <TaskForm task={task} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
