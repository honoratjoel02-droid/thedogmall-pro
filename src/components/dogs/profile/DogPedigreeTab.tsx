// src/components/dogs/profile/DogPedigreeTab.tsx

import { useMemo } from "react";
import { Link } from "react-router-dom";

import type { Dog } from "../../../types/dog";
import { useDogs } from "../../../hooks/useDogs";
import { buildPedigreeTree, getDescendants, type PedigreeNode } from "../../../lib/pedigree";

import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";

interface DogPedigreeTabProps {
  dog: Dog;
}

const ANCESTOR_GENERATIONS = 4;

function AncestorCard({ dog }: { dog: Dog | null }) {
  if (!dog) {
    return (
      <div className="flex w-40 shrink-0 items-center justify-center rounded-lg border border-dashed border-border p-3 text-center text-xs text-muted-foreground">
        Inconnu
      </div>
    );
  }

  return (
    <Link
      to={`/dogs/${dog.id}`}
      className="flex w-40 shrink-0 flex-col gap-1 rounded-lg border border-border bg-card p-3 text-xs transition-colors hover:border-primary"
    >
      <span className="truncate font-medium text-foreground">{dog.name}</span>
      <span className="truncate text-muted-foreground">{dog.breed}</span>
      <Badge variant="outline" className="w-fit">
        {dog.sex}
      </Badge>
    </Link>
  );
}

function PedigreeBranch({ node, depth }: { node: PedigreeNode; depth: number }) {
  const hasNextGeneration = depth > 1 && (node.sire || node.dam);

  return (
    <div className="flex items-stretch gap-4">
      <div className="flex items-center">
        <AncestorCard dog={node.dog} />
      </div>

      {hasNextGeneration && (
        <div className="flex flex-col justify-around gap-4 border-l border-border pl-4">
          <PedigreeBranch node={node.sire ?? { dog: null, sire: null, dam: null }} depth={depth - 1} />
          <PedigreeBranch node={node.dam ?? { dog: null, sire: null, dam: null }} depth={depth - 1} />
        </div>
      )}
    </div>
  );
}

export default function DogPedigreeTab({ dog }: DogPedigreeTabProps) {
  const { data: dogs = [] } = useDogs();

  const dogsById = useMemo(() => new Map(dogs.map((d) => [d.id, d])), [dogs]);
  const tree = useMemo(
    () => buildPedigreeTree(dog, dogsById, ANCESTOR_GENERATIONS),
    [dog, dogsById],
  );
  const descendants = useMemo(() => getDescendants(dog.id, dogs), [dog.id, dogs]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ascendance</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto pb-2">
            <PedigreeBranch node={tree} depth={ANCESTOR_GENERATIONS} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Descendance</CardTitle>
        </CardHeader>

        <CardContent>
          {descendants.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Aucun chien enregistré comme descendant de {dog.name}.
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {descendants.map((child) => (
                <Link
                  key={child.id}
                  to={`/dogs/${child.id}`}
                  className="flex flex-col gap-1 rounded-lg border border-border bg-card p-3 text-sm transition-colors hover:border-primary"
                >
                  <span className="font-medium">{child.name}</span>

                  <span className="text-xs text-muted-foreground">
                    {child.breed} · {child.sex}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
