import { deleteAxiosFunction } from './axiosFunctions';

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
