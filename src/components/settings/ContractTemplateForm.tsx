import { useState } from "react";

import type {
  ContractClause,
  ContractTemplate,
} from "../../types/models/contractTemplate";
import { DEFAULT_CLAUSES } from "../../lib/contractClauses";
import {
  useCreateContractTemplate,
  useUpdateContractTemplate,
} from "../../hooks/useContractTemplates";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Props = {
  template?: ContractTemplate;
  onSuccess?: () => void;
};

function cloneDefaultClauses(): ContractClause[] {
  return DEFAULT_CLAUSES.map((clause) => ({
    ...clause,
    id: crypto.randomUUID(),
  }));
}

export default function ContractTemplateForm({ template, onSuccess }: Props) {
  const createTemplate = useCreateContractTemplate();
  const updateTemplate = useUpdateContractTemplate();

  const [name, setName] = useState(template?.name ?? "");
  const [isDefault, setIsDefault] = useState(template?.isDefault ?? false);
  const [clauses, setClauses] = useState<ContractClause[]>(
    template?.clauses ?? cloneDefaultClauses(),
  );
  const [error, setError] = useState("");

  const isPending = createTemplate.isPending || updateTemplate.isPending;

  function updateClause(id: string, data: Partial<ContractClause>) {
    setClauses((prev) =>
      prev.map((clause) =>
        clause.id === id ? { ...clause, ...data } : clause,
      ),
    );
  }

  function addClause() {
    setClauses((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title: "", content: "" },
    ]);
  }

  function removeClause(id: string) {
    setClauses((prev) => prev.filter((clause) => clause.id !== id));
  }

  function moveClause(id: string, direction: -1 | 1) {
    setClauses((prev) => {
      const index = prev.findIndex((clause) => clause.id === id);
      const target = index + direction;

      if (index === -1 || target < 0 || target >= prev.length) return prev;

      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];

      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim()) {
      setError("Le nom du modèle est obligatoire.");
      return;
    }

    if (clauses.some((clause) => !clause.title.trim())) {
      setError("Chaque clause doit avoir un titre.");
      return;
    }

    setError("");

    const data = {
      name: name.trim(),
      isDefault,
      clauses: clauses.map((clause) => ({
        ...clause,
        title: clause.title.trim(),
        content: clause.content.trim(),
      })),
    };

    if (template) {
      await updateTemplate.mutateAsync({ id: template.id, data });
    } else {
      await createTemplate.mutateAsync(data);

      setName("");
      setIsDefault(false);
      setClauses(cloneDefaultClauses());
    }

    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nom du modèle</Label>

        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex : Contrat standard, Contrat reproducteur..."
        />

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={isDefault}
          onChange={(e) => setIsDefault(e.target.checked)}
          className="size-4 accent-primary"
        />
        Utiliser comme modèle par défaut
      </label>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Clauses (articles additionnels du contrat)</Label>

          <Button type="button" variant="outline" size="sm" onClick={addClause}>
            + Ajouter une clause
          </Button>
        </div>

        {clauses.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Aucune clause. Le contrat ne comportera que les articles fixes
            (objet, identification, prix).
          </p>
        )}

        {clauses.map((clause, index) => (
          <div key={clause.id} className="space-y-2 rounded-md border p-3">
            <div className="flex items-center gap-2">
              <Input
                value={clause.title}
                onChange={(e) =>
                  updateClause(clause.id, { title: e.target.value })
                }
                placeholder="Titre de la clause"
                className="flex-1"
              />

              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={index === 0}
                onClick={() => moveClause(clause.id, -1)}
              >
                ↑
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={index === clauses.length - 1}
                onClick={() => moveClause(clause.id, 1)}
              >
                ↓
              </Button>

              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeClause(clause.id)}
              >
                Retirer
              </Button>
            </div>

            <textarea
              rows={3}
              value={clause.content}
              onChange={(e) =>
                updateClause(clause.id, { content: e.target.value })
              }
              placeholder="Texte de la clause"
              className="w-full rounded-md border bg-background px-3 py-2"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? "Enregistrement..."
            : template
              ? "Enregistrer les modifications"
              : "Créer le modèle"}
        </Button>
      </div>
    </form>
  );
}
