import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  RegisterMutation,
  RegisterResponse,
  signInMutation,
  ValidationError,
} from "../type";
import axiosApi from "../axiosApi";
import { isAxiosError } from "axios";

export const register = createAsyncThunk<
  RegisterResponse,
  RegisterMutation,
  { rejectValue: ValidationError }
>(
  "users/register",
  async (registerMutation: RegisterMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<RegisterResponse>(
        "/users",
        registerMutation,
      );
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  },
);

export const signIn = createAsyncThunk<
  RegisterResponse,
  signInMutation,
  { rejectValue: ValidationError }
>(
  "users/signIn",
  async (signUpMutation: signInMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<RegisterResponse>(
        "/users/sessions",
        signUpMutation,
      );
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  },
);
