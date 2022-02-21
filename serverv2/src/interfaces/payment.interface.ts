export interface PaymentSaleOptions {
  firstName: string;
  lastName: string;
  creditCardNumber: string;
  expiry: string;
  cvv: string;
  amount: number;
  containsRecurringItem: boolean;
  email: string;
}

export interface RecurringPaymentOptions extends PaymentSaleOptions {
  sourceTransactionId: string;
}
