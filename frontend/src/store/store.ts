import { createWrapper } from 'next-redux-wrapper';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
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

const usersPersistConfig = {
  key: 'tourism-platform-concept:users',
  storage,
  whitelist: ['user'],
};

const makeStore = () => {
  const isServer = typeof window === 'undefined';

  const reducers = {
    [toursSlice.name]: toursSlice.reducer,
    [usersSlice.name]: isServer
      ? usersSlice.reducer
      : persistReducer(usersPersistConfig, usersSlice.reducer),
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
