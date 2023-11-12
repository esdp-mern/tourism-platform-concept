import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IOrder,
  IPostReview,
  IReview,
  Tour,
  TourFull,
  ValidationError,
} from '../type';
import axiosApi from '../axiosApi';
import { isAxiosError } from 'axios';

export const fetchTours = createAsyncThunk<Tour[], void | string>(
  'tours/fetchAll',
  async (guide) => {
    if (guide) {
      const response = await axiosApi.get<Tour[]>(`/tours/?guide=${guide}`);
      return response.data;
    }
    const response = await axiosApi.get<Tour[]>('/tours');
    return response.data;
  },
);

export const fetchTour = createAsyncThunk<TourFull, string>(
  'tours/fetchOne',
  async (id) => {
    const response = await axiosApi.get<TourFull>(`/tours/${id}`);
    return response.data;
  },
);

export const postReview = createAsyncThunk<
  IReview,
  IPostReview,
  {
    rejectValue: ValidationError;
  }
>('reviews/postOne', async (formData: IPostReview, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<IReview>('/reviews', formData);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const createOrder = createAsyncThunk<void, IOrder>(
  'orders/createOne',
  async (order) => {
    await axiosApi.post('/orders', order);
  },
);
