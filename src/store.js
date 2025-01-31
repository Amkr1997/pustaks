import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./features/bookSlice";
import cartSlice from "./features/cartSlice";
import apiSlice from "./features/apiSlice";
import authSlice from "./features/authSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice.reducer,
    books: bookSlice.reducer,
    cart: cartSlice.reducer,
  },

  middleware: (prevMiddleware) => prevMiddleware().concat(apiSlice.middleware),
});

export default store;
