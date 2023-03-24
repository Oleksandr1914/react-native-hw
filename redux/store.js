import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authReducer, authSlice } from "./auth/authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
