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
  Tabs,
  Tab,
} from 'react-bootstrap';
import ResultComponent from './ResultComponent';

const CustomerDetails = () => {
  const [dataTabs, setDataTabs] = useState([]);
  console.log(dataTabs);
  const { id } = useParams();
  const disatch = useDispatch();

  const { customer, isLoading, isError, errorMessage } = useSelector(
    (state) => state.details
  );
  useEffect(() => {
    if (id !== undefined) {
      disatch(getCustomerDetais(id));
    }
  }, [id, disatch]);

  useEffect(() => {
    if (Object.keys(customer).length > 0) {
      const tabs = [];
      tabs.push({ title: 'Addresses', data: customer.addresses });
      tabs.push({ title: 'Contact', data: customer.contact });
      tabs.push({ title: 'AddJobsress', data: customer.jobs });

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
                <Tabs defaultActiveKey='0' id='data-tabs'></Tabs>
              </CardBody>
            </Card>
          )}
        </>
      )}
    </>
  );
};

export default CustomerDetails;
