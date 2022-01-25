import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type ProductProp = {
  sku: string;
  price: number;
  title: string;
  displayPrice: string;
  type: string;
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

export type InitialStateProps = {
  myOrder: {
    products: Array<ProductProp>;
    orderTotal: number;
    contactInfo: ContactInfoProps;
    shippingInfo: ShippingProps;
  };
};

export type ActionProps = {
  type: string;
  payload: any;
};

const initialState: InitialStateProps = {
  myOrder: {
    products: [],
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

    updateContactInfo: (state, action: PayloadAction<ContactInfoProps>) => {
      state.myOrder.contactInfo = action.payload;
    },
    updateShippingInfo: (state, action: PayloadAction<ShippingProps>) => {
      state.myOrder.shippingInfo = action.payload;
    },
  },
});

export const { addProductToOrder, updateContactInfo, updateShippingInfo } =
  orderSlice.actions;

//async contact dispatch action
export const updateContactInfoAsync =
  (contactInfo: ContactInfoProps) => (dispatch) => {
    dispatch(updateContactInfo(contactInfo));
  };

export const selectOrderState = (state: RootState) => state.orders;

export default orderSlice.reducer;
