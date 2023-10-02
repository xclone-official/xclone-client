import { createContext, useState } from "react";

export const MessageContext = createContext();

const MessageContextProvider = ({ children }) => {
  const [allMessages, setAllMessages] = useState([]);
  return (
    <MessageContext.Provider value={[allMessages, setAllMessages]}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContextProvider;
