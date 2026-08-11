import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { salesService } from "../services/sales";
import { puppiesService } from "../services/puppies";
import { incomesService } from "../services/incomes";
import type { Sale } from "../types/models/sale";
import type { Puppy } from "../types/models/puppy";

export function useSales() {
  return useQuery({
    queryKey: ["sales"],
    queryFn: () => salesService.getAll(),
  });
}

export function useSale(id?: string) {
  return useQuery({
    queryKey: ["sales", id],
    queryFn: () => salesService.getById(id!),
    enabled: !!id,
  });
}

export function useSaleByPuppy(puppyId?: string) {
  return useQuery({
    queryKey: ["sales", "puppy", puppyId],
    queryFn: () => salesService.getByPuppyId(puppyId!),
    enabled: !!puppyId,
  });
}

export function useSalesByClient(clientId?: string) {
  return useQuery({
    queryKey: ["sales", "client", clientId],
    queryFn: () => salesService.getByClientId(clientId!),
    enabled: !!clientId,
  });
}

type DeclareSaleInput = {
  puppy: Puppy;
  clientId: string;
  price: number;
  saleDate: string;
  contractSigned: boolean;
  notes?: string;
};

export function useDeclareSale() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      puppy,
      clientId,
      price,
      saleDate,
      contractSigned,
      notes,
    }: DeclareSaleInput) => {
      const income = await incomesService.create({
        title: `Vente ${puppy.identifier}`,
        amount: price,
        category: "Vente de chiot",
        incomeDate: saleDate,
        litterId: puppy.litterId,
      });

      const sale = await salesService.create({
        puppyId: puppy.id,
        litterId: puppy.litterId,
        clientId,
        price,
        saleDate,
        contractSigned,
        incomeId: income.id,
        notes,
      });

      await puppiesService.update(puppy.id, {
        status: "Vendu",
        reservedForClientId: clientId,
      });

      return sale;
    },

    onSuccess: (sale) => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      queryClient.invalidateQueries({ queryKey: ["puppies"] });
      queryClient.invalidateQueries({
        queryKey: ["puppies", "litter", sale.litterId],
      });
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
    },
  });
}

export function useRevertSale() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sale: Sale) => {
      await salesService.delete(sale.id);

      if (sale.incomeId) {
        await incomesService.delete(sale.incomeId);
      }

      await puppiesService.update(sale.puppyId, {
        status: "Disponible",
        reservedForClientId: undefined,
      });
    },

    onSuccess: (_, sale) => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      queryClient.invalidateQueries({ queryKey: ["puppies"] });
      queryClient.invalidateQueries({
        queryKey: ["puppies", "litter", sale.litterId],
      });
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
    },
  });
}
