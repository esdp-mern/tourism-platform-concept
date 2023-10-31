import { Tour } from "../type";
import { createSlice } from "@reduxjs/toolkit";
import { fetchTour, fetchTours } from "./toursThunk";
import { RootState } from "../app/store";

interface ToursState {
  tours: Tour[];
  tour: Tour | null;
  fetchAllLoading: boolean;
  fetchOneLoading: boolean;
}

const initialState: ToursState = {
  tours: [],
  tour: null,
  fetchAllLoading: false,
  fetchOneLoading: false,
};

export const toursSlice = createSlice({
  name: "tours",
  initialState,
  reducers: {},
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
  },
});

export const toursReducer = toursSlice.reducer;
export const selectAllTours = (state: RootState) => state.tours.tours;
export const selectOneTour = (state: RootState) => state.tours.tour;
export const selectFetchAllLoading = (state: RootState) =>
  state.tours.fetchAllLoading;
export const selectFetchOneLoading = (state: RootState) =>
  state.tours.fetchOneLoading;
