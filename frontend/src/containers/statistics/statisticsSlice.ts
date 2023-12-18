import { IStatisticsAdmin } from '@/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '@/store/store';
import { fetchStatsAdmin } from '@/containers/statistics/statisticsThunk';

interface adminStatsState {
  statsAdmin: IStatisticsAdmin | null;
  statsAdminFetchLoading: boolean;
}

const initialState: adminStatsState = {
  statsAdmin: null,
  statsAdminFetchLoading: false,
};

export const statsAdminSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(
      HYDRATE,
      (state, action) => {
        return { ...state, ...action.payload.news };
      },
    );
    builder.addCase(fetchStatsAdmin.pending, (state) => {
      state.statsAdminFetchLoading = true;
    });
    builder.addCase(fetchStatsAdmin.fulfilled, (state, { payload }) => {
      state.statsAdmin = payload;
      state.statsAdminFetchLoading = false;
    });
    builder.addCase(fetchStatsAdmin.rejected, (state) => {
      state.statsAdminFetchLoading = false;
    });
  },
});

export const selectAdminStats = (state: RootState) =>
  state.statsAdmin.statsAdmin;
export const selectStatsFetchLoading = (state: RootState) =>
  state.statsAdmin.statsAdminFetchLoading;
