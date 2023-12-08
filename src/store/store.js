import { configureStore } from '@reduxjs/toolkit';
import customersSlice from './customersSlice';

export const store = configureStore({
  reducer: {
    customers: customersSlice,
  },
});
