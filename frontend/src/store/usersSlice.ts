import { User, ValidationError } from "../type";
import { createSlice } from "@reduxjs/toolkit";
import { register, signIn } from "./usersThunk";
import { RootState } from "../app/store";

interface UsersState {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  signInLoading: boolean;
  signInError: ValidationError | null;
  alertData: {
    message: string;
    type: string;
  } | null;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  signInLoading: false,
  signInError: null,
  alertData: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setAlertData: (state, action) => {
      state.alertData = action.payload;
    },
    unsetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(register.fulfilled, (state, { payload: userResponse }) => {
      state.registerLoading = false;
      state.user = userResponse.user;
    });
    builder.addCase(register.rejected, (state, { payload: error }) => {
      state.registerLoading = false;
      state.registerError = error || null;
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
  },
});

export const { setAlertData } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) =>
  state.users.registerLoading;
export const selectRegisterError = (state: RootState) =>
  state.users.registerError;
export const selectSignInLoading = (state: RootState) =>
  state.users.signInLoading;
export const selectSignInError = (state: RootState) => state.users.signInError;
export const selectAlertData = (state: RootState) => state.users.alertData;
export const { unsetUser } = usersSlice.actions;
