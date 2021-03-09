// High Order Slices
import { createSlice } from "@reduxjs/toolkit";
// Thunks
import * as authThunks from "../auth/thunks";
// Default Values
import { MainTheme } from "../../styles/theme";
// Types
import { Theme } from "styled-components";
import { PayloadAction } from "@reduxjs/toolkit";
import { AsyncState, RequestStatus } from "../../types/redux";
import { RootState } from "../store";
import { User } from "../../services/apis/WikkiApi";

export interface UserPreferences {
  theme: Theme;
}

export interface UserState extends AsyncState {
  preferences: UserPreferences;
  data: User;
}

const initialState: UserState = {
  preferences: { theme: MainTheme },
  status: RequestStatus.IDLE,
  error: null,
  data: {
    email: "",
    name: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserPreferences(state, action: PayloadAction<UserPreferences>) {
      state.preferences = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign Out
      .addCase(authThunks.signOut.fulfilled, (state) => {
        state = initialState;
      })
      // Sign In
      .addCase(authThunks.signIn.fulfilled, (state, action) => {
        state.data = action.payload.user;
      });
  },
});

export const selectTheme = (state: RootState) =>
  state.user.preferences.theme;

export const selectUser = (state: RootState) => state.user.data;

export const userReducer = userSlice.reducer;
