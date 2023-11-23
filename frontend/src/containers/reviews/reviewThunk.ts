import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReviewOfTour } from '@/type';
import axiosApi from '@/axiosApi';

export const fetchToursReviews = createAsyncThunk<
  ReviewOfTour[],
  void | string
>('toursReview/fetchAll', async (id) => {
  const response = await axiosApi.get<ReviewOfTour[]>(
    `/tourReviews?tourID=${id}`,
  );
  return response.data;
});
