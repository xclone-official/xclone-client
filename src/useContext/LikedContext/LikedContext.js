import React, { createContext, useState } from "react";
export const LikedContext = createContext();

const LikedContextProvider = ({ children }) => {
  const [likedTweet, setLikedTweet] = useState([]);
  const allValues = [likedTweet, setLikedTweet];
  return (
    <LikedContext.Provider value={allValues}>{children}</LikedContext.Provider>
  );
};

export default LikedContextProvider;
