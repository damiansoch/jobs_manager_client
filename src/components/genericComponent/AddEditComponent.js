import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AddCustomerRequestDto } from '../../classes/allClasses';
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

  const { actionName, id } = useParams();

  const navigate = useNavigate();

  const { editedObject } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    let errors = validataData(actionName, newObject);
    console.log(errors);
    if (errors.length > 0) {
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

        default:
          errors.push(
            `Action name ${actionName} not recognized in handleSubmit`
          );
          break;
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;

    if (type === 'checkbox') {
      newValue = checked;
    } else if (type === 'number') {
      newValue = parseFloat(value);
    }
    setNewObject((prevFormData) => ({ ...prevFormData, [name]: newValue }));
  };

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

      default:
        break;
    }
  }, [actionName, id, editedObject]);

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
              <Form.Label htmlFor={key}>{key}</Form.Label>

              {renderFormControl(key, newObject[key], newObject, handleChange)}
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
