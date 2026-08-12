import { useMemo } from "react";

import { useDogs } from "./useDogs";
import { useClients } from "./useClients";
import { useLitters } from "./useLitters";
import { useBreedings } from "./useBreedings";

import { buildSearchIndex, searchResults } from "../lib/search";

export function useGlobalSearch(query: string) {
  const { data: dogs = [] } = useDogs();
  const { data: clients = [] } = useClients();
  const { data: litters = [] } = useLitters();
  const { data: breedings = [] } = useBreedings();

  const index = useMemo(
    () => buildSearchIndex({ dogs, clients, litters, breedings }),
    [dogs, clients, litters, breedings],
  );

  return useMemo(() => searchResults(index, query), [index, query]);
}
