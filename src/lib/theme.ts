import { createContext } from "react";

export type Theme = "light" | "dark" | "system";

export type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const STORAGE_KEY = "thedogmall.theme";

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function applyTheme(theme: Theme) {
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  document.documentElement.classList.toggle("dark", isDark);
}

export function readStoredTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);

  return stored === "light" || stored === "dark" || stored === "system"
    ? stored
    : "system";
}
