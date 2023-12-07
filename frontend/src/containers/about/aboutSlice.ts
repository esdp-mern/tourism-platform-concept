import { IAboutUs, IEmployee, IPartner, ValidationError } from '@/type';
import { createSlice } from '@reduxjs/toolkit';
import {
  deleteEmployees,
  editEmployees,
  fetchAboutUs,
  fetchEmployees,
  fetchOneEmployee,
  fetchPartners,
  postEmployees,
} from '@/containers/about/aboutThunk';
import { RootState } from '@/store/store';

interface AboutState {
  about: IAboutUs | null;
  aboutLoading: boolean;
  employees: IEmployee[];
  employee: IEmployee | null;
  fetchEmployeesLoading: boolean;
  fetchEmployeeLoading: boolean;
  partners: IPartner[];
  fetchPartnersLoading: boolean;
  deleteEmployeesLoading: boolean | string;
  postEmployeesLoading: boolean;
  postEmployeesError: ValidationError | null;
  editEmployeesLoading: boolean;
}

const initialState: AboutState = {
  about: null,
  aboutLoading: false,
  employees: [],
  employee: null,
  fetchEmployeesLoading: false,
  fetchEmployeeLoading: false,
  partners: [],
  fetchPartnersLoading: false,
  deleteEmployeesLoading: false,
  postEmployeesLoading: false,
  postEmployeesError: null,
  editEmployeesLoading: false,
};

export const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employee = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAboutUs.pending, (state) => {
      state.aboutLoading = true;
    });
    builder.addCase(fetchAboutUs.fulfilled, (state, { payload }) => {
      state.aboutLoading = false;
      state.about = payload;
    });
    builder.addCase(fetchAboutUs.rejected, (state) => {
      state.aboutLoading = false;
    });

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
    builder.addCase(fetchOneEmployee.pending, (state) => {
      state.fetchEmployeeLoading = true;
    });
    builder.addCase(fetchOneEmployee.fulfilled, (state, action) => {
      state.fetchEmployeeLoading = false;
      state.employee = action.payload;
    });
    builder.addCase(fetchOneEmployee.rejected, (state) => {
      state.fetchEmployeeLoading = false;
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
    builder.addCase(postEmployees.pending, (state) => {
      state.postEmployeesLoading = true;
      state.postEmployeesError = null;
    });
    builder.addCase(postEmployees.fulfilled, (state) => {
      state.postEmployeesLoading = false;
    });
    builder.addCase(postEmployees.rejected, (state, { payload: error }) => {
      state.postEmployeesLoading = false;
      state.postEmployeesError = error || null;
    });
    builder.addCase(editEmployees.pending, (state) => {
      state.editEmployeesLoading = true;
    });
    builder.addCase(editEmployees.fulfilled, (state) => {
      state.editEmployeesLoading = false;
    });
    builder.addCase(editEmployees.rejected, (state) => {
      state.editEmployeesLoading = false;
    });
    builder.addCase(deleteEmployees.pending, (state, action) => {
      state.deleteEmployeesLoading = action.meta.arg;
    });
    builder.addCase(deleteEmployees.fulfilled, (state) => {
      state.deleteEmployeesLoading = false;
    });
    builder.addCase(deleteEmployees.rejected, (state) => {
      state.deleteEmployeesLoading = false;
    });
  },
});
export const { addEmployee } = aboutSlice.actions;

export const selectAllEmployees = (state: RootState) => state.about.employees;
export const selectOneEmployee = (state: RootState) => state.about.employee;

export const selectAllPartners = (state: RootState) => state.about.partners;
