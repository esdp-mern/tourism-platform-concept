import {User, ValidationError} from "../type";
import {createSlice} from "@reduxjs/toolkit";
import {register, signUp} from "./usersThunk";
import {RootState} from "../app/store";

interface UsersState {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  signUpLoading: boolean;
  signUpError: ValidationError | null;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  signUpLoading: false,
  signUpError: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(register.fulfilled, (state, {payload: userResponse}) => {
      state.registerLoading = false;
      state.user = userResponse.user;
    });
    builder.addCase(register.rejected, (state, {payload: error}) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });

    builder.addCase(signUp.pending, (state) => {
      state.signUpLoading = true;
      state.signUpError = null;
    });
    builder.addCase(signUp.fulfilled, (state, {payload: userResponse}) => {
      state.signUpLoading = false;
      state.user = userResponse.user;
    });
    builder.addCase(signUp.rejected, (state, {payload: error}) => {
      state.signUpLoading = false;
      state.signUpError = error || null;
    });
  },
});

export const usersReducer = usersSlice.reducer;
export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) =>
  state.users.registerLoading;
export const selectRegisterError = (state: RootState) =>
  state.users.registerError;
export const selectSignUpLoading = (state: RootState) =>
  state.users.signUpLoading;
export const selectSignUpError = (state: RootState) =>
  state.users.signUpError;
