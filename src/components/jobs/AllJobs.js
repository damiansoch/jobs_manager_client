import React, { useEffect, useState } from 'react';
import { getAxiosFunction } from '../../genericFunctions/axiosFunctions';
import { isResponceSuccess } from '../../genericFunctions/functions';
import ResultComponent from '../genericComponent/ResultComponent';
import TableComponent from '../genericComponent/TableComponent';
import { alterData } from '../../genericFunctions/dataManipulationFunctions';
import ConfirmationModal from '../genericComponent/ConfirmationModal';
import { useNavigate } from 'react-router-dom';

const AllJobs = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [errors, setErrors] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState('');
  const [message, setMessage] = useState([]);
  const [isErrorResult, setIsErrorResult] = useState(false);

  const excludedKeys = ['id', 'customerId'];

  const navigate = useNavigate();

  const editAction = (jobId) => {
    navigate(`/addEdit/editJob/${jobId}`);
  };

  const detailAction = async (jobId) => {
    const endpoint = `https://localhost:7113/api/Job/${jobId}`;
    const result = await getAxiosFunction(endpoint);
    const isSuccess = isResponceSuccess(result);
    if (isSuccess) {
      navigate(`/details/${result.data.customerId}`);
    } else {
      if (result.status === 404 && result.data === '') {
        setMessage('Error fetching job data');
      } else {
        setMessage(result.data);
      }
    }
  };

  const deleteAction = async (jobId) => {
    setIsErrorResult(false);
    setMessage([]);
    setSelectedJobId(jobId);
    setShowConfirmModal(true);
  };

  //ModalSetup
  const handleCancel = () => {
    setShowConfirmModal(false);
  };
  const handleConfirm = async () => {
    const actionName = 'deleteJob';
    var response = await alterData(actionName, selectedJobId);
    const isSuccess = isResponceSuccess(response);
    if (isSuccess) {
      setShowConfirmModal(false);
      setMessage(response.data);
      var endpoint = 'https://localhost:7113/api/Job';
      fetchData(endpoint);
    } else {
      setShowConfirmModal(false);
      setIsErrorResult(true);
      if (response.status === 404 && response.data === '') {
        setMessage('Error deleting data');
      } else {
        setMessage(response.data);
      }
    }
  };

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

  useEffect(() => {
    var endpoint = 'https://localhost:7113/api/Job';
    fetchData(endpoint);
  }, []);

  return (
    <>
      {message.length > 0 && (
        <ResultComponent
          variant={isErrorResult ? 'danger' : 'success'}
          data={message}
        />
      )}
      <div>
        {errors.length > 0 ? (
          <ResultComponent variant='danger' data={errors} />
        ) : (
          allJobs.length > 0 && (
            <TableComponent
              data={allJobs}
              excludedKeys={excludedKeys}
              detailsActionFunction={detailAction}
              editActionFunction={editAction}
              deleteActionFunction={deleteAction}
            />
          )
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

export default AllJobs;
