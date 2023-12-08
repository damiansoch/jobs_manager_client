import axios from 'axios';

export const updateAxiosFunction = async (endpoint, editedData) => {
  try {
    const response = await axios.put(endpoint, editedData);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error updating data', error.response);
    return error.response;
  }
};

export const deleteAxiosFunction = async (endpoint) => {
  try {
    const response = await axios.delete(endpoint);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error deleting data', error.response);
    return error.response;
  }
};

export const addAxiosFunction = async (endpoint, editedData) => {
  try {
    const response = await axios.post(endpoint, editedData);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error adding data', error.response);
    return error.response;
  }
};

export const getAxiosFunction = async (endpoint) => {
  try {
    const response = await axios.get(endpoint);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error getting data', error.response);
    return error.response;
  }
};
