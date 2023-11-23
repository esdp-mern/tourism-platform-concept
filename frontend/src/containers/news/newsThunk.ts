import { createAsyncThunk } from '@reduxjs/toolkit';
import { INews } from '@/type';
import axiosApi from '@/axiosApi';

export const fetchNews = createAsyncThunk<INews[]>(
  'news/fetchAll',
  async () => {
    const response = await axiosApi.get<INews[]>('/news');
    return response.data;
  },
);

export const fetchOneNews = createAsyncThunk<INews, string>(
  'news/fetchOne',
  async (id) => {
    const response = await axiosApi.get(`/news/${id}`);
    return response.data;
  },
);
