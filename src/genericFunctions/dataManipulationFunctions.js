import {
  UpdateCustomerRequestDto,
  UpdateJobRequestDto,
} from '../classes/allClasses';
import { deleteAxiosFunction, getAxiosFunction } from './axiosFunctions';
import { isResponceSuccess } from './functions';

export const alterData = async (actionName, data) => {
  switch (actionName) {
    //Cases for a jobs
    case 'deleteJob':
      const endpoint = `https://localhost:7113/api/Job/${data}`;
      const response = await deleteAxiosFunction(endpoint);
      return response;

    default:
      break;
  }
};

export const fetchData = async (
  actionName,
  endpoint,
  setNewObject,
  setErrors
) => {
  const response = await getAxiosFunction(endpoint);
  const isSuccess = isResponceSuccess(response);
  if (isSuccess) {
    switch (actionName) {
      case 'editCustomer':
        let updateCustomerRequestDto = new UpdateCustomerRequestDto();
        updateCustomerRequestDto.FirstName = response.data.firstName;
        updateCustomerRequestDto.LastName = response.data.lastName;
        updateCustomerRequestDto.CompanyName = response.data.companyName;
        setNewObject(updateCustomerRequestDto);
        break;
      case 'editJob':
        console.log('In edit job case');
        let updateJobRequestDto = new UpdateJobRequestDto();
        updateJobRequestDto.Name = response.data.name;
        updateJobRequestDto.Description = response.data.description;
        updateJobRequestDto.Price = response.data.price;
        updateJobRequestDto.Deposit = response.data.deposit;
        updateJobRequestDto.ToBeCompleted = response.data.toBeCompleted;
        setNewObject(updateJobRequestDto);
        break;

      default:
        break;
    }
  } else {
    if (response.status === 404 && response.data === '') {
      setErrors('Error getting data');
    } else {
      setErrors(response.data);
    }
  }
};
