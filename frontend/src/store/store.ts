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
import { newsSlice } from '@/containers/news/newsSlice';
import { aboutSlice } from '@/containers/about/aboutSlice';
import { ordersSlice } from '@/containers/orders/ordersSlice';
import { toursRatingSlice } from '@/containers/ratings/ratingSlice';
import { reviewSlice } from '@/containers/reviews/reviewSlice';
import { configReducer, configSlice } from '@/containers/config/configSlice';
import { sliderSlice } from '@/containers/slider/sliderSlice';

const usersPersistConfig = {
  key: 'tourism-platform-concept:users',
  storage,
  whitelist: ['user'],
};

const makeStore = () => {
  const isServer = typeof window === 'undefined';

  const reducers = {
    [configSlice.name]: configReducer,
    [ordersSlice.name]: ordersSlice.reducer,
    [newsSlice.name]: newsSlice.reducer,
    about: aboutSlice.reducer,
    [sliderSlice.name]: sliderSlice.reducer,
    [toursSlice.name]: toursSlice.reducer,
    [guidesSlice.name]: guidesSlice.reducer,
    reviews: reviewSlice.reducer,
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
