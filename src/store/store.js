import { configureStore } from '@reduxjs/toolkit';
import customersSlice from './customersSlice';
import customerDetaisSlice from './customerDetaisSlice';

export const store = configureStore({
  reducer: {
    customers: customersSlice,
    details: customerDetaisSlice,
  },
});
