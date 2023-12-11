import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGuideFull, IGuideRequest, ISendGuideRequest } from '@/type';
import axiosApi from '@/axiosApi';

export const fetchGuides = createAsyncThunk('guides/fetchAll', async () => {
  const response = await axiosApi.get<IGuideFull[]>('/guides');
  return response.data;
});

export const becomeGuide = createAsyncThunk<IGuideRequest, ISendGuideRequest>(
  'guides/sendRequest',
  async (guideData: ISendGuideRequest) => {
    try {
      const request = await axiosApi.post('guideOrders', guideData);
      return request.data;
    } catch (e) {
      throw e;
    }
  },
);
