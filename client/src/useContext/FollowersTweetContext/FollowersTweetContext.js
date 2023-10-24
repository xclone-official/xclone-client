import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import axios from "axios";
export const FollowersTweetContext = createContext();

const FollowersTweetContextProvider = ({ children }) => {
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
    getAllTweets,
    getAllTweetsFromFollowingUsers,
  ] = useContext(AuthContext);
  const [followersTweet, setFollowersTweet] = useState([]);
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const getAllTweetsFromFollowers = async () => {
    try {
      axios
        .get(`${backendURL}/tweetaction/getTweetFromFollowers/${userData?._id}`)
        .then((data) => {
          const tweets = data.data.tweets;
          setFollowersTweet(
            tweets.sort(function (a, b) {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
          );
          setTimeout(() => {}, 2000);
        })
        .catch((err) => {
          setTimeout(() => {}, 2000);
        });
    } catch (error) {
      setTimeout(() => {}, 2000);
    }
  };
  useEffect(() => {
    if (userData) {
      getAllTweetsFromFollowers();
    }
  }, [userData]);
  return (
    <FollowersTweetContext.Provider
      value={[followersTweet, setFollowersTweet, getAllTweetsFromFollowers]}
    >
      {children}
    </FollowersTweetContext.Provider>
  );
};
export default FollowersTweetContextProvider;
