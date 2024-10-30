import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartslice";
import mealSlice from "./mealslice";
import placeOrderFormSlice from "./placeorderformslice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    meals: mealSlice.reducer,
    placeorder: placeOrderFormSlice.reducer,
  },
});

export default store;
