export interface PaymentSaleOptions {
  firstName: string;
  lastName: string;
  creditCardNumber: number;
  expiry: string;
  cvv: number;
  amount: number;
  containsRecurringItem: boolean;
}

export interface RecurringPaymentOptions extends PaymentSaleOptions {
  sourceTransactionId: string;
}
