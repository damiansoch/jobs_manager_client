import {
  Add_UpdateAddressRequestDto,
  UpdateAddressRequestDto,
  UpdateContactRequestDto,
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
    var newObj = createClassFromObject(actionName, response);
    setNewObject(newObj);
  } else {
    if (response.status === 404 && response.data === '') {
      setErrors('Error getting data');
    } else {
      setErrors(response.data);
    }
  }
};

export const createClassFromObject = (actionName, obj) => {
  switch (actionName) {
    case 'editCustomer':
      let updateCustomerRequestDto = new UpdateCustomerRequestDto();
      updateCustomerRequestDto.FirstName = obj.data.firstName;
      updateCustomerRequestDto.LastName = obj.data.lastName;
      updateCustomerRequestDto.CompanyName = obj.data.companyName;
      return updateCustomerRequestDto;

    case 'editJob':
      let updateJobRequestDto = new UpdateJobRequestDto();
      if (obj.data === undefined) {
        updateJobRequestDto.Name = obj.name;
        updateJobRequestDto.Description = obj.description;
        updateJobRequestDto.Price = obj.price;
        updateJobRequestDto.Deposit = obj.deposit;
        updateJobRequestDto.ToBeCompleted = obj.toBeCompleted;
      } else {
        updateJobRequestDto.Name = obj.data.name;
        updateJobRequestDto.Description = obj.data.description;
        updateJobRequestDto.Price = obj.data.price;
        updateJobRequestDto.Deposit = obj.data.deposit;
        updateJobRequestDto.ToBeCompleted = obj.data.toBeCompleted;
      }

      return updateJobRequestDto;

    case 'editContact':
      let updateContactRequestDto = new UpdateContactRequestDto();
      updateContactRequestDto.PhoneNumber = obj.phoneNumber;
      updateContactRequestDto.PhoneNumber2 = obj.phoneNumber2;
      updateContactRequestDto.Email = obj.email;
      updateContactRequestDto.ExtraDetails = obj.extraDetails;
      return updateContactRequestDto;

    case 'editAddress':
      let updateAddressRequestDto = new Add_UpdateAddressRequestDto();
      updateAddressRequestDto.HouseNumber = obj.houseNumber;
      updateAddressRequestDto.AddressLine1 = obj.addressLine1;
      updateAddressRequestDto.AddressLine2 = obj.addressLine2;
      updateAddressRequestDto.AddressLine3 = obj.addressLine3;
      updateAddressRequestDto.PostCode = obj.postCode;
      return updateAddressRequestDto;

    default:
      break;
  }
};
