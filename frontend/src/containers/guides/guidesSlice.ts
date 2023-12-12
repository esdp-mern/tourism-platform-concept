import { IGuideFull } from '@/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '@/store/store';
import {
  becomeGuide,
  createGuide,
  fetchGuides,
} from '@/containers/guides/guidesThunk';

interface guidesState {
  guides: IGuideFull[];
  fetchAllLoading: boolean;
  guideRequestLoading: boolean;
  createGuideLoading: boolean;
}

const initialState: guidesState = {
  guides: [],
  fetchAllLoading: false,
  guideRequestLoading: false,
  createGuideLoading: false,
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
