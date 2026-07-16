import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

import { Button } from "../../ui/button";

import BreedingForm from "./BreedingForm";

export default function AddBreedingDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ Nouvelle saillie</Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nouvelle saillie</DialogTitle>
        </DialogHeader>

        <BreedingForm />
      </DialogContent>
    </Dialog>
  );
}
