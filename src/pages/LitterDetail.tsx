import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import AddPuppyDialog from "../components/dogs/litters/AddPuppyDialog";
import PuppyCard from "../components/dogs/litters/PuppyCard";
import EditLitterDialog from "../components/dogs/litters/EditLitterDialog";
import DeleteLitterDialog from "../components/dogs/litters/DeleteLitterDialog";
import FinanceSummary from "../components/finances/FinanceSummary";
import ExpensesTable from "../components/finances/ExpensesTable";
import IncomesTable from "../components/finances/IncomesTable";
import AddExpenseDialog from "../components/finances/AddExpenseDialog";
import AddIncomeDialog from "../components/finances/AddIncomeDialog";

import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";

import { useLitter } from "../hooks/useLitters";
import { usePuppiesByLitter } from "../hooks/usePuppies";
import { useDogs } from "../hooks/useDogs";
import { useExpenses } from "../hooks/useExpenses";
import { useIncomes } from "../hooks/useIncomes";

export default function LitterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: litter, isLoading } = useLitter(id);
  const { data: puppies = [] } = usePuppiesByLitter(id);
  const { data: dogs = [] } = useDogs();
  const { data: allExpenses = [] } = useExpenses();
  const { data: allIncomes = [] } = useIncomes();

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex h-96 items-center justify-center">
          Chargement...
        </div>
      </MainLayout>
    );
  }

  if (!litter) {
    return (
      <MainLayout>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Portée introuvable</h1>
          <Button onClick={() => navigate("/litters")}>Retour</Button>
        </div>
      </MainLayout>
    );
  }

  const female = dogs.find((dog) => dog.id === litter.femaleId);
  const male = dogs.find((dog) => dog.id === litter.maleId);

  const available = puppies.filter((p) => p.status === "Disponible").length;
  const reserved = puppies.filter((p) => p.status === "Réservé").length;
  const sold = puppies.filter((p) => p.status === "Vendu").length;

  const litterExpenses = allExpenses.filter((e) => e.litterId === litter.id);
  const litterIncomes = allIncomes.filter((i) => i.litterId === litter.id);

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/litters")}>
            ← Retour
          </Button>

          <div className="flex gap-2">
            <EditLitterDialog litter={litter} />

            <DeleteLitterDialog litter={litter} redirectAfterDelete />
          </div>
        </div>

        <Card>
          <CardContent className="space-y-4 p-6">
            <h1 className="text-3xl font-bold">
              {female?.name ?? "Femelle inconnue"} ❤️{" "}
              {male?.name ?? "Mâle inconnu"}
            </h1>

            <p className="text-muted-foreground">
              Née le {new Date(litter.birthDate).toLocaleDateString("fr-FR")}
            </p>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                {litter.puppiesCount} chiots au total
              </Badge>
              <Badge variant="outline">{available} disponibles</Badge>
              <Badge variant="outline">{reserved} réservés</Badge>
              <Badge variant="outline">{sold} vendus</Badge>
            </div>

            {litter.notes && (
              <p>
                <strong>Notes :</strong> {litter.notes}
              </p>
            )}
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Chiots</h2>

          <AddPuppyDialog litterId={litter.id} />
        </div>

        {puppies.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              Aucun chiot enregistré pour cette portée.
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {puppies.map((puppy) => (
            <PuppyCard key={puppy.id} puppy={puppy} />
          ))}
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Rentabilité de la portée</h2>

          <FinanceSummary expenses={litterExpenses} incomes={litterIncomes} />

          <div className="flex justify-end gap-2">
            <AddExpenseDialog
              defaultLitterId={litter.id}
              label="+ Dépense pour cette portée"
            />

            <AddIncomeDialog
              defaultLitterId={litter.id}
              label="+ Recette pour cette portée"
            />
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Dépenses</h3>
            <ExpensesTable expenses={litterExpenses} />
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Recettes</h3>
            <IncomesTable incomes={litterIncomes} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
