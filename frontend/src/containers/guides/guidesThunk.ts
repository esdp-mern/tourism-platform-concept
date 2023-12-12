import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ICreateGuide,
  IGuide,
  IGuideFull,
  IGuideRequest,
  ISendGuideRequest,
} from '@/type';
import axiosApi from '@/axiosApi';

export const fetchGuides = createAsyncThunk('guides/fetchAll', async () => {
  const response = await axiosApi.get<IGuideFull[]>('/guides');
  return response.data;
});

export const becomeGuide = createAsyncThunk<IGuideRequest, ISendGuideRequest>(
  'guides/sendRequest',
  async (guideData: ISendGuideRequest) => {
    try {
      const request = await axiosApi.post('guideOrders', guideData);
      return request.data;
    } catch (e) {
      throw e;
    }
  },
);

export const createGuide = createAsyncThunk<IGuide, ICreateGuide>(
  'guides/createGuide',
  async (guideData: ICreateGuide) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(guideData) as (keyof ICreateGuide)[];

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
