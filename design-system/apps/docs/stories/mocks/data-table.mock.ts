/**
 * Tipo de exemplo para DataTable stories.
 * Representa um pagamento com status, email e valor.
 */
export type MockPayment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};
