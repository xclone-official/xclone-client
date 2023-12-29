import React, { createContext, useState } from "react";

export const SpecificTweets = createContext();

const SpecificTweetProvider = ({ children }) => {
  const [specifictweetPage, setSpecifictweetPage] = useState([]);
  const allValues = [specifictweetPage, setSpecifictweetPage];
  return (
    <SpecificTweets.Provider value={allValues}>
      {children}
    </SpecificTweets.Provider>
  );
};
export default SpecificTweetProvider;
