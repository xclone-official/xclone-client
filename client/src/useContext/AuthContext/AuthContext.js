import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { NotificationContext } from "../NotificationsContext/NotificationsContext";

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
  const [allNotification, setAllNotification] = useContext(NotificationContext);
  const fetchUser = async (id) => {
    try {
      await axios.get(`${backendURL}/user/auth/getUser/${id}`).then((data) => {
        const allData = data.data.data;
        setUserData(allData);
        const getAllNotifications = allData.allNotifications;
        setAllNotification(
          getAllNotifications?.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
          })
        );
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
          const tweets = data.data.tweets; // Reverse the order of tweets
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

  const getAllTweetsFromFollowingUsers = async () => {
    try {
      // setInfoLoader(true);
      axios
        .get(
          `${backendURL}/tweetaction/getTweetfromfollowinguser/${userData?._id}`
        )
        .then((data) => {
          const tweets = data.data.tweets; // Reverse the order of tweets
          // console.log(tweets);
          setFollowingTweet(
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
  useEffect(() => {
    getAllTweets();
  }, [allTweets?.length, userData?._id, userData?.following?.length]);
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
        getAllTweets,
        getAllTweetsFromFollowingUsers,
      ]}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
