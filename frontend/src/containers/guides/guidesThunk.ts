import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ICreateGuideMutation,
  IGuide,
  IGuideFull,
  IGuideRequest,
  ISendGuideRequestMutation,
  ValidationError,
} from '@/type';
import axiosApi from '@/axiosApi';
import { isAxiosError } from 'axios';

export const fetchGuides = createAsyncThunk('guides/fetchAll', async () => {
  const response = await axiosApi.get<IGuideFull[]>('/guides');
  return response.data;
});

export const fetchAdminGuides = createAsyncThunk(
  'guides/fetchAdminGuides',
  async () => {
    const response = await axiosApi.get<IGuideFull[]>('/guides/all');
    return response.data;
  },
);

export const becomeGuide = createAsyncThunk<
  IGuideRequest,
  ISendGuideRequestMutation
>('guides/sendRequest', async (guideData: ISendGuideRequestMutation) => {
  try {
    const request = await axiosApi.post('guideOrders', guideData);
    return request.data;
  } catch (e) {
    throw e;
  }
});

export const createGuide = createAsyncThunk<IGuide, ICreateGuideMutation>(
  'guides/createGuide',
  async (guideData: ICreateGuideMutation) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(guideData) as (keyof ICreateGuideMutation)[];

      for (const key of keys) {
        const value = guideData[key];

        if (value !== undefined && value !== null) {
          if (key === 'image' && value instanceof File) {
            formData.append(key, value, value.name);
          } else if (Array.isArray(value)) {
            value.forEach((val) => formData.append(key, val));
          } else {
            formData.append(key, value.toString());
          }
        }
      }

      const request = await axiosApi.post<IGuide>('/guides', formData);
      return request.data;
    } catch (e) {
      throw e;
    }
  },
);

export const fetchGuideOrders = createAsyncThunk<
  IGuideRequest[],
  void | string
>('guides/fetchAllOrders', async () => {
  const response = await axiosApi.get<IGuideRequest[]>('/guideOrders');
  return response.data;
});

export const fetchOneGuideOrder = createAsyncThunk<IGuideRequest, string>(
  'guides/fetchOneOrder',
  async (id) => {
    const response = await axiosApi.get(`/guideOrders/${id}`);
    return response.data;
  },
);

export const deleteGuideOrder = createAsyncThunk<
  void,
  string,
  { rejectValue: ValidationError }
>('guides/delete', async (id, { rejectWithValue }) => {
  try {
    await axiosApi.delete(`/guideOrders/${id}`);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});
