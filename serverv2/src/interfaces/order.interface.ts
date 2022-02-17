export interface OrderObjectParams {
  customer: CustomerType;
  shipping_address: ShippingAddress;
  billing_address: ShippingAddress;
  total_tax: number;
  financial_status: string;
  tax_lines: Array<{ price: number; rate: string; title: string }>;
  transactions: Array<{
    kind: string;
    status: string;
    amount: number;
  }>;
  line_items: Array<{ variant_id: number; quantity: number }>;
  note_attributes: Array<{ name: string; value: string }>;
  tags: Array<string>;
}

export interface CustomerType {
  first_name: string;
  last_name: string;
  email: string;
}

export interface ShippingAddress {
  address1: string;
  address2: string | undefined;
  city: string;
  country: string;
  country_code: string;
  country_name: string;
  company: string;
  first_name: string;
  last_name: string;
  name: string;
  phone: string;
  province: String;
  province_code: string;
  zip: string;
}

export interface ShopifyUpdateOrderParams {
  orderId: string;
  newOrderTotal: number;
}
