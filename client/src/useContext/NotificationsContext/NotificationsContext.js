import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

const NotificationContextProvider = ({ children }) => {
  const [allNotification, setAllNotification] = useState([]);
  const allValues = [allNotification, setAllNotification];
  return (
    <NotificationContext.Provider value={allValues}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
