import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true); // Add loading state
  const [allTweets, setAllTweets] = useState([]);
  const [infoLoader, setInfoLoader] = useState(true);
  const [followingTweet, setFollowingTweet] = useState([]);
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const fetchUser = async (id) => {
    try {
      await axios.get(`${backendURL}/user/auth/getUser/${id}`).then((data) => {
        setUserData(data.data.data);
        setLoading(false); // Set loading to false when data is fetched
      });
    } catch (error) {
      setLoading(false); // Set loading to false in case of an error
    }
  };

  const getAllTweets = async () => {
    try {
      // setInfoLoader(true);
      axios
        .get(`${backendURL}/tweetaction/getalltweet`)
        .then((data) => {
          const tweets = data.data.tweets.reverse(); // Reverse the order of tweets

          setAllTweets(tweets);
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

  const getAllTweetsFromFollowingUsers = async () => {
    try {
      // setInfoLoader(true);
      axios
        .get(
          `${backendURL}/tweetaction/getTweetfromfollowinguser/${userData?._id}`
        )
        .then((data) => {
          const tweets = data.data.tweets.reverse(); // Reverse the order of tweets

          setFollowingTweet(tweets);
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
  useEffect(() => {
    getAllTweets();
  }, [allTweets?.length]);
  useEffect(() => {
    if (sessionStorage.getItem("twitterdata")) {
      const id = sessionStorage.getItem("twitterdata");
      const toRemoveString = id;
      const stringWithoutQuotes = toRemoveString.replace(/^"(.*)"$/, "$1");
      fetchUser(stringWithoutQuotes);
    } else {
      setLoading(false); // Set loading to false when no user data is available
    }
  }, []);
  useEffect(() => {
    if (userData?._id) {
      getAllTweetsFromFollowingUsers();
    }
  }, [userData?._id, userData?.following?.length]);
  return (
    <AuthContext.Provider
      value={[
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
      ]}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
