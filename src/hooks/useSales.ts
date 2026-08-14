import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { salesService } from "../services/sales";
import { puppiesService } from "../services/puppies";
import { incomesService } from "../services/incomes";
import type { Payment, Sale } from "../types/models/sale";
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
  depositAmount?: number;
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
      depositAmount,
      notes,
    }: DeclareSaleInput) => {
      const payments: Payment[] = [];

      if (depositAmount && depositAmount > 0) {
        const income = await incomesService.create({
          title: `Vente ${puppy.identifier} (acompte)`,
          amount: depositAmount,
          category: "Vente de chiot",
          incomeDate: saleDate,
          litterId: puppy.litterId,
        });

        payments.push({
          id: crypto.randomUUID(),
          amount: depositAmount,
          date: saleDate,
          incomeId: income.id,
        });
      }

      const sale = await salesService.create({
        puppyId: puppy.id,
        litterId: puppy.litterId,
        clientId,
        price,
        saleDate,
        contractSigned,
        payments,
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

type AddPaymentInput = {
  sale: Sale;
  puppyIdentifier: string;
  amount: number;
  date: string;
  notes?: string;
};

export function useAddPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      sale,
      puppyIdentifier,
      amount,
      date,
      notes,
    }: AddPaymentInput) => {
      const income = await incomesService.create({
        title: `Vente ${puppyIdentifier} (paiement)`,
        amount,
        category: "Vente de chiot",
        incomeDate: date,
        litterId: sale.litterId,
      });

      const payment: Payment = {
        id: crypto.randomUUID(),
        amount,
        date,
        notes,
        incomeId: income.id,
      };

      return salesService.update(sale.id, {
        payments: [...sale.payments, payment],
      });
    },

    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      queryClient.invalidateQueries({ queryKey: ["incomes"] });

      if (updated) {
        queryClient.invalidateQueries({
          queryKey: ["sales", "puppy", updated.puppyId],
        });
      }
    },
  });
}

export function useDeletePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      sale,
      paymentId,
    }: {
      sale: Sale;
      paymentId: string;
    }) => {
      const payment = sale.payments.find((p) => p.id === paymentId);

      if (payment?.incomeId) {
        await incomesService.delete(payment.incomeId);
      }

      return salesService.update(sale.id, {
        payments: sale.payments.filter((p) => p.id !== paymentId),
      });
    },

    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      queryClient.invalidateQueries({ queryKey: ["incomes"] });

      if (updated) {
        queryClient.invalidateQueries({
          queryKey: ["sales", "puppy", updated.puppyId],
        });
      }
    },
  });
}

export function useRevertSale() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sale: Sale) => {
      await salesService.delete(sale.id);

      for (const payment of sale.payments) {
        if (payment.incomeId) {
          await incomesService.delete(payment.incomeId);
        }
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
