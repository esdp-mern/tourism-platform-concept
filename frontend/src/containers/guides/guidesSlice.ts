import { IGuideFull } from '@/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '@/store/store';
import {
  becomeGuide,
  createGuide,
  fetchGuides,
  fetchGuide,
  fetchAdminGuides,
  deleteGuide,
  fetchGuideNameByFilter,
} from '@/containers/guides/guidesThunk';

interface guidesState {
  guides: IGuideFull[];
  guide: IGuideFull | null;
  fetchAllLoading: boolean;
  fetchOneLoading: boolean;
  guideRequestLoading: boolean;
  createGuideLoading: boolean;
  fetchAdminGuidesLoading: boolean;
  deleteLoading: boolean | string;
}

const initialState: guidesState = {
  guides: [],
  guide: null,
  fetchAllLoading: false,
  fetchOneLoading: false,
  guideRequestLoading: false,
  createGuideLoading: false,
  fetchAdminGuidesLoading: false,
  deleteLoading: false,
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
    builder.addCase(fetchAdminGuides.pending, (state) => {
      state.fetchAdminGuidesLoading = true;
    });
    builder.addCase(
      fetchAdminGuides.fulfilled,
      (state, { payload: guides }) => {
        state.guides = guides;
        state.fetchAdminGuidesLoading = false;
      },
    );
    builder.addCase(fetchAdminGuides.rejected, (state) => {
      state.fetchAdminGuidesLoading = false;
    });
    builder.addCase(fetchGuide.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchGuide.fulfilled, (state, { payload: guide }) => {
      state.fetchOneLoading = false;
      state.guide = guide;
    });
    builder.addCase(fetchGuide.rejected, (state) => {
      state.fetchOneLoading = false;
    });
    builder.addCase(fetchGuideNameByFilter.pending, (state) => {
      state.fetchAdminGuidesLoading = true;
    });
    builder.addCase(
      fetchGuideNameByFilter.fulfilled,
      (state, { payload: tours }) => {
        state.guides = tours;
        state.fetchAdminGuidesLoading = false;
      },
    );
    builder.addCase(fetchGuideNameByFilter.rejected, (state) => {
      state.fetchAdminGuidesLoading = false;
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
    builder.addCase(deleteGuide.pending, (state, action) => {
      state.deleteLoading = action.meta.arg;
    });
    builder.addCase(deleteGuide.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteGuide.rejected, (state) => {
      state.deleteLoading = false;
    });
  },
});

export const guidesReducer = guidesSlice.reducer;
export const selectGuides = (state: RootState) => state.guides.guides;
export const selectFetchGuidesLoading = (state: RootState) =>
  state.guides.fetchAllLoading;
export const selectOneGuide = (state: RootState) => state.guides.guide;
export const selectGuideLoading = (state: RootState) =>
  state.guides.fetchOneLoading;
export const selectGuideRequestLoading = (state: RootState) =>
  state.guides.guideRequestLoading;
export const selectCreateGuideLoading = (state: RootState) =>
  state.guides.createGuideLoading;
