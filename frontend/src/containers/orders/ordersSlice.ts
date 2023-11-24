import { IOrder2 } from '@/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '@/store/store';
import { deleteOrder, fetchOrders } from '@/containers/orders/ordersThunk';

interface OrderState {
  orders: IOrder2[];
  fetchAllLoading: boolean;
  deleteLoading: boolean | string;
}

const initialState: OrderState = {
  orders: [],
  fetchAllLoading: false,
  deleteLoading: false,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.orders = [...state.orders, ...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(
      HYDRATE,
      (state, action) => {
        return { ...state, ...action.payload.tours };
      },
    );
    builder.addCase(fetchOrders.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, { payload: orders }) => {
      state.orders = orders;
      state.fetchAllLoading = false;
    });
    builder.addCase(fetchOrders.rejected, (state) => {
      state.fetchAllLoading = false;
    });
    builder.addCase(deleteOrder.pending, (state, action) => {
      state.deleteLoading = action.meta.arg;
    });
    builder.addCase(deleteOrder.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteOrder.rejected, (state) => {
      state.deleteLoading = false;
    });
  },
});

export const { setMessages } = ordersSlice.actions;
export const selectAllOrders = (state: RootState) => state.orders.orders;
