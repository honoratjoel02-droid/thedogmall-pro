import { useState } from "react";

import type { GeneticTest } from "../../../types/models/geneticTest";
import { useDeleteGeneticTest } from "../../../hooks/useGeneticTests";

import { Button } from "../../ui/button";
import ConfirmDialog from "../../ui/ConfirmDialog";

type Props = {
  test: GeneticTest;
};

export default function DeleteGeneticTestDialog({ test }: Props) {
  const [open, setOpen] = useState(false);

  const deleteTest = useDeleteGeneticTest();

  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        Supprimer
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title={`Supprimer "${test.testName}" ?`}
        description="Cette action est définitive."
        confirmLabel="Supprimer"
        onConfirm={() => deleteTest.mutate({ id: test.id, dogId: test.dogId })}
      />
    </>
  );
}
