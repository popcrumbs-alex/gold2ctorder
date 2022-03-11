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
  sticky_shipping_id: number;
  sticky_campaign_id: number;
  creditCardType: string;
  sticky_offer_id: number;
  sticky_product_id: number;
  sticky_billing_model_id: number;
  sticky_quantity: number;
  sticky_trial_product_id: number | undefined;
}

export interface RecurringPaymentOptions extends PaymentSaleOptions {
  sourceTransactionId: string;
}
