import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";

import BreedingForm from "./BreedingForm";

import { useCreateBreeding } from "../../../hooks/useBreedings";
import type { Breeding } from "../../../types/models/breeding";

export default function AddBreedingDialog() {
  const [open, setOpen] = useState(false);

  const createBreeding = useCreateBreeding();

  function handleSubmit(
    breeding: Omit<Breeding, "id" | "createdAt" | "updatedAt">,
  ) {
    createBreeding.mutate(breeding, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>+ Nouvelle saillie</DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nouvelle saillie</DialogTitle>
        </DialogHeader>

        <BreedingForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
