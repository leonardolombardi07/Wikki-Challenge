import { createSlice } from "@reduxjs/toolkit";
// Thunks
import * as authThunks from "./thunks";
// Utils
import {
  resetAsyncState,
  handleStart,
  handleSuccess,
  handleError,
} from "../utils";
// Services
import { isAuthenticated } from "../../services/storage/LocalStorage";
// Types
import { AsyncState } from "../../types/redux";
import { RequestStatus } from "../../types/redux";
import { RootState } from "../store";

interface AuthState extends AsyncState {
  isAuthenticated: boolean;
  accessToken: null | string;
  refreshToken: null | string;
}

const initialState: AuthState = {
  isAuthenticated: isAuthenticated(),
  accessToken: null,
  refreshToken: null,
  status: RequestStatus.IDLE,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthAsyncState: resetAsyncState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(authThunks.signOut.fulfilled, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(authThunks.signIn.pending, handleStart)
      .addCase(authThunks.signIn.fulfilled, (state, action) => {
        const { accessToken, refreshToken } = action.payload;
        state.isAuthenticated = true;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        handleSuccess(state);
      })
      .addCase(authThunks.signIn.rejected, handleError)
      .addCase(authThunks.signUp.pending, handleStart)
      .addCase(authThunks.signUp.fulfilled, (state) => {
        state.isAuthenticated = true;
        handleSuccess(state);
      })
      .addCase(authThunks.signUp.rejected, handleError);
  },
});

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const { resetAuthAsyncState } = authSlice.actions;
export const authReducer = authSlice.reducer;
