import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IOrder,
  ITourMutation,
  ITourReview,
  ITourReview2,
  Tour,
  TourFull,
  ValidationError,
} from '@/type';
import axiosApi from '@/axiosApi';
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

export const tourReview = createAsyncThunk<
  ITourReview,
  ITourReview2,
  {
    rejectValue: ValidationError;
  }
>('reviews/postOne', async (formData: ITourReview, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<ITourReview>('/tourReviews', formData);
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

export const postTour = createAsyncThunk<
  void,
  ITourMutation,
  { rejectValue: ValidationError }
>('tours/create', async (tourMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(tourMutation) as (keyof ITourMutation)[];
    keys.forEach((key) => {
      const value = tourMutation[key];

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
        } else if (value instanceof File) {
          formData.append(key, value, value.name);
        } else {
          formData.append(key, value as string);
        }
      }
    });
    await axiosApi.post('/tours', formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

interface updateTourParams {
  id: string;
  tourMutation: ITourMutation;
}

export const editTour = createAsyncThunk<
  void,
  updateTourParams,
  { rejectValue: ValidationError }
>('tours/edit', async (updateTourParams, { rejectWithValue }) => {
  try {
    const tourMutation = updateTourParams.tourMutation;
    const formData = new FormData();
    const keys = Object.keys(tourMutation) as (keyof ITourMutation)[];
    keys.forEach((key) => {
      const value = tourMutation[key];

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
        } else if (value instanceof File) {
          formData.append(key, value, value.name);
        } else {
          formData.append(key, value as string);
        }
      }
    });
    await axiosApi.put(`/tours/${updateTourParams.id}`, formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const deleteTour = createAsyncThunk<
  void,
  string,
  { rejectValue: ValidationError }
>('tours/delete', async (id, { rejectWithValue }) => {
  try {
    await axiosApi.delete(`/tours/${id}`);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});
