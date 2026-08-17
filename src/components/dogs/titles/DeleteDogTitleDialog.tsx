import { useState } from "react";

import type { DogTitle } from "../../../types/models/dogTitle";
import { useDeleteDogTitle } from "../../../hooks/useDogTitles";

import { Button } from "../../ui/button";
import ConfirmDialog from "../../ui/ConfirmDialog";

type Props = {
  title: DogTitle;
};

export default function DeleteDogTitleDialog({ title }: Props) {
  const [open, setOpen] = useState(false);

  const deleteTitle = useDeleteDogTitle();

  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        Supprimer
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title={`Supprimer "${title.name}" ?`}
        description="Cette action est définitive."
        confirmLabel="Supprimer"
        onConfirm={() => deleteTitle.mutate({ id: title.id, dogId: title.dogId })}
      />
    </>
  );
}
