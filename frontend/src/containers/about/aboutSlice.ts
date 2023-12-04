import { IEmployee, IPartner } from '@/type';
import { createSlice } from '@reduxjs/toolkit';
import { fetchEmployees, fetchPartners } from '@/containers/about/aboutThunk';
import { RootState } from '@/store/store';

interface AboutState {
  employees: IEmployee[];
  fetchEmployeesLoading: boolean;
  partners: IPartner[];
  fetchPartnersLoading: boolean;
}

const initialState: AboutState = {
  employees: [],
  fetchEmployeesLoading: false,
  partners: [],
  fetchPartnersLoading: false,
};

export const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEmployees.pending, (state) => {
      state.fetchEmployeesLoading = true;
    });
    builder.addCase(
      fetchEmployees.fulfilled,
      (state, { payload: employees }) => {
        state.employees = employees;
        state.fetchEmployeesLoading = false;
      },
    );
    builder.addCase(fetchEmployees.rejected, (state) => {
      state.fetchEmployeesLoading = false;
    });
    builder.addCase(fetchPartners.pending, (state) => {
      state.fetchPartnersLoading = true;
    });
    builder.addCase(fetchPartners.fulfilled, (state, { payload: partners }) => {
      state.partners = partners;
      state.fetchPartnersLoading = false;
    });
    builder.addCase(fetchPartners.rejected, (state) => {
      state.fetchPartnersLoading = false;
    });
  },
});

export const selectAllEmployees = (state: RootState) => state.about.employees;
export const selectAllPartners = (state: RootState) => state.about.partners;
