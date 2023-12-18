import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers } from '../../store/customersSlice';
import SpinnerComponent from '../genericComponent/SpinnerComponent';
import ResultComponent from '../genericComponent/ResultComponent';
import TableComponent from '../genericComponent/TableComponent';
import { deleteAxiosFunction } from '../../genericFunctions/axiosFunctions';
import { isResponceSuccess } from '../../genericFunctions/functions';
import ConfirmationModal from '../genericComponent/ConfirmationModal';
import { Row } from 'react-bootstrap';
import { IoIosPersonAdd } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../Context/context';

const AllCustomers = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [message, setMessage] = useState('');
  const [isErrorResult, setIsErrorResult] = useState(false);

  const excludedKeys = ['id', 'contact', 'jobs', 'addresses'];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { customers, isLoading, isError, errorMessage } = useSelector(
    (state) => state.customers
  );

  const { updateInitialSearchArray } = useContext(AppContext);

  const detailAction = async (itemId) => {
    navigate(`/details/${itemId}`);
  };
  const editAction = async (itemId) => {
    navigate(`/addEdit/editCustomer/${itemId}`);
  };
  const deleteAction = async (itemId) => {
    setIsErrorResult(false);
    setSelectedUserId(itemId);
    setShowConfirmModal(true);
  };

  //ModalSetup
  const handleCancel = () => {
    setShowConfirmModal(false);
    setSelectedUserId('');
  };
  const handleConfirm = async () => {
    console.log('deleting ' + selectedUserId);
    const endpoint = `https://localhost:7113/api/Customer/${selectedUserId}`;
    const response = await deleteAxiosFunction(endpoint);
    console.log(response);
    const isSuccess = isResponceSuccess(response);
    if (isSuccess) {
      setShowConfirmModal(false);
      setSelectedUserId('');
      setMessage(response.data);
      dispatch(getCustomers());
    } else {
      setShowConfirmModal(false);
      setSelectedUserId('');
      setIsErrorResult(true);

      if (response.status === 404 && response.data === '') {
        setMessage('Error deleting data');
      } else {
        setMessage(response.data);
      }
    }
  };

  const handleAddCustomer = () => {
    navigate('/addEdit/addCustomer/0');
  };

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  useEffect(() => {
    if (customers.length > 0) {
      updateInitialSearchArray(customers);
    }
  }, [updateInitialSearchArray, customers]);
  return (
    <>
      {message.length > 0 && (
        <ResultComponent
          variant={isErrorResult ? 'danger' : 'success'}
          data={message}
        />
      )}

      <div>
        {isLoading && <SpinnerComponent />}
        {isError ? (
          <ResultComponent variant='danger' data={errorMessage} />
        ) : (
          <>
            <Row>
              <IoIosPersonAdd
                className=' col-1 ms-auto mt-5 text-success icon'
                size={50}
                onClick={() => {
                  handleAddCustomer();
                }}
              />
            </Row>
            {customers.length > 0 && (
              <TableComponent
                data={customers}
                excludedKeys={excludedKeys}
                detailsActionFunction={detailAction}
                editActionFunction={editAction}
                deleteActionFunction={deleteAction}
              />
            )}
          </>
        )}
      </div>
      <ConfirmationModal
        show={showConfirmModal}
        onHide={handleCancel}
        onConfirm={handleConfirm}
        message={'Are you sure?'}
      />
    </>
  );
};

export default AllCustomers;
