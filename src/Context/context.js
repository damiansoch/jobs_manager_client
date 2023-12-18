import { createContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [editedObject, setEditedObject] = useState({});
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [initialSearchArray, setInitialSearchArray] = useState([]);
  const [searchBy, setSearchBy] = useState('');

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
    setSearchBy(newValue);
  };

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
