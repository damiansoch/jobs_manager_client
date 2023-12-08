import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAxiosFunction } from '../genericFunctions/axiosFunctions';
import { isResponceSuccess } from '../genericFunctions/functions';

export const getCustomers = createAsyncThunk(
  'customers/getCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const endpoint = 'https://localhost:7113/api/Customer';
      const response = await getAxiosFunction(endpoint);
      console.log(response);
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
  customers: [],
  isLoading: false,
  isError: false,
  errorMessage: '',
};

export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.customers = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(getCustomers.pending, (state, action) => {
        state.customers = [];
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.customers = [];
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default customersSlice.reducer;
