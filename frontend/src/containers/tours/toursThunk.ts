import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IOrder,
  ITourMutation,
  ITourReview,
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

export const fetchToursByFilter = createAsyncThunk<
  Tour[],
  { type: string; value?: string | undefined }
>('tours/fetchByFilter', async (arg) => {
  let url = '/tours';

  if (arg.type === 'name') {
    url = `/tours/filterByName?name=${arg.value}`;
  } else if (arg.type === 'categories') {
    url = `/tours/filterByCategory?category=${arg.value}`;
  }

  const response = await axiosApi<Tour[]>(url);
  return response.data;
});

export const fetchToursByPrice = createAsyncThunk<Tour[], string>(
  'tours/fetchByPrice',
  async (type) => {
    const response = await axiosApi.get<Tour[]>(
      `/tours/filterBy${type === 'max' ? 'Max' : 'Min'}Price`,
    );
    return response.data;
  },
);
export const fetchAdminTours = createAsyncThunk<Tour[], void | boolean>(
  'tours/fetchAdminAll',
  async (all) => {
    if (all) {
      const response = await axiosApi.get<Tour[]>('/tours/all?true=all');
      return response.data;
    }
    const response = await axiosApi.get<Tour[]>('/tours/all');
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

export const publishTour = createAsyncThunk<void, string>(
  'tours/publish',
  async (tourID: string) => {
    await axiosApi.patch(`/tours/${tourID}/togglePublished`);
  },
);

export const tourReview = createAsyncThunk<
  ITourReview,
  ITourReview,
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
    console.log(tourMutation);
    keys.forEach((key) => {
      const value = tourMutation[key];

      if (value !== null) {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (item instanceof File) {
              formData.append(key, item, item.name);
            }
          });
          formData.append(key, JSON.stringify(value));
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

export const fetchToursGuide = createAsyncThunk(
  'tours/guideTours',
  async (id: string) => {
    const response = await axiosApi.get<Tour[]>(`/tours?guide=${id}`);
    return response.data;
  },
);
