import { createWrapper } from 'next-redux-wrapper';
import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { toursSlice } from '@/containers/tours/toursSlice';
import { store } from 'next/dist/build/output/store';
import { persistReducer } from 'redux-persist';
import { usersSlice } from '@/containers/users/usersSlice';
import storage from 'redux-persist/lib/storage';
import { guidesSlice } from '@/containers/guides/guidesSlice';
import { toursReviewSlice } from '@/containers/reviews/reviewSlice';
import { newsSlice } from '@/containers/news/newsSlice';
import { aboutSlice } from '@/containers/about/aboutSlice';
import { ordersSlice } from '@/containers/orders/ordersSlice';
import { toursRatingSlice } from '@/containers/ratings/ratingSlice';

const usersPersistConfig = {
  key: 'tourism-platform-concept:users',
  storage,
  whitelist: ['user'],
};

const makeStore = () => {
  const isServer = typeof window === 'undefined';

  const reducers = {
    [ordersSlice.name]: ordersSlice.reducer,
    [newsSlice.name]: newsSlice.reducer,
    about: aboutSlice.reducer,
    [toursSlice.name]: toursSlice.reducer,
    [guidesSlice.name]: guidesSlice.reducer,
    reviews: toursReviewSlice.reducer,
    ratings: toursRatingSlice.reducer,
    [usersSlice.name]: isServer
      ? usersSlice.reducer
      : (persistReducer(usersPersistConfig, usersSlice.reducer) as Reducer),
  };

  const reducer = combineReducers(reducers);

  const store = configureStore({
    reducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      });
    },
  });

  if (!isServer) {
    // @ts-expect-error
    store.__persistor = persistStore(store);
  }

  return store;
};

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = typeof store.dispatch;
export const wrapper = createWrapper<RootStore>(makeStore);
