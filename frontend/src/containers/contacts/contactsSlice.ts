import { IContacts } from '@/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '@/store/store';
import {
  editContacts,
  fetchContacts,
} from '@/containers/contacts/contactsThunk';

interface guidesState {
  contacts: IContacts | null;
  fetchAllLoading: boolean;
  editContactsLoading: boolean;
}

const initialState: guidesState = {
  contacts: null,
  fetchAllLoading: false,
  editContactsLoading: false,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(
      HYDRATE,
      (state, action) => {
        return { ...state, ...action.payload.tours };
      },
    );

    builder.addCase(fetchContacts.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(fetchContacts.fulfilled, (state, { payload: contacts }) => {
      state.contacts = contacts;
      state.fetchAllLoading = false;
    });
    builder.addCase(fetchContacts.rejected, (state) => {
      state.fetchAllLoading = false;
    });

    builder.addCase(editContacts.pending, (state) => {
      state.editContactsLoading = true;
    });
    builder.addCase(editContacts.fulfilled, (state) => {
      state.editContactsLoading = false;
    });
    builder.addCase(editContacts.rejected, (state) => {
      state.editContactsLoading = false;
    });
  },
});
export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectFetchContactsLoading = (state: RootState) =>
  state.contacts.fetchAllLoading;
export const selectEditContactsLoading = (state: RootState) =>
  state.contacts.editContactsLoading;
