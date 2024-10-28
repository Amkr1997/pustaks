import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCartDataAsync = createAsyncThunk(
  "fetch/cartData",
  async () => {
    try {
      const fetchBooks = await axios.get(
        `https://major-project-1-backend-gray.vercel.app/newBooksCart`
      );

      return fetchBooks.data;
    } catch (error) {
      console.log(error);
    }
  }
);

/*export const addCartData = createAsyncThunk(
  "add/cartData",
  async (dataToAdd) => {
    try {
      const addedData = await axios.post(
        `https://major-project-1-backend-gray.vercel.app/newBooksCart`,
        dataToAdd
      );

      //console.log(addedData);
      return addCartData.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateCartDataAsync = createAsyncThunk(
  "update/cartData",
  async (dataToUpdate) => {
    //console.log(dataToUpdate);
    try {
      const updatedData = await axios.post(
        `https://major-project-1-backend-gray.vercel.app/newBooksCart/updateBook/${dataToUpdate._id}`,
        dataToUpdate
      );

      //console.log(updatedData);
      return updatedData.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteCartData = createAsyncThunk(
  "delete/cartData",
  async (dataToDelete) => {
    try {
      const deletedData = await axios.delete(
        `https://major-project-1-backend-gray.vercel.app/newBooksCart/${dataToDelete._id}`
      );

      console.log(deletedData);
      return deletedData.data;
    } catch (error) {
      console.log(error);
    }
  }
);*/

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

  extraReducers: () => {
    /*  builder.addCase(
      fetchCartDataAsync.pending,
      (state) => void (state.status = "loading")
    );

    builder.addCase(fetchCartDataAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.cart = action.payload;
    });

    builder.addCase(fetchCartDataAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(
      addCartData.pending,
      (state) => void (state.status = "loading")
    );

    builder.addCase(addCartData.fulfilled, (state, action) => {
      state.status = "success";
      state.cart.push(action.payload);
    });

    builder.addCase(addCartData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(
      updateCartDataAsync.pending,
      (state) => void (state.status = "loading")
    );

    builder.addCase(updateCartDataAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.cart[action.payload._id] = action.payload;
    });

    builder.addCase(updateCartDataAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(
      deleteCartData.pending,
      (state) => void (state.status = "loading")
    );

    builder.addCase(deleteCartData.fulfilled, (state, action) => {
      state.status = "success";
      state.cart = state.cart.filter((book) => book._id !== action.payload._id);
    });

    builder.addCase(deleteCartData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });*/
  },
});

export const {
  setbookToCart,
  setReduceBooks,
  setIncreaseBooks,
  setRemoveBooks,
} = cartSlice.actions;

export default cartSlice;
