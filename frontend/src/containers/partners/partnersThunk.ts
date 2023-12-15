import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IPartnerMutation,
  IPartnerOrder,
  IPartnerOrderMutation,
  ValidationError,
} from '@/type';
import axiosApi from '@/axiosApi';
import { isAxiosError } from 'axios';

export const fetchPartnerOrders = createAsyncThunk<IPartnerOrder[]>(
  'partners/fetchAllRequests',
  async () => {
    const response = await axiosApi.get<IPartnerOrder[]>('/partnerOrders');
    return response.data;
  },
);

export const createPartnerOrder = createAsyncThunk<
  IPartnerOrderMutation,
  IPartnerOrderMutation,
  {
    rejectValue: ValidationError;
  }
>(
  'partners/createPartnerOrder',
  async (partnerMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<IPartnerOrderMutation>(
        '/partnerOrders',
        partnerMutation,
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

export const deletePartnerOrder = createAsyncThunk<
  void,
  string,
  { rejectValue: ValidationError }
>('partners/deleteOrder', async (id, { rejectWithValue }) => {
  try {
    await axiosApi.delete(`/partnerOrders/${id}`);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const changeStatusPartnerOrder = createAsyncThunk<void, string>(
  'partners/changeStatus',
  async (orderId: string) => {
    await axiosApi.patch(`/partnerOrders/${orderId}/toggle-status`);
  },
);

export const createPartner = createAsyncThunk<
  void,
  IPartnerMutation,
  { rejectValue: ValidationError }
>('partners/create', async (partnerMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(partnerMutation) as (keyof IPartnerMutation)[];
    keys.forEach((key) => {
      const value = partnerMutation[key];

      if (value !== null) {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (typeof item === 'string') {
              formData.append(key, item);
            } else if (item instanceof File) {
              formData.append(key, item, item.name);
            } else {
              formData.append(key, JSON.stringify(item));
            }
          });
        } else {
          formData.append(key, value as string);
        }
      }
    });
    await axiosApi.post('/partners', formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});
