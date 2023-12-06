import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createOrder,
  deleteTour,
  editTour,
  fetchAdminTours,
  fetchTour,
  fetchTours,
  fetchToursByFilter,
  fetchToursByPrice,
  postTour,
  publishTour,
  tourReview,
} from './toursThunk';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '@/store/store';
import { Tour, TourFull, ValidationError } from '@/type';

interface ToursState {
  tours: Tour[];
  tour: TourFull | null;
  fetchAllLoading: boolean;
  fetchAdminTourLoading: boolean;
  fetchOneLoading: boolean;
  postTourLoading: boolean;
  postTourError: ValidationError | null;
  tourReviews: [];
  postReviewError: ValidationError | null;
  postReviewLoading: boolean;
  orderButtonLoading: boolean;
  editLoading: boolean;
  deleteLoading: boolean | string;
  publishLoading: boolean | string;
  modal: boolean;
  hotTours: Tour[];
}

const initialState: ToursState = {
  tours: [],
  tour: null,
  fetchAllLoading: false,
  fetchAdminTourLoading: false,
  fetchOneLoading: false,
  postTourLoading: false,
  postTourError: null,
  tourReviews: [],
  postReviewError: null,
  postReviewLoading: false,
  orderButtonLoading: false,
  editLoading: false,
  deleteLoading: false,
  publishLoading: false,
  modal: false,
  hotTours: [],
};

export const toursSlice = createSlice({
  name: 'tours',
  initialState,
  reducers: {
    resetPostReviewError: (state) => {
      state.postReviewError = null;
    },
    showModal: (state, action) => {
      state.modal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(
      HYDRATE,
      (state, action) => {
        return { ...state, ...action.payload.tours };
      },
    );

    builder.addCase(fetchTours.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(fetchTours.fulfilled, (state, { payload: tours }) => {
      state.tours = tours;
      tours.length >= 4
        ? (state.hotTours = [tours[0], tours[1], tours[2], tours[3]])
        : (state.hotTours = []);
      state.fetchAllLoading = false;
    });
    builder.addCase(fetchTours.rejected, (state) => {
      state.fetchAllLoading = false;
    });

    builder.addCase(fetchToursByFilter.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(
      fetchToursByFilter.fulfilled,
      (state, { payload: tours }) => {
        state.tours = tours;
        state.fetchAllLoading = false;
      },
    );
    builder.addCase(fetchToursByFilter.rejected, (state) => {
      state.fetchAllLoading = false;
    });

    builder.addCase(fetchToursByPrice.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(
      fetchToursByPrice.fulfilled,
      (state, { payload: tours }) => {
        state.tours = tours;
        state.fetchAllLoading = false;
      },
    );
    builder.addCase(fetchToursByPrice.rejected, (state) => {
      state.fetchAllLoading = false;
    });

    builder.addCase(fetchAdminTours.pending, (state) => {
      state.fetchAdminTourLoading = true;
    });
    builder.addCase(fetchAdminTours.fulfilled, (state, { payload: tours }) => {
      state.tours = tours;
      state.fetchAdminTourLoading = false;
    });
    builder.addCase(fetchAdminTours.rejected, (state) => {
      state.fetchAdminTourLoading = false;
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

    builder.addCase(tourReview.pending, (state) => {
      state.postReviewLoading = true;
      state.postReviewError = null;
    });
    builder.addCase(tourReview.fulfilled, (state) => {
      state.postReviewLoading = false;
    });
    builder.addCase(tourReview.rejected, (state, { payload: error }) => {
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

    builder.addCase(editTour.pending, (state) => {
      state.editLoading = true;
    });
    builder.addCase(editTour.fulfilled, (state) => {
      state.editLoading = false;
    });
    builder.addCase(editTour.rejected, (state) => {
      state.editLoading = false;
    });

    builder.addCase(deleteTour.pending, (state, action) => {
      state.deleteLoading = action.meta.arg;
    });
    builder.addCase(deleteTour.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteTour.rejected, (state) => {
      state.deleteLoading = false;
    });

    builder.addCase(publishTour.pending, (state, action) => {
      state.publishLoading = action.meta.arg;
    });
    builder.addCase(publishTour.fulfilled, (state) => {
      state.publishLoading = false;
    });
    builder.addCase(publishTour.rejected, (state) => {
      state.publishLoading = false;
    });
  },
});

export const { resetPostReviewError, showModal } = toursSlice.actions;
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

export const selectEditTourLoading = (state: RootState) =>
  state.tours.editLoading;
export const selectDeleteTourLoading = (state: RootState) =>
  state.tours.deleteLoading;
export const selectTourPublishLoading = (state: RootState) =>
  state.tours.publishLoading;
export const selectAdminTourLoading = (state: RootState) =>
  state.tours.fetchAdminTourLoading;
export const galleryModal = (state: RootState) => state.tours.modal;
export const selectHotTours = (state: RootState) => state.tours.hotTours;
