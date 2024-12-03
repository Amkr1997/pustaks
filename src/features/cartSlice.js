import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const addOrders = createAsyncThunk(
  "add/Orders/Async",
  async (dataToAdd) => {
    try {
      const response = await axios.post(`${API_URL}/ordersHistory`, dataToAdd);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllOrders = createAsyncThunk("fetch/Orders/Async", async () => {
  try {
    const response = await axios.get(`${API_URL}/ordersHistory`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteOrders = createAsyncThunk(
  "delete/Orders/Async",
  async (orderId) => {
    try {
      const deletedOrder = await axios.delete(
        `${API_URL}/deleteOrder/${orderId}`
      );

      return deletedOrder.data;
    } catch (error) {
      console.log(error);
    }
  }
);

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

  extraReducers: (builder) => {
    builder.addCase(
      addOrders.pending,
      (state) => void (state.status === "loading")
    );

    builder.addCase(addOrders.fulfilled, (state, action) => {
      state.status = "success";
      state.totalOrders = action.payload;
    });

    builder.addCase(addOrders.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(
      getAllOrders.pending,
      (state) => void (state.status = "loading")
    );

    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.status = "success";
      state.totalOrders = action.payload;
    });

    builder.addCase(getAllOrders.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(
      deleteOrders.pending,
      (state) => void (state.status = "loading")
    );

    builder.addCase(deleteOrders.fulfilled, (state, action) => {
      state.status = "success";
      state.totalOrders = state.totalOrders.filter(
        (order) => order._id !== action.payload._id
      );
    });

    builder.addCase(deleteOrders.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    });
  },
});

export const {
  setbookToCart,
  setReduceBooks,
  setIncreaseBooks,
  setRemoveBooks,
} = cartSlice.actions;

export default cartSlice;
