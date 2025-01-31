import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    status: "idle",
    error: null,
    totalPrice: 0,
    totalOrders: [],
  },

  reducers: {
    increaseTotalPrice: (state, action) => {
      const priceArr = action.payload;

      state.totalPrice = priceArr.reduce(
        (acc, curr) => (acc += Number(curr)),
        0
      );
    },

    setTotalPriceZero: (state) => {
      state.totalPrice = 0;
    },
  },
});

export const {
  increaseTotalPrice,
  setbookToCart,
  setReduceBooks,
  setIncreaseBooks,
  setRemoveBooks,
  setTotalPriceZero,
} = cartSlice.actions;

export default cartSlice;
