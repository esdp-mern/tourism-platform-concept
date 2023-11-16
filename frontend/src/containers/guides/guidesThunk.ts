import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGuide } from '@/type';
import axiosApi from '@/axiosApi';

export const fetchGuides = createAsyncThunk<IGuide[], void | string>(
  'guides/fetchAll',
  async (guide) => {
    const response = await axiosApi.get<IGuide[]>('/guides');
    return response.data;
  },
);
