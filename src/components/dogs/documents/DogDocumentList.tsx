import { FileText, Download, Trash2 } from "lucide-react";

import type { DogDocument } from "../../../types/models/dogDocument";
import { useDeleteDogDocument } from "../../../hooks/useDogDocuments";

import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import EmptyState from "../../ui/empty-state";
import LoadingState from "../../ui/loading-state";

type Props = {
  documents: DogDocument[];
  isLoading?: boolean;
};

export default function DogDocumentList({ documents, isLoading = false }: Props) {
  const deleteDocument = useDeleteDogDocument();

  if (isLoading) {
    return <LoadingState rows={3} />;
  }

  if (documents.length === 0) {
    return <EmptyState icon={FileText} label="Aucun document enregistré." />;
  }

  const sorted = [...documents].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );

  return (
    <div className="space-y-3">
      {sorted.map((doc) => (
        <Card key={doc.id}>
          <CardContent className="flex items-center justify-between gap-3 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <FileText className="size-4" />
              </div>

              <div className="min-w-0">
                <p className="truncate font-medium">{doc.title}</p>

                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="outline">{doc.type}</Badge>
                  <span>
                    {new Date(doc.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 gap-2">
              <Button
                variant="outline"
                size="sm"
                render={(props) => (
                  <a {...props} href={doc.dataUrl} download={doc.fileName}>
                    <Download className="size-4" />
                  </a>
                )}
              />

              <Button
                variant="destructive"
                size="sm"
                onClick={() =>
                  deleteDocument.mutate({ id: doc.id, dogId: doc.dogId })
                }
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
