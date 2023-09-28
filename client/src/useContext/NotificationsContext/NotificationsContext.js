import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

const NotificationContextProvider = ({ children }) => {
  const [allNotification, setAllNotification] = useState([]);

  return (
    <NotificationContext.Provider value={[allNotification, setAllNotification]}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
