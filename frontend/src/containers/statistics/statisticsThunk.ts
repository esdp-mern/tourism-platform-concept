import { createAsyncThunk } from '@reduxjs/toolkit';
import { IStatisticsAdmin } from '@/type';
import axiosApi from '@/axiosApi';

export const fetchStatsAdmin = createAsyncThunk<
  IStatisticsAdmin,
  void | string
>('stats/fetchAll', async () => {
  const response = await axiosApi.get<IStatisticsAdmin>('/statistics');
  return response.data;
});
