// Redux
import { createAsyncThunk } from "@reduxjs/toolkit";
// Services
import * as WikkiApi from "../../services/apis/WikkiApi";
import * as LocalStorage from "../../services/storage/LocalStorage";
// Types
import { SignInResponse } from "../../services/apis/WikkiApi";

export interface SignInForm {
  email: string;
  password: string;
}

export interface SignUpForm extends SignInForm {
  name: string;
}

export const signUp = createAsyncThunk<
  undefined,
  SignUpForm,
  { rejectValue: string }
>("auth/signUp", async (signUpForm, { rejectWithValue }) => {
  try {
    await WikkiApi.signUp(signUpForm);
  } catch (error) {
    return rejectWithValue(error.messsage);
  }
});

export const signIn = createAsyncThunk<
  SignInResponse,
  SignInForm,
  { rejectValue: string }
>("auth/signIn", async (signInForm, { rejectWithValue }) => {
  try {
    const { user, ...tokens } = await WikkiApi.signIn(signInForm);
    LocalStorage.signIn(tokens);
    const { accessToken, refreshToken } = tokens;
    return { user, accessToken, refreshToken };
  } catch (error) {
    return rejectWithValue(error.messsage);
  }
});

export const signOut = createAsyncThunk("auth/signOut", () => {
  LocalStorage.signOut();
});
