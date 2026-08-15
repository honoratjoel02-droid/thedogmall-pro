import { useState } from "react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import AnnualGoalForm from "./AnnualGoalForm";

export default function AddAnnualGoalDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => <Button {...props}>+ Nouvel objectif annuel</Button>}
      />

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nouvel objectif annuel</DialogTitle>
        </DialogHeader>

        <AnnualGoalForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
