import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    status: "idle",
    error: null,
    totalPrice: 0,
  },

  reducers: {
    setbookToCart: (state, action) => {
      const foundBook = state.cart.find(
        (book) => book._id === action.payload._id
      );

      if (foundBook) {
        foundBook.quantity += 1;
        state.totalPrice += foundBook.price;
      } else {
        state.cart.push({
          ...action.payload,
          quantity: 1,
        });
        state.totalPrice += action.payload.price;
      }
    },

    setReduceBooks: (state, action) => {
      const foundBook = state.cart.find(
        (book) => book._id === action.payload._id
      );

      if (foundBook.quantity === 1) {
        state.totalPrice -= foundBook.price;
        state.cart = state.cart.filter((book) => book._id !== foundBook._id);
      } else {
        foundBook.quantity -= 1;
        state.totalPrice -= foundBook.price;
      }
    },

    setIncreaseBooks: (state, action) => {
      const foundBook = state.cart.find(
        (book) => book._id === action.payload._id
      );

      foundBook.quantity += 1;
      state.totalPrice += foundBook.price;
    },

    setRemoveBooks: (state, action) => {
      state.cart = state.cart.filter((book) => book._id !== action.payload._id);
      state.totalPrice -= action.payload.price * action.payload.quantity;
    },
  },
});

export const {
  setbookToCart,
  setReduceBooks,
  setIncreaseBooks,
  setRemoveBooks,
} = cartSlice.actions;

export default cartSlice;
