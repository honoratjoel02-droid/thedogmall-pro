// src/lib/payments.ts

import type { Sale } from "../types/models/sale";

export function getTotalPaid(sale: Pick<Sale, "payments">): number {
  return sale.payments.reduce((sum, payment) => sum + payment.amount, 0);
}

export function getBalanceDue(sale: Pick<Sale, "price" | "payments">): number {
  return Math.max(0, sale.price - getTotalPaid(sale));
}

export function isFullyPaid(sale: Pick<Sale, "price" | "payments">): boolean {
  return getBalanceDue(sale) <= 0;
}
