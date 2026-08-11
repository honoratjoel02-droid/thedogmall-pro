import type { ReactNode } from "react";

import { useAuth } from "../../hooks/useAuth";
import Login from "../../pages/Login";

export default function AuthGate({ children }: { children: ReactNode }) {
  const { status } = useAuth();

  if (status !== "unlocked") return <Login />;

  return <>{children}</>;
}
