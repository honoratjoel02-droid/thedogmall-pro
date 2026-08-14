import { useState } from "react";

import type {
  GeneticTest,
  GeneticTestResult,
} from "../../../types/models/geneticTest";
import {
  useCreateGeneticTest,
  useUpdateGeneticTest,
} from "../../../hooks/useGeneticTests";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

const RESULTS: GeneticTestResult[] = ["Normal", "Porteur", "Atteint", "En attente"];

type Props = {
  dogId: string;
  test?: GeneticTest;
  onSuccess?: () => void;
};

export default function GeneticTestForm({ dogId, test, onSuccess }: Props) {
  const createTest = useCreateGeneticTest();
  const updateTest = useUpdateGeneticTest();

  const [testName, setTestName] = useState(test?.testName ?? "");
  const [testDate, setTestDate] = useState(
    test ? test.testDate.slice(0, 10) : new Date().toISOString().slice(0, 10),
  );
  const [result, setResult] = useState<GeneticTestResult>(
    test?.result ?? "En attente",
  );
  const [laboratory, setLaboratory] = useState(test?.laboratory ?? "");
  const [notes, setNotes] = useState(test?.notes ?? "");
  const [error, setError] = useState("");

  const isPending = createTest.isPending || updateTest.isPending;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!testName.trim()) {
      setError("Le nom du test est obligatoire.");
      return;
    }

    setError("");

    const data = {
      dogId,
      testName: testName.trim(),
      testDate: new Date(testDate).toISOString(),
      result,
      laboratory: laboratory || undefined,
      notes: notes || undefined,
    };

    if (test) {
      await updateTest.mutateAsync({ id: test.id, data });
    } else {
      await createTest.mutateAsync(data);

      setTestName("");
      setLaboratory("");
      setNotes("");
    }

    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="testName">Nom du test</Label>

        <Input
          id="testName"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          placeholder="Ex : Dysplasie des hanches (score OFA), PRA-prcd..."
        />

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="testDate">Date du test</Label>

          <Input
            id="testDate"
            type="date"
            value={testDate}
            onChange={(e) => setTestDate(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="result">Résultat</Label>

          <select
            id="result"
            value={result}
            onChange={(e) => setResult(e.target.value as GeneticTestResult)}
            className="w-full rounded-md border bg-background px-3 py-2"
          >
            {RESULTS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="laboratory">Laboratoire (optionnel)</Label>

        <Input
          id="laboratory"
          value={laboratory}
          onChange={(e) => setLaboratory(e.target.value)}
          placeholder="Ex : Antagene, Genoscoper..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>

        <textarea
          id="notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full rounded-md border bg-background px-3 py-2"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? "Enregistrement..."
            : test
              ? "Enregistrer les modifications"
              : "Ajouter"}
        </Button>
      </div>
    </form>
  );
}
