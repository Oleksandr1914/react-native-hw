import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser } from "./authOperation";

const handlePending = (state) => {
  state.error = null;
};

const handleFulfilled = (state, action) => {
  state.login = action.payload?.login;
  state.userId = action.payload?.uid;
  state.email = action.payload?.email;
  state.stateChange = true;
};
const handleRejected = (state, action) => {
  state.error = action?.payload;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    login: null,
    email: null,
    error: null,
    stateChange: false,
  },
  reducers: {
    updateUserProfile(state, { payload }) {
      state.userId = payload?.userId;
      state.login = payload?.login;
      state.email = payload?.email;
    },
    authStateChanged(state, { payload }) {
      state.stateChange = payload?.stateChange;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, handleFulfilled)
      .addCase(registerUser.rejected, handleRejected);

    builder
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.rejected, handleRejected)
      .addCase(loginUser.fulfilled, handleFulfilled);

    builder
      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.rejected, handleRejected)
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.email = null;
        state.userId = null;
        state.login = null;
        state.stateChange = false;
      });
  },
});

export const { authStateChanged, updateUserProfile } = authSlice.actions;
export const authReducer = authSlice.reducer;
