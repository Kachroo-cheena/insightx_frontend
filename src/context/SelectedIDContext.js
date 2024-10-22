import React, { createContext, useContext, useState } from 'react';

// Create a Context for the selected ID
const SelectedIDContext = createContext();

// Create a Provider component
export const SelectedIDProvider = ({ children }) => {
  const [selectedID, setSelectedID] = useState(null);

  return (
    <SelectedIDContext.Provider value={{ selectedID, setSelectedID }}>
      {children}
    </SelectedIDContext.Provider>
  );
};

// Custom hook to use the SelectedIDContext
export const useSelectedID = () => {
  return useContext(SelectedIDContext);
};
