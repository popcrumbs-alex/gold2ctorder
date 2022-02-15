import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type InitialStateProps = {
  alert: {
    type: string;
    message: string;
  };
  isVisible: boolean;
  localAlertNames: string[];
};

const initialState: InitialStateProps = {
  alert: {
    type: "",
    message: "",
  },
  isVisible: false,
  localAlertNames: [],
};

export type SetAlertActionParams = {
  type: string;
  message: string;
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<SetAlertActionParams>) => {
      state.alert = action.payload;
      state.isVisible = true;
    },
    resetAlert: (state) => {
      state.alert = { message: "", type: "" };
      state.isVisible = false;
    },
    setFormError: (state, action: PayloadAction<string>) => {
      state.localAlertNames.push(action.payload);
    },
    removeFormFieldFromErrors: (state, action: PayloadAction<string>) => {
      //remove field error by index
      state.localAlertNames = state.localAlertNames.filter(
        (name: string) => name !== action.payload
      );
    },
    resetFormError: (state) => {
      state.localAlertNames = [];
    },
  },
});

export const {
  setAlert,
  resetAlert,
  setFormError,
  resetFormError,
  removeFormFieldFromErrors,
} = alertSlice.actions;

export const selectAlert = (state: RootState) => state.alerts;

export default alertSlice.reducer;
