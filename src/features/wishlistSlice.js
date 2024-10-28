import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
    status: "idle",
    error: null,
  },

  reducers: {
    setBookToWishList: (state, action) => {
      const foundBook = state.wishlist.find(
        (book) => book._id === action.payload._id
      );

      if (!foundBook) {
        state.wishlist.push(action.payload);
      }
    },

    removeBookFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (book) => book._id !== action.payload._id
      );
    },
  },
});

export const { setBookToWishList, removeBookFromWishlist } =
  wishlistSlice.actions;

export default wishlistSlice;
