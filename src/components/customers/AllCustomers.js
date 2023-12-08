import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers } from '../../store/customersSlice';
import SpinnerComponent from '../genericComponent/SpinnerComponent';
import ResultComponent from '../genericComponent/ResultComponent';
import TableComponent from '../genericComponent/TableComponent';

const AllCustomers = () => {
  const excludedKeys = ['id', 'contact', 'jobs', 'addresses'];
  const dispatch = useDispatch();

  const { customers, isLoading, isError, errorMessage } = useSelector(
    (state) => state.customers
  );

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);
  return (
    <div>
      {isLoading && <SpinnerComponent />}
      {isError ? (
        <ResultComponent variant='danger' data={errorMessage} />
      ) : (
        customers.length > 0 && (
          <TableComponent data={customers} excludedKeys={excludedKeys} />
        )
      )}
    </div>
  );
};

export default AllCustomers;
