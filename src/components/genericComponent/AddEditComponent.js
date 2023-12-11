import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  AddCustomerRequestDto,
  UpdateCustomerRequestDto,
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
  getAxiosFunction,
  updateAxiosFunction,
} from '../../genericFunctions/axiosFunctions';
import { isResponceSuccess } from '../../genericFunctions/functions';

const AddEditComponent = () => {
  const [newObject, setNewObject] = useState({});
  const [errors, setErrors] = useState([]);

  const { actionName, id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    let errors = validataData(actionName, newObject);
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

        default:
          errors.push(
            `Action name ${actionName} not recognized in handleSubmit`
          );
          break;
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewObject((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  useEffect(() => {
    const fetchData = async (endpoint) => {
      const response = await getAxiosFunction(endpoint);
      const isSuccess = isResponceSuccess(response);
      if (isSuccess) {
        let updateCustomerRequestDto = new UpdateCustomerRequestDto();
        updateCustomerRequestDto.FirstName = response.data.firstName;
        updateCustomerRequestDto.LastName = response.data.lastName;
        updateCustomerRequestDto.CompanyName = response.data.companyName;
        setNewObject(updateCustomerRequestDto);
      } else {
        if (response.status === 404 && response.data === '') {
          setErrors('Error getting data for the customer');
        } else {
          setErrors(response.data);
        }
      }
    };

    switch (actionName) {
      case 'addCustomer':
        const customer = new AddCustomerRequestDto();
        setNewObject(customer);
        break;
      case 'editCustomer':
        const endpoint = `https://localhost:7113/api/Customer/${id}`;
        fetchData(endpoint);

        break;

      default:
        break;
    }
  }, [actionName, id]);

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
              <Form.Control
                type='text'
                id={key}
                name={key}
                value={newObject[key] || ''}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
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
