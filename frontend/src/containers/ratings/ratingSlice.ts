import { createSlice } from '@reduxjs/toolkit';
import { RatingOfTour } from '@/type';
import { RootState } from '@/store/store';
import { fetchTourRating } from '@/containers/ratings/ratingThunk';

interface ToursRatingState {
  toursRating: RatingOfTour[];
  fetchAllLoading: boolean;
}

const initialState: ToursRatingState = {
  toursRating: [],
  fetchAllLoading: false,
};

export const toursRatingSlice = createSlice({
  name: 'toursRating',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTourRating.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(
      fetchTourRating.fulfilled,
      (state, { payload: toursRating }) => {
        state.toursRating = toursRating;
        state.fetchAllLoading = false;
      },
    );
    builder.addCase(fetchTourRating.rejected, (state) => {
      state.fetchAllLoading = false;
    });
  },
});

export const toursRatingReducer = toursRatingSlice.reducer;
export const selectToursRating = (state: RootState) =>
  state.ratings.toursRating;
