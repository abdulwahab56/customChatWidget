import React, { createContext, useContext, useState } from "react";

// ✅ fix the name here
const StateChangeContext = createContext();

function StateChangeProvider({ children }) {
  const [currentStep, setCurrentStep] = useState("SIGN_IN");

  return (
    <StateChangeContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </StateChangeContext.Provider>
  );
}

export default StateChangeProvider;

// ✅ fix the hook to use the right context
export const useStateChange = () => useContext(StateChangeContext);
