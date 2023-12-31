import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  AddCustomerRequestDto,
  Add_UpdateAddressRequestDto,
  Add_UpdateJobRequestDto,
} from '../../classes/allClasses';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Form,
} from 'react-bootstrap';
import { convertToLabel } from '../../genericFunctions/converters';
import { validataData } from '../../genericFunctions/dataValidators';
import ResultComponent from './ResultComponent';
import {
  addAxiosFunction,
  updateAxiosFunction,
} from '../../genericFunctions/axiosFunctions';
import { isResponceSuccess } from '../../genericFunctions/functions';
import {
  createClassFromObject,
  fetchData,
} from '../../genericFunctions/dataManipulationFunctions';
import { renderFormControl } from './renderingFunctions/renderingFunctions';
import AppContext from '../../Context/context';

const AddEditComponent = () => {
  const [newObject, setNewObject] = useState({});
  const [errors, setErrors] = useState([]);
  const textareaItems = ['ExtraDetails', 'Description'];

  const { actionName, id } = useParams();

  const navigate = useNavigate();

  const { editedObject } = useContext(AppContext);

  useEffect(() => {
    let endpoint = '';
    switch (actionName) {
      case 'addCustomer':
        const customer = new AddCustomerRequestDto();
        setNewObject(customer);
        break;
      case 'editCustomer':
        endpoint = `https://localhost:7113/api/Customer/${id}`;
        fetchData(actionName, endpoint, setNewObject, setErrors);
        break;

      case 'editJob':
        var newobj;
        if (id === '0') {
          newobj = createClassFromObject(actionName, editedObject);
          setNewObject(newobj);
        } else {
          endpoint = `https://localhost:7113/api/Job/${id}`;
          fetchData(actionName, endpoint, setNewObject, setErrors);
        }
        break;
      case 'editContact':
        newobj = createClassFromObject(actionName, editedObject);
        setNewObject(newobj);
        break;
      case 'editAddress':
        newobj = createClassFromObject(actionName, editedObject);
        setNewObject(newobj);
        break;

      case 'addAddress':
        const address = new Add_UpdateAddressRequestDto();
        setNewObject(address);
        break;

      case 'addJob':
        let job = new Add_UpdateJobRequestDto();
        let currentDate = new Date();
        let formatedDate = currentDate.toISOString().slice(0, 19);
        job.ToBeCompleted = formatedDate;
        setNewObject(job);
        break;

      default:
        break;
    }
  }, [actionName, id, editedObject]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newValue = value;

    if (type === 'checkbox') {
      newValue = checked;
    } else if (type === 'number') {
      newValue = parseFloat(value);
    } else if (type === 'date') {
      newValue = newValue + 'T00:00:00';
    }
    setNewObject((prevFormData) => ({ ...prevFormData, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    let errors = validataData(actionName, newObject);

    if (errors.length > 0) {
      console.log(errors);
      setErrors(errors);
    } else {
      let endpoint = '';
      let result = {};
      let isSuccess = true;

      switch (actionName) {
        case 'addCustomer':
          endpoint = 'https://localhost:7113/api/Customer';
          result = await addAxiosFunction(endpoint, newObject);
          isSuccess = isResponceSuccess(result);
          if (isSuccess) {
            navigate('/');
          } else {
            if (result.status === 404 && result.data === '') {
              setErrors('Error adding data');
            } else {
              setErrors(result.data);
            }
          }
          break;
        case 'editCustomer':
          endpoint = `https://localhost:7113/api/Customer/${id}`;
          result = await updateAxiosFunction(endpoint, newObject);
          isSuccess = isResponceSuccess(result);
          if (isSuccess) {
            navigate('/');
          } else {
            if (result.status === 404 && result.data === '') {
              setErrors('Error updating data');
            } else {
              setErrors(result.data);
            }
          }
          break;
        case 'editJob':
          if (id === '0') {
            endpoint = `https://localhost:7113/api/Job/${editedObject.id}`;
          } else {
            endpoint = `https://localhost:7113/api/Job/${id}`;
          }
          result = await updateAxiosFunction(endpoint, newObject);
          isSuccess = isResponceSuccess(result);
          if (isSuccess) {
            if (id === '0') {
              console.log(editedObject);
              navigate(`/details/${editedObject.customerId}`);
            } else {
              navigate('/allJobs');
            }
          } else {
            if (result.status === 404 && result.data === '') {
              setErrors('Error updating data');
            } else {
              setErrors(result.data);
            }
          }
          break;
        case 'editContact':
          endpoint = `https://localhost:7113/api/Contact/${editedObject.id}`;
          result = await updateAxiosFunction(endpoint, newObject);
          isSuccess = isResponceSuccess(result);
          if (isSuccess) {
            navigate(`/details/${editedObject.customerId}`);
          } else {
            if (result.status === 404 && result.data === '') {
              setErrors('Error updating data');
            } else {
              setErrors(result.data);
            }
          }
          break;
        case 'editAddress':
          endpoint = `https://localhost:7113/api/Address/${editedObject.id}`;
          result = await updateAxiosFunction(endpoint, newObject);
          isSuccess = isResponceSuccess(result);
          if (isSuccess) {
            navigate(`/details/${editedObject.customerId}`);
          } else {
            if (result.status === 404 && result.data === '') {
              setErrors('Error updating data');
            } else {
              setErrors(result.data);
            }
          }
          break;

        case 'addAddress':
          endpoint = `https://localhost:7113/api/Address/${id}`;
          result = await addAxiosFunction(endpoint, newObject);
          isSuccess = isResponceSuccess(result);
          if (isSuccess) {
            navigate(`/details/${id}`);
          } else {
            if (result.status === 404 && result.data === '') {
              setErrors('Error updating data');
            } else {
              setErrors(result.data);
            }
          }
          break;

        case 'addJob':
          endpoint = `https://localhost:7113/api/Job/${id}`;

          result = await addAxiosFunction(endpoint, newObject);
          isSuccess = isResponceSuccess(result);
          if (isSuccess) {
            navigate(`/details/${id}`);
          } else {
            if (result.status === 404 && result.data === '') {
              setErrors('Error updating data');
            } else {
              setErrors(result.data);
            }
          }
          break;
        default:
          errors.push(
            `Action name ${actionName} not recognized in handleSubmit`
          );
          break;
      }
    }
  };

  return (
    <Card className=' my-3'>
      <CardBody>
        <CardHeader>
          <CardTitle className=' text-center'>
            {convertToLabel(actionName)}
          </CardTitle>
        </CardHeader>
        <Form
          className=' my-2'
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          {Object.keys(newObject).map((key) => (
            <Form.Group key={key}>
              <Form.Label htmlFor={key}>{convertToLabel(key)}</Form.Label>

              {renderFormControl(
                key,
                newObject[key],
                newObject,
                handleChange,
                textareaItems
              )}
            </Form.Group>
          ))}
          <Button className=' my-2' type='submit' variant='primary'>
            Submit
          </Button>
        </Form>
      </CardBody>
      {errors.length > 0 && (
        <Card.Footer>
          <ResultComponent variant='danger' data={errors} />
        </Card.Footer>
      )}
    </Card>
  );
};

export default AddEditComponent;
