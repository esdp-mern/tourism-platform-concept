import { INews } from '@/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '@/store/store';
import { fetchNews, fetchOneNews } from '@/containers/news/newsThunk';

interface NewsState {
  news: INews[];
  fetchAllLoading: boolean;
  oneNews: INews | null;
  fetchOneLoading: boolean;
}

const initialState: NewsState = {
  news: [],
  fetchAllLoading: false,
  oneNews: null,
  fetchOneLoading: false,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(
      HYDRATE,
      (state, action) => {
        return { ...state, ...action.payload.news };
      },
    );
    builder.addCase(fetchNews.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(fetchNews.fulfilled, (state, { payload: news }) => {
      state.news = news;
      state.fetchAllLoading = false;
    });
    builder.addCase(fetchNews.rejected, (state) => {
      state.fetchAllLoading = false;
    });

    builder.addCase(fetchOneNews.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOneNews.fulfilled, (state, action) => {
      state.fetchOneLoading = false;
      state.oneNews = action.payload;
    });
    builder.addCase(fetchOneNews.rejected, (state) => {
      state.fetchOneLoading = false;
    });
  },
});

export const selectAllNews = (state: RootState) => state.news.news;
export const selectOneNews = (state: RootState) => state.news.oneNews;
