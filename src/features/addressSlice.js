import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAddress = createAsyncThunk("fetch/Address", async () => {
  try {
    const address = await axios.get(
      `https://major-project-1-backend-gray.vercel.app/newBookAddress`
    );

    return address.data;
  } catch (error) {
    console.log(error);
  }
});

export const addAddress = createAsyncThunk("add/Address", async (dataToAdd) => {
  try {
    const address = await axios.post(
      `https://major-project-1-backend-gray.vercel.app/newBookAddress`,
      dataToAdd
    );

    return address.data;
  } catch (error) {
    console.log(error);
  }
});

export const editAddress = createAsyncThunk(
  "edit/Address",
  async (dataToUpdate) => {
    try {
      const address = await axios.post(
        `https://major-project-1-backend-gray.vercel.app/newBookAddress/${dataToUpdate._id}`,
        dataToUpdate
      );

      return address.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "delete/Address",
  async (dataToDelete) => {
    try {
      const address = await axios.delete(
        `https://major-project-1-backend-gray.vercel.app/newBookAddress/bookAddress/${dataToDelete._id}`
      );

      return address.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    address: [],
    status: "idle",
    error: null,
  },

  extraReducers: (builder) => {
    builder.addCase(
      fetchAddress.pending,
      (state) => void (state.status = "loading")
    );

    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      state.status = "success";
      state.address = action.payload;
    });

    builder.addCase(fetchAddress.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(
      addAddress.pending,
      (state) => void (state.status = "loading")
    );

    builder.addCase(addAddress.fulfilled, (state, action) => {
      state.status = "success";
    });

    builder.addCase(addAddress.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(
      editAddress.pending,
      (state) => void (state.status = "loading")
    );

    builder.addCase(editAddress.fulfilled, (state, action) => {
      state.status = "success";
      state.address[action.payload._id] = action.payload;
    });

    builder.addCase(editAddress.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(
      deleteAddress.pending,
      (state) => void (state.status = "loading")
    );

    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      state.status = "success";
      state.address = state.address.filter(
        (address) => address._id !== action.payload._id
      );
    });

    builder.addCase(deleteAddress.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export const {
  setSaveAddress,
  setAddAddress,
  setEditAddress,
  setDeleteAddress,
} = addressSlice.actions;

export default addressSlice;
