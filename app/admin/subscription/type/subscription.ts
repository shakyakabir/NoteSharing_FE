export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  isCurrent: boolean;
  features: { text: string; included: boolean }[];
  buttonText: string;
  buttonVariant: "primary" | "secondary" | "disabled";
}

export interface PaymentHistoryItem {
  id: string;
  date: string;
  invoiceId: string;
  amount: string;
  plan: string;
  status: "PAID" | "PENDING" | "FAILED";
}
