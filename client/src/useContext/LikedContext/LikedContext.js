import React, { createContext, useState } from "react";
export const LikedContext = createContext();

const LikedContextProvider = ({ children }) => {
  const [likedTweet, setLikedTweet] = useState([]);
  return (
    <LikedContext.Provider value={[likedTweet, setLikedTweet]}>
      {children}
    </LikedContext.Provider>
  );
};

export default LikedContextProvider;
