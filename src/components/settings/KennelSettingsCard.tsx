import { Building2 } from "lucide-react";

import {
  useKennelSettings,
  useUpdateKennelSettings,
} from "../../hooks/useKennelSettings";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import LoadingState from "../ui/loading-state";

export default function KennelSettingsCard() {
  const { data: settings, isLoading } = useKennelSettings();
  const updateSettings = useUpdateKennelSettings();

  if (isLoading || !settings) {
    return (
      <Card>
        <CardContent className="p-6">
          <LoadingState rows={2} />
        </CardContent>
      </Card>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    await updateSettings.mutateAsync({
      name: String(formData.get("name") ?? ""),
      ownerName: String(formData.get("ownerName") ?? ""),
      address: String(formData.get("address") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      registrationNumber:
        String(formData.get("registrationNumber") ?? "") || undefined,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Informations de l'élevage
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          Utilisées pour générer les contrats de cession des chiots.
        </p>

        <form
          key={JSON.stringify(settings)}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Nom de l'élevage</Label>
            <Input id="name" name="name" defaultValue={settings.name} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ownerName">Nom de l'éleveur</Label>
            <Input
              id="ownerName"
              name="ownerName"
              defaultValue={settings.ownerName}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Adresse</Label>
            <Input id="address" name="address" defaultValue={settings.address} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" name="phone" defaultValue={settings.phone} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={settings.email}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="registrationNumber">
              N° d'élevage / SIRET (optionnel)
            </Label>
            <Input
              id="registrationNumber"
              name="registrationNumber"
              defaultValue={settings.registrationNumber}
            />
          </div>

          <Button type="submit" disabled={updateSettings.isPending}>
            {updateSettings.isPending ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
