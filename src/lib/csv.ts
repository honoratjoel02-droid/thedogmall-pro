// src/lib/csv.ts

export interface CsvColumn<T> {
  header: string;
  accessor: (row: T) => string | number | null | undefined;
}

function escapeCsvField(value: string): string {
  if (/[",\n;]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }

  return value;
}

export function toCsv<T>(rows: T[], columns: CsvColumn<T>[]): string {
  const header = columns.map((column) => escapeCsvField(column.header)).join(",");

  const lines = rows.map((row) =>
    columns
      .map((column) => escapeCsvField(String(column.accessor(row) ?? "")))
      .join(","),
  );

  return [header, ...lines].join("\n");
}

export function downloadCsv(filename: string, content: string): void {
  const bom = String.fromCharCode(0xfeff);
  const blob = new Blob([bom + content], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
