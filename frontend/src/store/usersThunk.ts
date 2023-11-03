import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  RegisterMutation,
  RegisterResponse,
  signInMutation,
  ValidationError,
} from '../type';
import axiosApi from '../axiosApi';
import { isAxiosError } from 'axios';
import { RootState } from '../app/store';

export const signUp = createAsyncThunk<
  RegisterResponse,
  RegisterMutation,
  { rejectValue: ValidationError }
>(
  'users/register',
  async (registerMutation: RegisterMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<RegisterResponse>(
        '/users',
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
  { rejectValue: { error: string } }
>(
  'users/signIn',
  async (signUpMutation: signInMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<RegisterResponse>(
        '/users/sessions',
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

export const logout = createAsyncThunk<void, void, { state: RootState }>(
  'users/logout',
  async (_, { getState }) => {
    const token = getState().users.user?.token;
    await axiosApi.delete('users/sessions', {
      headers: { Authorization: token },
    });
  },
);
