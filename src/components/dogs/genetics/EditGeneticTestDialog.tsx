import { useState } from "react";

import type { GeneticTest } from "../../../types/models/geneticTest";

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
  test: GeneticTest;
};

export default function EditGeneticTestDialog({ test }: Props) {
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
          <DialogTitle>Modifier le test</DialogTitle>
        </DialogHeader>

        <GeneticTestForm
          dogId={test.dogId}
          test={test}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
