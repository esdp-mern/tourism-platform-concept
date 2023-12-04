import { createAsyncThunk } from '@reduxjs/toolkit';
import { IEmployee, IPartner } from '@/type';
import axiosApi from '@/axiosApi';

export const fetchEmployees = createAsyncThunk<IEmployee[], void | string>(
  'about/fetchAllEmployees',
  async () => {
    const response = await axiosApi.get<IEmployee[]>('/employees');
    return response.data;
  },
);

export const fetchPartners = createAsyncThunk<IPartner[], void | string>(
  'about/fetchAllPartners',
  async () => {
    const response = await axiosApi.get<IPartner[]>('/partners');
    return response.data;
  },
);
