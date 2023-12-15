import { IPartnerOrder, ValidationError } from '@/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '@/store/store';
import {
  createPartnerOrder,
  deletePartnerOrder,
  fetchPartnerOrders,
} from '@/containers/partners/partnersThunk';

interface NewsState {
  partnerOrders: IPartnerOrder[];
  fetchAllLoading: boolean;
  oneOrder: IPartnerOrder | null;
  fetchOneLoading: boolean;
  postOrderLoading: boolean;
  postOrderError: ValidationError | null;
  deleteLoading: boolean | string;
}

const initialState: NewsState = {
  partnerOrders: [],
  fetchAllLoading: false,
  oneOrder: null,
  fetchOneLoading: false,
  postOrderLoading: false,
  postOrderError: null,
  deleteLoading: false,
};

export const partnersSlice = createSlice({
  name: 'partners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(
      HYDRATE,
      (state, action) => {
        return { ...state, ...action.payload.partners };
      },
    );
    builder.addCase(fetchPartnerOrders.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(
      fetchPartnerOrders.fulfilled,
      (state, { payload: partnerOrders }) => {
        state.partnerOrders = partnerOrders;
        state.fetchAllLoading = false;
      },
    );
    builder.addCase(fetchPartnerOrders.rejected, (state) => {
      state.fetchAllLoading = false;
    });

    builder.addCase(createPartnerOrder.pending, (state) => {
      state.postOrderLoading = true;
      state.postOrderError = null;
    });
    builder.addCase(createPartnerOrder.fulfilled, (state) => {
      state.postOrderLoading = false;
    });
    builder.addCase(
      createPartnerOrder.rejected,
      (state, { payload: error }) => {
        state.postOrderLoading = false;
        state.postOrderError = error || null;
      },
    );

    builder.addCase(deletePartnerOrder.pending, (state, action) => {
      state.deleteLoading = action.meta.arg;
    });
    builder.addCase(deletePartnerOrder.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deletePartnerOrder.rejected, (state) => {
      state.deleteLoading = false;
    });
  },
});

export const selectAllPartnerOrders = (state: RootState) =>
  state.partners.partnerOrders;
export const selectDeletePartnerOrderLoading = (state: RootState) =>
  state.partners.deleteLoading;
export const selectPartnerOrderPublishLoading = (state: RootState) =>
  state.partners.postOrderLoading;
