import { createSlice } from '@reduxjs/toolkit';
import { fetchToursReviews } from './reviewThunk';
import { Review } from '@/type';
import { RootState } from '@/store/store';

interface ToursReviewState {
  toursReview: Review[];
  fetchAllLoading: boolean;
}

const initialState: ToursReviewState = {
  toursReview: [],
  fetchAllLoading: false,
};

export const toursReviewSlice = createSlice({
  name: 'toursReview',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchToursReviews.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(
      fetchToursReviews.fulfilled,
      (state, { payload: toursReview }) => {
        state.toursReview = toursReview;
        state.fetchAllLoading = false;
      },
    );
    builder.addCase(fetchToursReviews.rejected, (state) => {
      state.fetchAllLoading = false;
    });
  },
});

export const toursReviewReducer = toursReviewSlice.reducer;
export const selectToursReviews = (state: RootState) =>
  state.reviews.toursReview;
