import React, { createContext, useState, useContext } from "react";
import { chatWithFormStates } from "../constants";

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [widgetIsOpen, setWidgetIsOpen] = useState(false);
  const [currentState, setCurrentState] = useState(chatWithFormStates.FORM);
  const [data, setData] = useState({});

  return (
    <ChatContext.Provider
      value={{
        widgetIsOpen,
        setWidgetIsOpen,
        currentState,
        setCurrentState,
        data,
        setData,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
