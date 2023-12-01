import { createAsyncThunk } from '@reduxjs/toolkit';
import { IEmployee } from '@/type';
import axiosApi from '@/axiosApi';

export const fetchEmployees = createAsyncThunk<IEmployee[], void | string>(
  'about/fetchAll',
  async () => {
    const response = await axiosApi.get<IEmployee[]>('/employees');
    return response.data;
  },
);
