import { useClients } from "../../../hooks/useClients";

interface ClientSelectProps {
  value: string;
  onChange: (clientId: string) => void;
}

export default function ClientSelect({ value, onChange }: ClientSelectProps) {
  const { data: clients = [] } = useClients();

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-48 rounded-md border bg-background px-2 py-1 text-sm"
    >
      <option value="">Sélectionner un client...</option>

      {clients.map((client) => (
        <option key={client.id} value={client.id}>
          {client.firstName} {client.lastName}
        </option>
      ))}
    </select>
  );
}
