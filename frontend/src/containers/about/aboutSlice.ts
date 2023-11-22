import { IEmployee } from '@/type';
import { createSlice } from '@reduxjs/toolkit';
import { fetchEmployees } from '@/containers/about/aboutThunk';
import { RootState } from '@/store/store';

interface AboutState {
  employees: IEmployee[];
  fetchEmployeesLoading: boolean;
}

const initialState: AboutState = {
  employees: [],
  fetchEmployeesLoading: false,
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
  },
});

export const selectAllEmployees = (state: RootState) => state.about.employees;
