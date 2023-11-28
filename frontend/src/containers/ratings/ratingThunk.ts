import { createAsyncThunk } from '@reduxjs/toolkit';
import { RatingOfTour } from '@/type';
import axiosApi from '@/axiosApi';

export const fetchTourRating = createAsyncThunk<RatingOfTour[], void | string>(
  'toursRating/fetchAll',
  async (id) => {
    const response = await axiosApi.get<RatingOfTour[]>(
      `/tourRatings?tourID=${id}`,
    );
    return response.data;
  },
);
