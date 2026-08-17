import { useState } from "react";

import type { DogTitle } from "../../../types/models/dogTitle";

import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

import DogTitleForm from "./DogTitleForm";

type Props = {
  title: DogTitle;
};

export default function EditDogTitleDialog({ title }: Props) {
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
          <DialogTitle>Modifier le titre</DialogTitle>
        </DialogHeader>

        <DogTitleForm
          dogId={title.dogId}
          title={title}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
