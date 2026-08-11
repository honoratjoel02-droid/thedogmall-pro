import { createContext } from "react";

export type AuthStatus = "setup" | "locked" | "unlocked";

export type AuthContextValue = {
  status: AuthStatus;
  createPassword: (password: string) => Promise<void>;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  changePassword: (current: string, next: string) => Promise<boolean>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
