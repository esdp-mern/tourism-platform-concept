import { User, ValidationError } from '../type';
import { createSlice } from '@reduxjs/toolkit';
import { logout, signUp, signIn } from './usersThunk';
import { RootState } from '../app/store';

interface UsersState {
  user: User | null;
  registerLoading: boolean;
  signUpError: ValidationError | null;
  signInLoading: boolean;
  signInError: { error: string } | null;
  alertData: {
    message: string;
    type: string;
  } | null;
  logoutLoading: boolean;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  signUpError: null,
  signInLoading: false,
  signInError: null,
  alertData: null,
  logoutLoading: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAlertData: (state, action) => {
      state.alertData = action.payload;
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

export const { setAlertData } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) =>
  state.users.registerLoading;
export const selectRegisterError = (state: RootState) =>
  state.users.signUpError;
export const selectSignInLoading = (state: RootState) =>
  state.users.signInLoading;
export const selectSignInError = (state: RootState) => state.users.signInError;
export const selectAlertData = (state: RootState) => state.users.alertData;
export const selectLogoutLoading = (state: RootState) =>
  state.users.logoutLoading;
