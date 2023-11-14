import { User, ValidationError } from '../type';
import { createSlice } from '@reduxjs/toolkit';
import { googleLogin, logout, signIn, signUp } from './usersThunk';
import { RootState } from '../app/store';
import { nanoid } from 'nanoid';

interface UsersState {
  user: User | null;
  registerLoading: boolean;
  signUpError: ValidationError | null;
  signInLoading: boolean;
  signInError: {
    error: string;
  } | null;
  alerts: {
    message: string;
    type: string;
    id: string;
    visible: boolean;
    className: string;
  }[];
  logoutLoading: boolean;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  signUpError: null,
  signInLoading: false,
  signInError: null,
  alerts: [],
  logoutLoading: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addAlert: (state, action) => {
      state.alerts.push({
        message: action.payload.message,
        type: action.payload.type,
        id: nanoid(),
        visible: true,
        className: '',
      });
    },
    disableAlert: (state, action) => {
      const alertIndex = state.alerts.findIndex(
        (alert) => alert.id === action.payload,
      );
      state.alerts[alertIndex].className = 'disabled';
    },
    resetSignInError: (state) => {
      state.signInError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.registerLoading = true;
      state.signUpError = null;
    });
    builder.addCase(signUp.fulfilled, (state, { payload: userResponse }) => {
      state.registerLoading = false;
      state.user = userResponse.user;
    });
    builder.addCase(signUp.rejected, (state, { payload: error }) => {
      state.registerLoading = false;
      state.signUpError = error || null;
    });

    builder.addCase(signIn.pending, (state) => {
      state.signInLoading = true;
      state.signInError = null;
    });
    builder.addCase(signIn.fulfilled, (state, { payload: userResponse }) => {
      state.signInLoading = false;
      state.user = userResponse.user;
    });
    builder.addCase(signIn.rejected, (state, { payload: error }) => {
      state.signInLoading = false;
      state.signInError = error || null;
    });

    builder.addCase(googleLogin.pending, (state) => {
      state.signInLoading = true;
    });

    builder.addCase(
      googleLogin.fulfilled,
      (state, { payload: userResponse }) => {
        state.signInLoading = false;
        state.user = userResponse;
      },
    );

    builder.addCase(googleLogin.rejected, (state, { payload: error }) => {
      state.signInLoading = false;

      state.signInError = error || null;
    });

    builder.addCase(logout.pending, (state) => {
      state.logoutLoading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.logoutLoading = false;
      state.user = null;
    });
    builder.addCase(logout.rejected, (state) => {
      state.logoutLoading = false;
    });
  },
});

export const { addAlert, disableAlert, resetSignInError } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
export const selectUser = (state: RootState) => state.users.user;
export const selectSignUpLoading = (state: RootState) =>
  state.users.registerLoading;
export const selectSignUpError = (state: RootState) => state.users.signUpError;
export const selectSignInLoading = (state: RootState) =>
  state.users.signInLoading;
export const selectSignInError = (state: RootState) => state.users.signInError;
export const selectAlerts = (state: RootState) => state.users.alerts;
export const selectLogoutLoading = (state: RootState) =>
  state.users.logoutLoading;
