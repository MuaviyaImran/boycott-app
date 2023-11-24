import React, { createContext, useState } from "react";
import { LayoutProps } from "types/types";
import { SuggestionModalTypes } from "types/types";
const MyContext = createContext<SuggestionModalTypes | undefined>(undefined);

const MyProvider: React.FC<LayoutProps> = ({ children }) => {
  const [show, setShow] = useState(false);

  return (
    <MyContext.Provider value={{ show, setShow }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyProvider, MyContext };
