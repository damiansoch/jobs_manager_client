import { createContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [editedObject, setEditedObject] = useState({});
  const [searchVisible, setSearchVisible] = useState(false);

  const updateEditedObject = (newValue) => {
    setEditedObject(newValue);
  };

  const upadateSearchVisibility = (nawValue) => {
    setSearchVisible(!searchVisible);
  };

  return (
    <AppContext.Provider
      value={{
        updateEditedObject,
        editedObject,
        searchVisible,
        upadateSearchVisibility,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
