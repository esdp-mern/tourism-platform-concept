import { createAsyncThunk } from "@reduxjs/toolkit";
import { Tour } from "../type";
import axiosApi from "../axiosApi";

export const fetchTours = createAsyncThunk<Tour[], void | string>(
  "tours/fetchAll",
  async (guide) => {
    if (guide) {
      const response = await axiosApi.get<Tour[]>(`/tours/?guide=${guide}`);
      return response.data;
    }
    const response = await axiosApi.get<Tour[]>("/tours");
    return response.data;
  },
);

export const fetchTour = createAsyncThunk<Tour, string>(
  "tours/fetchOne",
  async (id) => {
    const response = await axiosApi.get<Tour>(`/tours/${id}`);
    return response.data;
  },
);
