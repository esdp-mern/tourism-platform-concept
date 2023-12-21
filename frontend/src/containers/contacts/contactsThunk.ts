import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IContacts,
  IContactsImageMutation,
  IContactsMutation,
  ValidationError,
} from '@/type';
import axiosApi from '@/axiosApi';
import { isAxiosError } from 'axios';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  const response = await axiosApi.get<IContacts>('/contacts');
  return response.data;
});

export const editContacts = createAsyncThunk<
  void,
  IContactsMutation,
  { rejectValue: ValidationError }
>('tours/edit', async (contactsMutation, { rejectWithValue }) => {
  try {
    await axiosApi.put(`/contacts/`, contactsMutation);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const editContactsImage = createAsyncThunk<
  void,
  IContactsImageMutation,
  { rejectValue: ValidationError }
>('tours/editImage', async (contactsMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(
      contactsMutation,
    ) as (keyof IContactsImageMutation)[];

    keys.forEach((key) => {
      const value = contactsMutation[key];

      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });
    await axiosApi.patch(`/contacts/`, formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});
