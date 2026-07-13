export type Dog = {
  id: string;
  name: string;
  sex: "Mâle" | "Femelle";
  breed: string;
  color: string;
  birthDate: string;
  weight: number;
  status:
    | "Disponible"
    | "Réservé"
    | "Gestante"
    | "Retraité";
  photo?: string;
};