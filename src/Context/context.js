import { createContext, useEffect, useState } from 'react';
import { sortArray } from './helpers/functions';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [editedObject, setEditedObject] = useState({});
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [initialSearchArray, setInitialSearchArray] = useState([]);
  const [resultArray, setResultArray] = useState([]);
  const [searchBy, setSearchBy] = useState('');
  const [order, setOrder] = useState('asc');

  const updateEditedObject = (newValue) => {
    setEditedObject(newValue);
  };

  const upadateSearchVisibility = (nawValue) => {
    setSearchVisible(!searchVisible);
  };

  const updateSearchText = (newValue) => {
    setSearchText(newValue);
  };

  const updateInitialSearchArray = (newValue) => {
    setInitialSearchArray(newValue);
  };

  const updateSearchBy = (newValue) => {
    setSearchText('');
    setSearchBy(newValue);
  };

  const updateOrder = (key) => {
    let sortingOrder = order === 'asc' ? 'desc' : 'asc';
    const sortedArray = sortArray(resultArray, key, order);
    setResultArray(sortedArray);
    setOrder(sortingOrder);
  };

  //---------------------------------------------
  useEffect(() => {
    if (initialSearchArray.length > 0) {
      setResultArray(initialSearchArray);
    }
  }, [initialSearchArray]);

  useEffect(() => {
    if (initialSearchArray.length > 0 && searchBy !== '') {
      let filteredResult = initialSearchArray.filter((item) =>
        item[searchBy] != null
          ? item[searchBy]
              .toString()
              .toLowerCase()
              .includes(searchText.toLocaleLowerCase())
          : item
      );
      setResultArray(filteredResult);
    }
  }, [initialSearchArray, searchBy, searchText]);

  return (
    <AppContext.Provider
      value={{
        updateEditedObject,
        editedObject,
        searchVisible,
        upadateSearchVisibility,
        updateSearchText,
        searchText,
        updateInitialSearchArray,
        updateSearchBy,
        searchBy,
        resultArray,
        updateOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
