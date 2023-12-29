import { createContext, useState } from "react";

export const MessageContext = createContext();

const MessageContextProvider = ({ children }) => {
  const [allMessages, setAllMessages] = useState([]);
  const allValues = [allMessages, setAllMessages];
  return (
    <MessageContext.Provider value={allValues}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContextProvider;
