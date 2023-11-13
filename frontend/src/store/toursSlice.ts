import { Tour, TourFull, ValidationError } from '../type';
import { createSlice } from '@reduxjs/toolkit';
import {
  createOrder,
  fetchTour,
  fetchTours,
  postReview,
  postTour,
} from './toursThunk';
import { RootState } from '../app/store';

interface ToursState {
  tours: Tour[];
  tour: TourFull | null;
  fetchAllLoading: boolean;
  fetchOneLoading: boolean;
  postTourLoading: boolean;
  postTourError: ValidationError | null;
  tourReviews: [];
  postReviewError: ValidationError | null;
  postReviewLoading: boolean;
  orderButtonLoading: boolean;
}

const initialState: ToursState = {
  tours: [],
  tour: null,
  fetchAllLoading: false,
  fetchOneLoading: false,
  postTourLoading: false,
  postTourError: null,
  tourReviews: [],
  postReviewError: null,
  postReviewLoading: false,
  orderButtonLoading: false,
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

    builder.addCase(createOrder.pending, (state) => {
      state.orderButtonLoading = true;
    });
    builder.addCase(createOrder.fulfilled, (state) => {
      state.orderButtonLoading = false;
    });
    builder.addCase(createOrder.rejected, (state) => {
      state.orderButtonLoading = false;
    });
    builder.addCase(postTour.pending, (state) => {
      state.postTourLoading = true;
      state.postTourError = null;
    });
    builder.addCase(postTour.fulfilled, (state) => {
      state.postTourLoading = false;
    });
    builder.addCase(postTour.rejected, (state, { payload: error }) => {
      state.postTourLoading = false;
      state.postTourError = error || null;
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
export const selectPostTourLoading = (state: RootState) =>
  state.tours.postTourLoading;
export const selectPostTourError = (state: RootState) =>
  state.tours.postTourError;
