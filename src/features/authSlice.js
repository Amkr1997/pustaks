import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    isAuthenticated: !!localStorage.getItem("pustaksToken") || false,
    profileFetchCount: 0,
  },

  reducers: {
    logInUser: (state, action) => {
      localStorage.setItem("pustaksToken", action.payload);
      state.isAuthenticated = true;
    },

    logOutUser: (state) => {
      localStorage.removeItem("pustaksToken");
      state.isAuthenticated = false;
      state.profileFetchCount = 0;
    },

    increaseCount: (state) => {
      state.profileFetchCount += 1;
    },
  },
});

export const { logInUser, logOutUser, increaseCount } = authSlice.actions;
export default authSlice;
