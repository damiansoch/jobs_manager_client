import { createContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [editedObject, setEditedObject] = useState({});

  const updateEditedObject = (newValue) => {
    setEditedObject(newValue);
  };

  return (
    <AppContext.Provider value={{ updateEditedObject, editedObject }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
