import React from "react";
import { ReactElement } from "react";
import Paypal from "../components/orderpage/order-form/Paypal";
import { ProductProp } from "../redux/reducers/order.reducer";

//Reusable component for determining payment processor on otos
const PaymentProcessorSelect = ({
  orderType,
  cartButton,
  items,
  orderTotal,
  nextPage,
}: {
  orderType: string;
  cartButton: ReactElement;
  items: ProductProp[];
  orderTotal: number;
  nextPage: string;
}) => {
  if (!orderType) {
    return cartButton;
  }
  return {
    paypal: (
      <Paypal items={items} orderTotal={orderTotal} nextPage={nextPage} />
    ),
    credit: cartButton,
  }[orderType];
};

export default PaymentProcessorSelect;
