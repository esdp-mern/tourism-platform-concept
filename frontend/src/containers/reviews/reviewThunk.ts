import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReviewOfGuides, ReviewOfPlatform, ReviewOfTour } from '@/type';
import axiosApi from '@/axiosApi';

export const fetchToursReviews = createAsyncThunk<
  ReviewOfTour[],
  void | string
>('toursReview/fetchAll', async (id) => {
  if (id) {
    const response = await axiosApi.get<ReviewOfTour[]>(
      `/tourReviews?tourID=${id}`,
    );
    return response.data;
  } else {
    const response = await axiosApi.get<ReviewOfTour[]>(`/tourReviews`);
    return response.data;
  }
});

export const fetchGuideReviews = createAsyncThunk<
  ReviewOfGuides[],
  void | string
>('guidesReview/fetchAll', async (id) => {
  if (id) {
    const response = await axiosApi.get<ReviewOfGuides[]>(
      `/guideReviews?guideID=${id}`,
    );
    return response.data;
  } else {
    const response = await axiosApi.get<ReviewOfGuides[]>(`/guideReviews`);
    return response.data;
  }
});

export const fetchPlatformReviews = createAsyncThunk<ReviewOfPlatform[]>(
  'platformReview/fetchAll',
  async () => {
    const response = await axiosApi.get<ReviewOfPlatform[]>(`/platformReviews`);
    return response.data;
  },
);
