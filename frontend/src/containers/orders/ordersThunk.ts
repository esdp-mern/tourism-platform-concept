import { createAsyncThunk } from '@reduxjs/toolkit';
import { IOrder2 } from '@/type';
import axiosApi from '@/axiosApi';

export const fetchOrders = createAsyncThunk<IOrder2[], void | string>(
  'orders/fetchAll',
  async () => {
    const response = await axiosApi.get<IOrder2[]>('/orders');
    return response.data;
  },
);
