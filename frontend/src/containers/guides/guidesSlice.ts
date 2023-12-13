import { IGuideFull, IGuideRequest } from '@/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '@/store/store';
import {
  becomeGuide,
  createGuide,
  deleteGuideOrder,
  fetchGuideOrders,
  fetchGuides,
  fetchOneGuideOrder,
} from '@/containers/guides/guidesThunk';

interface guidesState {
  guides: IGuideFull[];
  guideOrders: IGuideRequest[];
  oneGuideOrder: IGuideRequest | null;
  fetchAllLoading: boolean;
  fetchAllOrdersLoading: boolean;
  guideRequestLoading: boolean;
  createGuideLoading: boolean;
  deleteOrderLoading: boolean | string;
  fetchOneOrderLoading: boolean;
}

const initialState: guidesState = {
  guides: [],
  guideOrders: [],
  oneGuideOrder: null,
  fetchAllLoading: false,
  fetchAllOrdersLoading: false,
  guideRequestLoading: false,
  createGuideLoading: false,
  deleteOrderLoading: false,
  fetchOneOrderLoading: false,
};

export const guidesSlice = createSlice({
  name: 'guides',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(
      HYDRATE,
      (state, action) => {
        return { ...state, ...action.payload.tours };
      },
    );

    builder.addCase(fetchGuides.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(fetchGuides.fulfilled, (state, { payload: guides }) => {
      state.guides = guides;
      state.fetchAllLoading = false;
    });
    builder.addCase(fetchGuides.rejected, (state) => {
      state.fetchAllLoading = false;
    });

    builder.addCase(becomeGuide.pending, (state) => {
      state.guideRequestLoading = true;
    });
    builder.addCase(becomeGuide.fulfilled, (state) => {
      state.guideRequestLoading = false;
    });
    builder.addCase(becomeGuide.rejected, (state) => {
      state.guideRequestLoading = false;
    });

    builder.addCase(createGuide.pending, (state) => {
      state.createGuideLoading = true;
    });
    builder.addCase(createGuide.fulfilled, (state) => {
      state.createGuideLoading = false;
    });
    builder.addCase(createGuide.rejected, (state) => {
      state.createGuideLoading = false;
    });

    builder.addCase(fetchOneGuideOrder.pending, (state) => {
      state.fetchOneOrderLoading = true;
    });
    builder.addCase(
      fetchOneGuideOrder.fulfilled,
      (state, { payload: oneGuideOrder }) => {
        state.fetchOneOrderLoading = false;
        state.oneGuideOrder = oneGuideOrder;
      },
    );
    builder.addCase(fetchOneGuideOrder.rejected, (state) => {
      state.fetchOneOrderLoading = false;
    });

    builder.addCase(fetchGuideOrders.pending, (state) => {
      state.fetchAllOrdersLoading = true;
    });
    builder.addCase(
      fetchGuideOrders.fulfilled,
      (state, { payload: guideOrders }) => {
        state.guideOrders = guideOrders;
        state.fetchAllOrdersLoading = false;
      },
    );
    builder.addCase(fetchGuideOrders.rejected, (state) => {
      state.fetchAllOrdersLoading = false;
    });

    builder.addCase(deleteGuideOrder.pending, (state, action) => {
      state.deleteOrderLoading = action.meta.arg;
    });
    builder.addCase(deleteGuideOrder.fulfilled, (state) => {
      state.deleteOrderLoading = false;
    });
    builder.addCase(deleteGuideOrder.rejected, (state) => {
      state.deleteOrderLoading = false;
    });
  },
});

export const guidesReducer = guidesSlice.reducer;
export const selectGuides = (state: RootState) => state.guides.guides;
export const selectFetchGuidesLoading = (state: RootState) =>
  state.guides.fetchAllLoading;
export const selectGuideRequestLoading = (state: RootState) =>
  state.guides.guideRequestLoading;
export const selectCreateGuideLoading = (state: RootState) =>
  state.guides.createGuideLoading;

export const selectGuideOrders = (state: RootState) => state.guides.guideOrders;
export const selectFetchGuideOrdersLoading = (state: RootState) =>
  state.guides.fetchAllOrdersLoading;
export const selectDeleteGuideOrderLoading = (state: RootState) =>
  state.guides.deleteOrderLoading;
export const selectOneGuideOrder = (state: RootState) =>
  state.guides.oneGuideOrder;

export const selectOneGuideOrderLoading = (state: RootState) =>
  state.guides.fetchOneOrderLoading;
