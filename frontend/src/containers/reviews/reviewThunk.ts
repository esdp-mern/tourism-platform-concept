import { createAsyncThunk } from '@reduxjs/toolkit';
import { Review } from '@/type';
import axiosApi from '@/axiosApi';

export const fetchToursReviews = createAsyncThunk<Review[], void | string>(
  'toursReview/fetchAll',
  async (id) => {
    const response = await axiosApi.get<Review[]>(`/reviews?tourID=${id}`);
    return response.data;
  },
);
