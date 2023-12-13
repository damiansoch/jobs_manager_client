import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAxiosFunction } from '../genericFunctions/axiosFunctions';
import { isResponceSuccess } from '../genericFunctions/functions';

export const getCustomerDetais = createAsyncThunk(
  'customersDetails/getCustomerDetais',
  async (customerId, { rejectWithValue }) => {
    try {
      const endpoint = `https://localhost:7113/api/Customer/${customerId}`;
      const response = await getAxiosFunction(endpoint);
      var isSuccess = isResponceSuccess(response);
      if (!isSuccess) {
        throw new Error(
          response.message || 'Result status code does not indicate success'
        );
      }
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message || 'an error occured');
    }
  }
);

const initialState = {
  customer: {},
  isLoading: false,
  isError: false,
  errorMessage: '',
};

export const customerDetaisSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomerDetais.fulfilled, (state, action) => {
        state.customer = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(getCustomerDetais.pending, (state, action) => {
        state.customer = {};
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(getCustomerDetais.rejected, (state, action) => {
        state.customer = {};
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default customerDetaisSlice.reducer;
