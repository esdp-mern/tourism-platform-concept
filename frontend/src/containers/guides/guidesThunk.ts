import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGuideFull } from '@/type';
import axiosApi from '@/axiosApi';

export const fetchGuides = createAsyncThunk('guides/fetchAll', async () => {
  const response = await axiosApi.get<IGuideFull[]>('/guides');
  return response.data;
});
