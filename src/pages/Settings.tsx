import MainLayout from "../components/layout/MainLayout";

export default function Settings() {
  return (
    <MainLayout>
      <h1 className="text-4xl font-bold mb-8">
        ⚙️ Paramètres
      </h1>

      <p className="text-gray-500">
        Configuration de l'application.
      </p>
    </MainLayout>
  );
}