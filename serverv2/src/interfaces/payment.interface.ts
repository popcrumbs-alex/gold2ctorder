export interface PaymentSaleOptions {
  firstName: string;
  lastName: string;
  creditCardNumber: string;
  expiry: string;
  cvv: string;
  amount: number;
  containsRecurringItem: boolean;
}

export interface RecurringPaymentOptions extends PaymentSaleOptions {
  sourceTransactionId: string;
}
