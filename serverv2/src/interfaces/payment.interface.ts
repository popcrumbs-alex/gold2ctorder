export interface PaymentSaleOptions {
  firstName: string;
  lastName: string;
  creditCardNumber: string;
  expiry: string;
  cvv: string;
  amount: number;
  containsRecurringItem: boolean;
  email: string;
  state: string;
  city: string;
  address: string;
  zip: string;
}

export interface RecurringPaymentOptions extends PaymentSaleOptions {
  sourceTransactionId: string;
}
