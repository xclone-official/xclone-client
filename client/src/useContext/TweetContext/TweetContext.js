import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import axios from "axios";
import { SpecificTweets } from "../SpecificTweet/SpecificTweet";
import { FollowersTweetContext } from "../FollowersTweetContext/FollowersTweetContext";
import Cookies from "js-cookie";
import { AllTweetContext } from "../AllTweetContext/AllTweetContextProvider";
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
    ,
    ,
    infoLoader,
    setInfoLoader,
    followingTweet,
    setFollowingTweet,
    getAllTweets,
    getAllTweetsFromFollowingUsers,
  ] = useContext(AuthContext);
  const [followersTweet, setFollowersTweet, getAllTweetsFromFollowers] =
    useContext(FollowersTweetContext);
  const [allTweets, setAllTweets, getAllTweet] = useContext(AllTweetContext);
  const [specifictweetPage, setSpecifictweetPage] = useContext(SpecificTweets);
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  async function fetchData(id) {
    console.log(id);
    const myTweets = await axios.get(
      `${backendURL}/tweetaction/getusertweet/${id}`
    );
    const parseTweet = myTweets.data;
    if (parseTweet.status === 1) {
      setMyTweets(parseTweet);
    } else {
      alert("Error: Fetching tweets");
    }
    setTimeout(() => {
      setInfoLoader(false);
    }, 2000);
  }
  useEffect(() => {
    setInfoLoader(true);
    if (Cookies.get("xid")) {
      const id = Cookies.get("xid");
      fetchData(id);
    } else {
      setLoading(false);
    }
  }, [allTweets, allTweets.length]);

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
            await getAllTweet();
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
            getAllTweet();
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
