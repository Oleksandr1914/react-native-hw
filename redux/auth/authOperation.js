import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebase/config";
import { authStateChanged, updateUserProfile } from "./authReducer";

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ login, email, password }, thunkAPI) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
      });
      const { uid, displayName } = auth.currentUser;

      thunkAPI.dispatch(
        updateUserProfile({
          userId: uid,
          login: displayName,
          email,
        })
      );
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      return user;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authStateChangedUser = createAsyncThunk(
  "auth/stateChanged",
  async (_, thunkAPI) => {
    try {
      await onAuthStateChanged(auth, (user) => {
        if (user) {
          thunkAPI.dispatch(
            updateUserProfile({
              userId: user.uid,
              login: user.displayName,
              email: user.email,
            })
          );
          thunkAPI.dispatch(authStateChanged({ stateChange: true }));
        }
      });
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
