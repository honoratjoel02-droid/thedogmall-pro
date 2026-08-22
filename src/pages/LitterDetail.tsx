import { useNavigate, useParams } from "react-router-dom";
import { Download, Heart, PawPrint } from "lucide-react";

import MainLayout from "../components/layout/MainLayout";
import AddPuppyDialog from "../components/dogs/litters/AddPuppyDialog";
import PuppyCard from "../components/dogs/litters/PuppyCard";
import EditLitterDialog from "../components/dogs/litters/EditLitterDialog";
import DeleteLitterDialog from "../components/dogs/litters/DeleteLitterDialog";
import AddWaitlistEntryDialog from "../components/dogs/litters/AddWaitlistEntryDialog";
import WaitlistList from "../components/dogs/litters/WaitlistList";
import ApplyVaccinationScheduleDialog from "../components/dogs/litters/ApplyVaccinationScheduleDialog";
import ApplySocializationChecklistDialog from "../components/dogs/litters/ApplySocializationChecklistDialog";
import LitterPhotoGallery from "../components/dogs/litters/LitterPhotoGallery";
import AddLitterPhotoDialog from "../components/dogs/litters/AddLitterPhotoDialog";
import FinanceSummary from "../components/finances/FinanceSummary";
import ExpensesTable from "../components/finances/ExpensesTable";
import IncomesTable from "../components/finances/IncomesTable";
import AddExpenseDialog from "../components/finances/AddExpenseDialog";
import AddIncomeDialog from "../components/finances/AddIncomeDialog";

import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import EmptyState from "../components/ui/empty-state";
import LoadingState from "../components/ui/loading-state";

import { useLitter } from "../hooks/useLitters";
import { usePuppiesByLitter } from "../hooks/usePuppies";
import { useDogs } from "../hooks/useDogs";
import { useExpenses } from "../hooks/useExpenses";
import { useIncomes } from "../hooks/useIncomes";
import { useClients } from "../hooks/useClients";
import { useSales } from "../hooks/useSales";
import { useWaitlistByLitter } from "../hooks/useWaitlist";
import { useLitterPhotosByLitter } from "../hooks/useLitterPhotos";

import { downloadCsv, toCsv } from "../lib/csv";
import type { Puppy } from "../types/models/puppy";

export default function LitterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: litter, isLoading } = useLitter(id);
  const { data: puppies = [] } = usePuppiesByLitter(id);
  const { data: dogs = [] } = useDogs();
  const { data: allExpenses = [] } = useExpenses();
  const { data: allIncomes = [] } = useIncomes();
  const { data: clients = [] } = useClients();
  const { data: sales = [] } = useSales();
  const { data: waitlistEntries = [], isLoading: loadingWaitlist } =
    useWaitlistByLitter(id);
  const { data: litterPhotos = [], isLoading: loadingPhotos } =
    useLitterPhotosByLitter(id);

  if (isLoading) {
    return (
      <MainLayout>
        <LoadingState rows={4} />
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
  const litterId = litter.id;

  function handleExportPuppies() {
    const columns = [
      { header: "Identifiant", accessor: (p: Puppy) => p.identifier },
      { header: "Sexe", accessor: (p: Puppy) => p.sex },
      { header: "Couleur", accessor: (p: Puppy) => p.color },
      { header: "Statut", accessor: (p: Puppy) => p.status },
      {
        header: "Poids actuel (g)",
        accessor: (p: Puppy) =>
          p.weightHistory.length > 0
            ? p.weightHistory[p.weightHistory.length - 1].weightGrams
            : p.birthWeightGrams,
      },
      {
        header: "Client",
        accessor: (p: Puppy) => {
          const clientId =
            sales.find((s) => s.puppyId === p.id)?.clientId ??
            p.reservedForClientId;
          const client = clients.find((c) => c.id === clientId);
          return client ? `${client.firstName} ${client.lastName}` : "";
        },
      },
      {
        header: "Prix de vente (FCFA)",
        accessor: (p: Puppy) => sales.find((s) => s.puppyId === p.id)?.price,
      },
    ];

    downloadCsv(`chiots-portee-${litterId}.csv`, toCsv(puppies, columns));
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Button variant="ghost" onClick={() => navigate("/litters")}>
            ← Retour
          </Button>

          <div className="flex gap-2">
            <EditLitterDialog litter={litter} />

            <DeleteLitterDialog litter={litter} redirectAfterDelete />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center gap-2 text-2xl">
              {female?.name ?? "Femelle inconnue"}
              <Heart className="size-5 shrink-0 fill-primary text-primary" />
              {male?.name ?? "Mâle inconnu"}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <CardTitle>Galerie photos</CardTitle>

            <CardAction>
              <AddLitterPhotoDialog litterId={litter.id} />
            </CardAction>
          </CardHeader>

          <CardContent className="pt-4">
            <LitterPhotoGallery photos={litterPhotos} isLoading={loadingPhotos} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <CardTitle>Liste d'attente</CardTitle>

            <CardAction>
              <AddWaitlistEntryDialog
                litterId={litter.id}
                nextPosition={waitlistEntries.length}
              />
            </CardAction>
          </CardHeader>

          <CardContent className="pt-4">
            <WaitlistList entries={waitlistEntries} isLoading={loadingWaitlist} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <CardTitle>Chiots</CardTitle>

            <CardAction>
              <div className="flex flex-wrap gap-2">
                <ApplyVaccinationScheduleDialog
                  puppies={puppies}
                  birthDate={litter.birthDate}
                />

                <ApplySocializationChecklistDialog
                  puppies={puppies}
                  birthDate={litter.birthDate}
                />

                <Button
                  variant="outline"
                  onClick={handleExportPuppies}
                  disabled={puppies.length === 0}
                >
                  <Download className="mr-1.5 size-4" />
                  Exporter en CSV
                </Button>

                <AddPuppyDialog litterId={litter.id} />
              </div>
            </CardAction>
          </CardHeader>

          <CardContent className="space-y-4 pt-4">
            {puppies.length === 0 ? (
              <EmptyState icon={PawPrint} label="Aucun chiot enregistré pour cette portée." />
            ) : (
              puppies.map((puppy) => <PuppyCard key={puppy.id} puppy={puppy} />)
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b">
            <CardTitle>Rentabilité de la portée</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 pt-4">
            <FinanceSummary expenses={litterExpenses} incomes={litterIncomes} />

            <div className="flex flex-wrap justify-end gap-2">
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
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
