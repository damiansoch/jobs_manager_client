import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers } from '../../store/customersSlice';
import SpinnerComponent from '../genericComponent/SpinnerComponent';
import ResultComponent from '../genericComponent/ResultComponent';
import TableComponent from '../genericComponent/TableComponent';
import { deleteAxiosFunction } from '../../genericFunctions/axiosFunctions';
import { isResponceSuccess } from '../../genericFunctions/functions';

const AllCustomers = () => {
  const excludedKeys = ['id', 'contact', 'jobs', 'addresses'];
  const dispatch = useDispatch();

  const { customers, isLoading, isError, errorMessage } = useSelector(
    (state) => state.customers
  );

  const detailAction = async (itemId) => {
    console.log('From details action');
    console.log(itemId);
  };
  const editAction = async (itemId) => {
    console.log('From dedit action');
    console.log(itemId);
  };
  const deleteAction = async (itemId) => {
    const endpoint = `https://localhost:7113/api/Customer/${itemId}`;
    const response = await deleteAxiosFunction(endpoint);
    console.log(response);
    //const isSuccess = isResponceSuccess(response)
  };

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
          <TableComponent
            data={customers}
            excludedKeys={excludedKeys}
            detailsActionFunction={detailAction}
            editActionFunction={editAction}
            deleteActionFunction={deleteAction}
          />
        )
      )}
    </div>
  );
};

export default AllCustomers;
