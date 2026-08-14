import { useState } from "react";

import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

import GeneticTestForm from "./GeneticTestForm";

type Props = {
  dogId: string;
};

export default function AddGeneticTestDialog({ dogId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => <Button {...props}>+ Ajouter un test</Button>}
      />

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nouveau test génétique / dépistage</DialogTitle>
        </DialogHeader>

        <GeneticTestForm dogId={dogId} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
