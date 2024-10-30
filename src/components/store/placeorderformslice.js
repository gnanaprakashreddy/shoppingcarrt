import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialFormState = { showSuccessMsg: false };

const placeOrderFormSlice = createSlice({
  name: "placeorder",
  initialState: initialFormState,
  reducers: {
    showSuccessMsg(state, action) {
      state.showSuccessMsg = action.payload;
    },
  },
});

export const placeFormActions = placeOrderFormSlice.actions;

export default placeOrderFormSlice;
