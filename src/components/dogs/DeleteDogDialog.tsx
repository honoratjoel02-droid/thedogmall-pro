import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Dog } from "../../types/dog";

import { useDeleteDog } from "../../hooks/useDogs";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type Props = {
  dog: Dog;
  redirectAfterDelete?: boolean;
};

export default function DeleteDogDialog({
  dog,
  redirectAfterDelete = false,
}: Props) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const deleteDog = useDeleteDog();

  async function handleDelete() {
    await deleteDog.mutateAsync(dog.id);

    setOpen(false);

    if (redirectAfterDelete) {
      navigate("/dogs");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => (
          <Button {...props} variant="destructive" className="flex-1">
            Supprimer
          </Button>
        )}
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer {dog.name} ?</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Cette action est définitive.
        </p>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Annuler
          </Button>

          <Button variant="destructive" onClick={handleDelete}>
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
