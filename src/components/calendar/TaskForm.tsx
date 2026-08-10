import { useState } from "react";

import type { Task, TaskCategory } from "../../types/models/task";
import { useCreateTask, useUpdateTask } from "../../hooks/useTasks";
import { useDogs } from "../../hooks/useDogs";
import { useLitters } from "../../hooks/useLitters";
import { useClients } from "../../hooks/useClients";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const CATEGORIES: TaskCategory[] = [
  "Vaccination",
  "Vermifuge",
  "Rendez-vous",
  "Appel client",
  "Administratif",
  "Autre",
];

type Props = {
  task?: Task;
  onSuccess?: () => void;
};

export default function TaskForm({ task, onSuccess }: Props) {
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const { data: dogs = [] } = useDogs();
  const { data: litters = [] } = useLitters();
  const { data: clients = [] } = useClients();

  const [title, setTitle] = useState(task?.title ?? "");
  const [dueDate, setDueDate] = useState(
    task
      ? task.dueDate.slice(0, 10)
      : new Date().toISOString().slice(0, 10),
  );
  const [category, setCategory] = useState<TaskCategory>(
    task?.category ?? "Autre",
  );
  const [dogId, setDogId] = useState(task?.dogId ?? "");
  const [litterId, setLitterId] = useState(task?.litterId ?? "");
  const [clientId, setClientId] = useState(task?.clientId ?? "");
  const [notes, setNotes] = useState(task?.notes ?? "");
  const [error, setError] = useState("");

  const isPending = createTask.isPending || updateTask.isPending;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Le titre est obligatoire.");
      return;
    }

    setError("");

    const data = {
      title: title.trim(),
      dueDate: new Date(dueDate).toISOString(),
      category,
      dogId: dogId || undefined,
      litterId: litterId || undefined,
      clientId: clientId || undefined,
      notes: notes || undefined,
    };

    if (task) {
      await updateTask.mutateAsync({
        id: task.id,
        data: { ...data, done: task.done },
      });
    } else {
      await createTask.mutateAsync({ ...data, done: false });

      setTitle("");
      setNotes("");
    }

    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Titre</Label>

        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex : Vacciner Maya, Appeler M. Dupont..."
        />

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="dueDate">Échéance</Label>

          <Input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Catégorie</Label>

          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as TaskCategory)}
            className="w-full rounded-md border bg-background px-3 py-2"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="dogId">Chien lié</Label>

          <select
            id="dogId"
            value={dogId}
            onChange={(e) => setDogId(e.target.value)}
            className="w-full rounded-md border bg-background px-3 py-2"
          >
            <option value="">Aucun</option>

            {dogs.map((dog) => (
              <option key={dog.id} value={dog.id}>
                {dog.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="litterId">Portée liée</Label>

          <select
            id="litterId"
            value={litterId}
            onChange={(e) => setLitterId(e.target.value)}
            className="w-full rounded-md border bg-background px-3 py-2"
          >
            <option value="">Aucune</option>

            {litters.map((litter) => (
              <option key={litter.id} value={litter.id}>
                Portée du{" "}
                {new Date(litter.birthDate).toLocaleDateString("fr-FR")}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="clientId">Client lié</Label>

          <select
            id="clientId"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="w-full rounded-md border bg-background px-3 py-2"
          >
            <option value="">Aucun</option>

            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.firstName} {client.lastName}
              </option>
            ))}
          </select>
        </div>
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
            : task
              ? "Enregistrer les modifications"
              : "Ajouter la tâche"}
        </Button>
      </div>
    </form>
  );
}
