import { createSlice } from '@reduxjs/toolkit';
import {
  editProfile,
  getUsers,
  googleLogin,
  logout,
  signIn,
  signUp,
} from './usersThunk';
import { RootState } from '@/store/store';
import { IAlert, User, ValidationError } from '@/type';
import { apiUrl } from '@/constants';
import { nanoid } from 'nanoid';

interface UsersState {
  user: User | null;
  users: User[];
  usersLoading: boolean;
  registerLoading: boolean;
  signUpError: ValidationError | null;
  signInLoading: boolean;
  signInError: { error: string } | null;
  logoutLoading: boolean;
  editLoading: boolean;
  alerts: IAlert[];
  editorModal: boolean;
}

const initialState: UsersState = {
  user: null,
  users: [],
  usersLoading: false,
  registerLoading: false,
  signUpError: null,
  signInLoading: false,
  signInError: null,
  logoutLoading: false,
  editLoading: false,
  alerts: [],
  editorModal: false,
};

const getFilteredUrl = (url: string) =>
  `${apiUrl}/${url.includes('fixtures') ? '' : 'images/'}${url}`;

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
    setEditorModal: (state) => {
      state.editorModal = !state.editorModal;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.registerLoading = true;
      state.signUpError = null;
    });
    builder.addCase(signUp.fulfilled, (state, { payload: userResponse }) => {
      state.registerLoading = false;
      const userData = userResponse.user;

      state.user = {
        ...userData,
        avatar: `${apiUrl}/images/${userData.avatar}`,
      };
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
      const userData = userResponse.user;

      state.user = {
        ...userData,
        avatar: userData.avatar && getFilteredUrl(userData.avatar),
      };
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

        state.user = {
          ...userResponse,
          avatar: userResponse.avatar && getFilteredUrl(userResponse.avatar),
        };
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

    builder.addCase(editProfile.pending, (state) => {
      state.editLoading = true;
    });
    builder.addCase(
      editProfile.fulfilled,
      (state, { payload: userResponse }) => {
        state.editLoading = false;
        const userData = userResponse.user;

        state.user = {
          ...userData,
          avatar: `${apiUrl}/${userData.avatar}`,
        };
      },
    );
    builder.addCase(editProfile.rejected, (state) => {
      state.editLoading = false;
    });

    builder.addCase(getUsers.pending, (state) => {
      state.usersLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.usersLoading = false;
      state.users = payload;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.usersLoading = false;
    });
  },
});

export const { addAlert, disableAlert, resetSignInError, setEditorModal } =
  usersSlice.actions;
export const usersReducer = usersSlice.reducer;
export const selectUser = (state: RootState) => state.users.user;
export const selectSignUpLoading = (state: RootState) =>
  state.users.registerLoading;
export const selectSignUpError = (state: RootState) => state.users.signUpError;
export const selectSignInLoading = (state: RootState) =>
  state.users.signInLoading;
export const selectSignInError = (state: RootState) => state.users.signInError;
export const selectLogoutLoading = (state: RootState) =>
  state.users.logoutLoading;
export const selectAlerts = (state: RootState) => state.users.alerts;
export const selectEditorModal = (state: RootState) => state.users.editorModal;
export const selectEditLoading = (state: RootState) => state.users.editLoading;
export const selectUsers = (state: RootState) => state.users.users;
export const selectUsersLoading = (state: RootState) =>
  state.users.usersLoading;
