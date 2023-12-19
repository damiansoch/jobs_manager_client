import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCustomerDetais } from '../../store/customerDetaisSlice';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Spinner,
} from 'react-bootstrap';
import ResultComponent from '../genericComponent/ResultComponent';
import TabsComponent from '../genericComponent/TabsComponent';
import { searchIdInDataTabs } from './functions/helperFunctions';
import { deleteAxiosFunction } from '../../genericFunctions/axiosFunctions';
import { isResponceSuccess } from '../../genericFunctions/functions';
import ConfirmationModal from '../genericComponent/ConfirmationModal';
import AppContext from '../../Context/context';

const CustomerDetails = () => {
  const excludedKeys = ['id', 'customerId'];
  const [dataTabs, setDataTabs] = useState([]);
  const [message, setMessage] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState('');

  const { id } = useParams();
  const disatch = useDispatch();
  const navigate = useNavigate();

  const { updateEditedObject } = useContext(AppContext);

  const { customer, isLoading, isError, errorMessage } = useSelector(
    (state) => state.details
  );

  const detailAction = async (itemId) => {
    console.log(itemId);
  };
  const editAction = async (itemId) => {
    const foundObj = searchIdInDataTabs(dataTabs, itemId);
    updateEditedObject(foundObj.obj);
    navigate(`/addEdit/edit${foundObj.title}/0`);
  };
  const deleteAction = async (itemId) => {
    setMessage('');
    setSelectedItemId(itemId);
    setShowConfirmModal(true);
  };
  useEffect(() => {
    if (id !== undefined) {
      disatch(getCustomerDetais(id));
    }
  }, [id, disatch]);

  useEffect(() => {
    if (Object.keys(customer).length > 0) {
      const tabs = [];
      tabs.push({ title: 'Contact', data: customer.contact });
      tabs.push({ title: 'Addresses', data: customer.addresses });
      tabs.push({ title: 'Jobs', data: customer.jobs });

      setDataTabs(tabs);
    }
  }, [customer]);
  //ModalSetup
  const handleCancel = () => {
    setSelectedItemId('');
    setShowConfirmModal(false);
  };
  const handleConfirm = async () => {
    const foundObj = searchIdInDataTabs(dataTabs, selectedItemId);
    if (foundObj === null) {
      setMessage('Id not found');
    } else {
      const endpoint = `https://localhost:7113/api/${foundObj.title}/${foundObj.id}`;
      const result = await deleteAxiosFunction(endpoint);
      console.log(result);
      const isSuccess = isResponceSuccess(result);
      if (isSuccess) {
        setSelectedItemId('');
        setShowConfirmModal(false);
        disatch(getCustomerDetais(id));
      } else {
        if (result.status > 400 && result.data === '') {
          setMessage(`Error deleting ${foundObj.title.toLowerCase()} data`);
        } else {
          setMessage(result.data);
        }
        setShowConfirmModal(false);
        setSelectedItemId('');
      }
    }
  };
  return (
    <>
      {message.length > 0 && (
        <ResultComponent variant='danger' data={message} />
      )}
      {isLoading && <Spinner />}
      {isError ? (
        <ResultComponent variant='danger' data={errorMessage} />
      ) : (
        <>
          {Object.keys(customer).length > 0 && (
            <Card className=' my-5'>
              <CardHeader>
                <CardTitle className=' d-flex justify-content-evenly align-items-center'>
                  <h5 className=' text-success'>
                    {customer.firstName} {customer.lastName}
                  </h5>

                  <h5 className=' text-success'>{customer.companyName}</h5>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <TabsComponent
                  dataTabs={dataTabs}
                  detailsActionFunction={detailAction}
                  editActionFunction={editAction}
                  deleteActionFunction={deleteAction}
                  excludedKeys={excludedKeys}
                />
              </CardBody>
            </Card>
          )}
        </>
      )}
      <ConfirmationModal
        show={showConfirmModal}
        onHide={handleCancel}
        onConfirm={handleConfirm}
        message={'Are you sure?'}
      />
    </>
  );
};

export default CustomerDetails;
