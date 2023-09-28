import React, { createContext, useState } from "react";

export const SpecificTweets = createContext();

const SpecificTweetProvider = ({ children }) => {
  const [specifictweetPage, setSpecifictweetPage] = useState([]);
  return (
    <SpecificTweets.Provider value={[specifictweetPage, setSpecifictweetPage]}>
      {children}
    </SpecificTweets.Provider>
  );
};
export default SpecificTweetProvider;
