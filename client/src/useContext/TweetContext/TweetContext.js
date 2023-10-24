import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import axios from "axios";
import { SpecificTweets } from "../SpecificTweet/SpecificTweet";
import { FollowersTweetContext } from "../FollowersTweetContext/FollowersTweetContext";
import Cookies from "js-cookie";
export const TweetContext = createContext();

const TweetContextProvider = ({ children }) => {
  const [myTweets, setMyTweets] = useState([]);
  const [specificUserProfile, setSpecificUserProfile] = useState();
  const [specifictweet, setSpecifictweet] = useState([]);

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
  const [followersTweet, setFollowersTweet, getAllTweetsFromFollowers] =
    useContext(FollowersTweetContext);
  const [specifictweetPage, setSpecifictweetPage] = useContext(SpecificTweets);

  useEffect(() => {
    setInfoLoader(true);

    if (Cookies.get("xid")) {
      const id = Cookies.get("xid");

      const myTweets = allTweets.filter(
        (e) => parseInt(e.authorId) === parseInt(id)
      );
      setMyTweets(myTweets);
      setTimeout(() => {
        setInfoLoader(false);
      }, 2000);
    } else {
      setLoading(false);
    }
  }, [allTweets, allTweets.length]);

  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const likeTweet = (specifictweet_id, userData_id) => {
    try {
      const api = `${backendURL}/tweetinteractions/liketweet/${specifictweet_id}/${userData_id}`;
      axios
        .put(api)
        .then(async (data) => {
          if (data.data.status === 1) {
            setSpecifictweetPage(data.data.tweet);
            await getAllTweetsFromFollowers();
            await getAllTweets();
            await getAllTweetsFromFollowingUsers();
          }
        })
        .catch((err) => {})
        .catch((err) => {});
    } catch (error) {}
  };

  const unlikeTweet = (specifictweet_id, userData_id) => {
    try {
      // Tweetid and userId
      // api =>
      const api = `${backendURL}/tweetinteractions/unliketweet/${specifictweet_id}/${userData_id}`;
      axios
        .put(api)
        .then((data) => {
          if (data.data.status === 1) {
            setSpecifictweetPage(data.data.tweet);
            getAllTweetsFromFollowers();
            getAllTweets();
            getAllTweetsFromFollowingUsers();
          }
        })
        .catch((err) => {});
    } catch (error) {}
  };
  return (
    <TweetContext.Provider
      value={[
        myTweets,
        setMyTweets,
        specificUserProfile,
        setSpecificUserProfile,
        specifictweet,
        setSpecifictweet,
        likeTweet,
        unlikeTweet,
      ]}
    >
      {children}
    </TweetContext.Provider>
  );
};
export default TweetContextProvider;
