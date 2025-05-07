import { createSlice } from "@reduxjs/toolkit";
import { initialStateConstant } from "./constants";
import { login, logout, refreshUser, register } from "./operation";

const authSlice = createSlice({
  name: "auth",
  initialState: initialStateConstant,
  reducers: {
    setUpdatedToken(state, action) {
      state.token = action.payload;
    },
    logoutAction(state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.token;
        state.isLoggedIn = true;

      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken
        state.isLoggedIn = true;
        // localStorage.setItem("token", action.payload.token);
      })
      
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })

      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      })
  },
});

export const { setUpdatedToken, logoutAction } = authSlice.actions;
export const authReducer = authSlice.reducer;