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
    allTweets,
    setAllTweets,
    infoLoader,
    setInfoLoader,
    followingTweet,
    setFollowingTweet,
    ,
    getAllTweetsFromFollowingUsers,
  ] = useContext(AuthContext);
  const [, , getAllTweetsFromFollowers] = useContext(FollowersTweetContext);
  const [allTweetsFROMALLPEOPLE, setAllTweetsFROMALLPEOPLE] =
    useContext(AllTweetContext);
  const [, setSpecifictweetPage] = useContext(SpecificTweets);
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (Cookies.get("xid")) {
      const id = Cookies.get("xid");
      async function fetchData(id) {
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
      fetchData(id);
    } else {
      setLoading(false);
    }
  }, [setLoading, backendURL, setInfoLoader]);

  async function getAllTweet() {
    const fetchData = await axios.get(`${backendURL}/tweetaction/getalltweets`);
    if (fetchData.data.status === 1) {
      return setAllTweetsFROMALLPEOPLE(fetchData.data.tweet);
    } else alert("Error: Fetching tweets");
  }

  const getAllTweets = async () => {
    try {
      await axios
        .get(`${backendURL}/tweetaction/getalltweet/${userData?._id}`)
        .then((data) => {
          const tweets = data.data.tweets;
          setAllTweets(
            tweets.sort(function (a, b) {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
          );
          setTimeout(() => {
            setInfoLoader(false);
          }, 2000);
        })
        .catch((err) => {
          setTimeout(() => {
            setInfoLoader(false);
          }, 2000);
        });
    } catch (error) {
      setTimeout(() => {
        setInfoLoader(false);
      }, 2000);
    }
  };

  const likeTweet = (specifictweet_id, userData_id) => {
    try {
      const api = `${backendURL}/tweetinteractions/liketweet/${specifictweet_id}/${userData_id}`;
      axios
        .put(api)
        .then(async (data) => {
          if (data.data.status === 1) {
            setSpecifictweetPage(data.data.tweet);
            await getAllTweet();
            await getAllTweets();
          }
        })
        .catch((err) => {})
        .catch((err) => {});
    } catch (error) {}
  };

  const unlikeTweet = (specifictweet_id, userData_id) => {
    try {
      const api = `${backendURL}/tweetinteractions/unliketweet/${specifictweet_id}/${userData_id}`;
      axios
        .put(api)
        .then(async (data) => {
          if (data.data.status === 1) {
            setSpecifictweetPage(data.data.tweet);
            await getAllTweet();
            await getAllTweets();
          }
        })
        .catch((err) => {});
    } catch (error) {}
  };
  const allValues = [
    myTweets,
    setMyTweets,
    specificUserProfile,
    setSpecificUserProfile,
    specifictweet,
    setSpecifictweet,
    likeTweet,
    unlikeTweet,
  ];
  return (
    <TweetContext.Provider value={allValues}>{children}</TweetContext.Provider>
  );
};
export default TweetContextProvider;
