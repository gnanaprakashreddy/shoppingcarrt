import { createSlice } from "@reduxjs/toolkit";

const initialMeals = { meals: [] };

const mealSlice = createSlice({
  name: "products",
  initialState: initialMeals,
  reducers: {
    setMeals(state, action) {
      state.meals = action.payload;
    },
  },
});

export const mealActions = mealSlice.actions;

export default mealSlice;
