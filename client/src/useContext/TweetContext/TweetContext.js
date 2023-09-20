import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
export const TweetContext = createContext();

const TweetContextProvider = ({ children }) => {
  const [myTweets, setMyTweets] = useState([]);
  const [specificUserProfile, setSpecificUserProfile] = useState();
  const [
    showLogin,
    setShowLogin,
    showRegister,
    setShowRegister,
    userData,
    setUserData,
    loading,
    setLoading,
    allTweets,
    setAllTweets,
    infoLoader,
    setInfoLoader,
    followingTweet,
    setFollowingTweet,
  ] = useContext(AuthContext);

  useEffect(() => {
    setInfoLoader(true);

    if (sessionStorage.getItem("twitterdata")) {
      const id = sessionStorage.getItem("twitterdata");
      const toRemoveString = id;
      const stringWithoutQuotes = toRemoveString.replace(/^"(.*)"$/, "$1");
      const myTweets = allTweets.filter(
        (e) => parseInt(e.authorId) === parseInt(stringWithoutQuotes)
      );
      setMyTweets(myTweets);
      setTimeout(() => {
        setInfoLoader(false);
      }, 2000);
    } else {
      setLoading(false);
    }
  }, [allTweets, sessionStorage]); // Make sure to include all relevant dependencies here

  return (
    <TweetContext.Provider
      value={[
        myTweets,
        setMyTweets,
        specificUserProfile,
        setSpecificUserProfile,
      ]}
    >
      {children}
    </TweetContext.Provider>
  );
};
export default TweetContextProvider;
