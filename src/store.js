import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./features/bookSlice";
import cartSlice from "./features/cartSlice";
import wishlistSlice from "./features/wishlistSlice";
import addressSlice from "./features/addressSlice";

const store = configureStore({
  reducer: {
    books: bookSlice.reducer,
    cart: cartSlice.reducer,
    wishlist: wishlistSlice.reducer,
    address: addressSlice.reducer,
  },
});

export default store;
