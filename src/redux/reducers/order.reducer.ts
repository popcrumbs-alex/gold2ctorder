import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type ProductProp = {
  sku: string;
  price: number;
  title: string;
  displayPrice: string;
  type: string;
  id: number;
  isRecurring: boolean;
};

export type ContactInfoProps = {
  firstName: string;
  lastName: string;
  email: string;
};

export type ShippingProps = {
  address: string;
  city: string;
  state: string;
  zip: string;
};

export type CardProps = {
  creditCardNumber: number | null;
  expiry: number | null;
  cvc: number | null;
};

export type OrderStateProps = {
  myOrder: {
    products: Array<ProductProp>;
    orderTotal: number;
    contactInfo: ContactInfoProps;
    shippingInfo: ShippingProps;
    cardInfo: CardProps;
    otos: Array<ProductProp>;
  };
};

export type ActionProps = {
  type: string;
  payload: any;
};

const initialState: OrderStateProps = {
  myOrder: {
    products: [],
    otos: [],
    orderTotal: 0.0,
    contactInfo: {
      firstName: "",
      lastName: "",
      email: "",
    },
    shippingInfo: {
      address: "",
      city: "",
      state: "",
      zip: "",
    },
    cardInfo: {
      creditCardNumber: null,
      expiry: null,
      cvc: null,
    },
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addProductToOrder: (state, action: PayloadAction<ProductProp>) => {
      const copyProducts = state.myOrder.products.slice();

      let filtered = copyProducts.filter(
        (product: ProductProp) => product.type !== "main"
      );
      //TODO write tests for this to make sure singular item is being stored
      state.myOrder.products = [...filtered, action.payload];
    },

    addBumpInOrder: (state, action: PayloadAction<ProductProp>) => {
      state.myOrder.products.push(action.payload);
    },
    removeBumpFromOrder: (state, action: PayloadAction<ProductProp>) => {
      let filtered = state.myOrder.products.filter(
        (product: ProductProp) => product.title !== action.payload.title
      );
      state.myOrder.products = filtered;
    },
    updateContactInfo: (state, action: PayloadAction<ContactInfoProps>) => {
      state.myOrder.contactInfo = action.payload;
    },
    updateShippingInfo: (state, action: PayloadAction<ShippingProps>) => {
      state.myOrder.shippingInfo = action.payload;
    },
    updateOrderTotal: (state, action: PayloadAction<number>) => {
      console.log("set state", action.payload);
      state.myOrder.orderTotal = action.payload;
    },
    updateCardInfo: (state, action: PayloadAction<CardProps>) => {
      state.myOrder.cardInfo = action.payload;
    },
    addOtoToOrder: (state, action: PayloadAction<ProductProp>) => {
      state.myOrder.otos.push(action.payload);
    },
  },
});

export const {
  addProductToOrder,
  updateContactInfo,
  updateShippingInfo,
  updateOrderTotal,
  addBumpInOrder,
  removeBumpFromOrder,
  updateCardInfo,
  addOtoToOrder,
} = orderSlice.actions;

//async contact dispatch action
export const updateContactInfoAsync =
  (contactInfo: ContactInfoProps) => (dispatch) => {
    dispatch(updateContactInfo(contactInfo));
  };

export const selectOrderState = (state: RootState) => state.orders;

export default orderSlice.reducer;
