import { useState, type ReactNode } from "react";

import { AuthContext, type AuthStatus } from "../../lib/authContext";
import {
  hasPassword,
  isUnlocked,
  lock,
  markUnlocked,
  setPassword,
  verifyPassword,
} from "../../lib/auth";

function initialStatus(): AuthStatus {
  if (!hasPassword()) return "setup";
  return isUnlocked() ? "unlocked" : "locked";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>(initialStatus);

  async function createPassword(password: string) {
    await setPassword(password);
    markUnlocked();
    setStatus("unlocked");
  }

  async function login(password: string) {
    const valid = await verifyPassword(password);

    if (valid) {
      markUnlocked();
      setStatus("unlocked");
    }

    return valid;
  }

  function logout() {
    lock();
    setStatus("locked");
  }

  async function changePassword(current: string, next: string) {
    const valid = await verifyPassword(current);
    if (!valid) return false;

    await setPassword(next);
    return true;
  }

  return (
    <AuthContext.Provider
      value={{ status, createPassword, login, logout, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}
