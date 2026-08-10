import { useState } from "react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import TaskForm from "./TaskForm";

export default function AddTaskDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => <Button {...props}>+ Nouvelle tâche</Button>}
      />

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nouvelle tâche</DialogTitle>
        </DialogHeader>

        <TaskForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
