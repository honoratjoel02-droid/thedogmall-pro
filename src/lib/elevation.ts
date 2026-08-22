// Échelle d'élévation partagée par Card/Button/Table/Dialog/Sheet/DropdownMenu.
// Ombres neutres (noir) plutôt que shadow-foreground/x : --foreground est
// quasi blanc en dark mode, une ombre teintée par le foreground y devient
// invisible sur fond sombre.
export const ELEVATION_REST = "shadow-sm shadow-black/[0.06] dark:shadow-black/40";
export const ELEVATION_HOVER = "shadow-md shadow-black/[0.10] dark:shadow-black/50";
export const ELEVATION_FLOAT = "shadow-xl shadow-black/[0.16] dark:shadow-black/60";
