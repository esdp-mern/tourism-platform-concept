import { Tour, TourFull, ValidationError } from '../type';
import { createSlice } from '@reduxjs/toolkit';
import { fetchTour, fetchTours, postReview } from './toursThunk';
import { RootState } from '../app/store';

interface ToursState {
  tours: Tour[];
  tour: TourFull | null;
  fetchAllLoading: boolean;
  fetchOneLoading: boolean;
  tourReviews: [];
  postReviewError: ValidationError | null;
  postReviewLoading: boolean;
}

const initialState: ToursState = {
  tours: [],
  tour: null,
  fetchAllLoading: false,
  fetchOneLoading: false,
  tourReviews: [],
  postReviewError: null,
  postReviewLoading: false,
};

export const toursSlice = createSlice({
  name: 'tours',
  initialState,
  reducers: {
    resetPostReviewError: (state) => {
      state.postReviewError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTours.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(fetchTours.fulfilled, (state, { payload: tours }) => {
      state.tours = tours;
      state.fetchAllLoading = false;
    });
    builder.addCase(fetchTours.rejected, (state) => {
      state.fetchAllLoading = false;
    });

    builder.addCase(fetchTour.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchTour.fulfilled, (state, action) => {
      state.fetchOneLoading = false;
      state.tour = action.payload;
    });
    builder.addCase(fetchTour.rejected, (state) => {
      state.fetchOneLoading = false;
    });

    builder.addCase(postReview.pending, (state) => {
      state.postReviewLoading = true;
      state.postReviewError = null;
    });
    builder.addCase(postReview.fulfilled, (state) => {
      state.postReviewLoading = false;
    });
    builder.addCase(postReview.rejected, (state, { payload: error }) => {
      state.postReviewLoading = false;
      state.postReviewError = error || null;
    });
  },
});

export const { resetPostReviewError } = toursSlice.actions;
export const toursReducer = toursSlice.reducer;
export const selectAllTours = (state: RootState) => state.tours.tours;
export const selectOneTour = (state: RootState) => state.tours.tour;
export const selectFetchAllLoading = (state: RootState) =>
  state.tours.fetchAllLoading;
export const selectFetchOneLoading = (state: RootState) =>
  state.tours.fetchOneLoading;
export const selectPostReviewError = (state: RootState) =>
  state.tours.postReviewError;
export const selectPostReviewLoading = (state: RootState) =>
  state.tours.postReviewLoading;
export const selectTourReviews = (state: RootState) => state.tours.tourReviews;
