import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialCartState = { cartItems: [], isCartOpen: false, showForm: false };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart(state, action) {
      const newMeal = action.payload;
      const existingMeal = state.cartItems.find(
        (item) => item.meal.id === newMeal.id
      );
      if (existingMeal) {
        existingMeal.quantity += 1;
      } else {
        state.cartItems.push({
          meal: newMeal,
          quantity: 1,
        });
      }
    },
    removeFromCart(state, action) {
      const removableMeal = action.payload;
      if (removableMeal.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.meal.id !== removableMeal.meal.id
        );
      } else {
        const existingMeal = state.cartItems.find(
          (item) => item.meal.id === removableMeal.meal.id
        );
        existingMeal.quantity -= 1;
      }
    },
    clearCart(state) {
      state.cartItems = [];
    },
    showCart(state, action) {
      state.isCartOpen = action.payload;
    },
    showForm(state, action) {
      state.showForm = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
