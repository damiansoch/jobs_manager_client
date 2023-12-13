import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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

const CustomerDetails = () => {
  const excludedKeys = ['id', 'customerId'];
  const [dataTabs, setDataTabs] = useState([]);

  const { id } = useParams();
  const disatch = useDispatch();

  const { customer, isLoading, isError, errorMessage } = useSelector(
    (state) => state.details
  );

  const detailAction = async (itemId) => {
    console.log(itemId);
  };
  const editAction = async (itemId) => {
    console.log(itemId);
  };
  const deleteAction = async (itemId) => {
    console.log(itemId);
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
  return (
    <>
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
    </>
  );
};

export default CustomerDetails;
