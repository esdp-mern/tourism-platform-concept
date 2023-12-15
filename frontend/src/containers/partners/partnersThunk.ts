import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPartnerOrder, IPartnerOrderMutation, ValidationError } from '@/type';
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
