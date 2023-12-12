import React, { useEffect, useState } from 'react';
import { getAxiosFunction } from '../../genericFunctions/axiosFunctions';
import { isResponceSuccess } from '../../genericFunctions/functions';
import ResultComponent from '../genericComponent/ResultComponent';
import TableComponent from '../genericComponent/TableComponent';
import { alterData } from '../../genericFunctions/dataManipulationFunctions';

const AllJobs = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [errors, setErrors] = useState([]);

  const excludedKeys = ['id', 'customerId'];

  const deleteAction = async (jobId) => {
    const actionName = 'deleteJob';
    var response = await alterData(actionName, jobId);
    const isSuccess = isResponceSuccess(response);
    if (isSuccess) {
      //setShowConfirmModal(false);
      //setMessage(response.data);
      dispatch(getCustomers());
    } else {
      //setShowConfirmModal(false);

      //setIsErrorResult(true);
      if (response.status === 404 && response.data === undefined) {
        //setMessage('Error deleting data');
      } else {
        //setMessage(response.data);
      }
    }
  };

  useEffect(() => {
    const fetchData = async (endpoint) => {
      setErrors([]);
      const response = await getAxiosFunction(endpoint);
      const isSuccess = isResponceSuccess(response);
      if (isSuccess) {
        setAllJobs(response.data);
      } else {
        console.log(response);
        if (response.status === 404 && response.data === '') {
          setErrors('Error getting data for the jobs');
        } else {
          setErrors(response.data);
        }
      }
    };
    var endpoint = 'https://localhost:7113/api/Job';
    fetchData(endpoint);
  }, []);
  return (
    <div>
      {errors.length > 0 ? (
        <ResultComponent variant='danger' data={errors} />
      ) : (
        allJobs.length > 0 && (
          <TableComponent
            data={allJobs}
            excludedKeys={excludedKeys}
            //detailsActionFunction={detailAction}
            //editActionFunction={editAction}
            deleteActionFunction={deleteAction}
          />
        )
      )}
    </div>
  );
};

export default AllJobs;
