import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import axios from "axios";
import { SpecificTweets } from "../SpecificTweet/SpecificTweet";
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

  const [specifictweetPage, setSpecifictweetPage] = useContext(SpecificTweets);

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

  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const likeTweet = (specifictweet_id, userData_id) => {
    try {
      // Tweetid and userId
      // api =>
      console.log("liked");
      const api = `${backendURL}/tweetinteractions/liketweet/${specifictweet_id}/${userData_id}`;
      console.log(api);
      axios
        .put(api)
        .then((data) => {
          if (data.data.status === 1) {
            // setSpecifictweet(data.data.tweet);
            // setLikeBtn(<Likebtn />);
            setSpecifictweetPage(data.data.tweet);
            getAllTweets();
            getAllTweetsFromFollowingUsers();
            console.log("liked inner");
          }
        })
        .catch((err) => {
          // console.log(err);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {}
  };

  const unlikeTweet = (specifictweet_id, userData_id) => {
    try {
      // Tweetid and userId
      // api =>
      console.log("Unliked");
      const api = `${backendURL}/tweetinteractions/unliketweet/${specifictweet_id}/${userData_id}`;
      axios
        .put(api)
        .then((data) => {
          if (data.data.status === 1) {
            // setSpecifictweet(data.data.tweet);
            // setLikeBtn(<UnlikeBtn />);
            setSpecifictweetPage(data.data.tweet);
            getAllTweets();
            getAllTweetsFromFollowingUsers();
            console.log("unliked inner");
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
