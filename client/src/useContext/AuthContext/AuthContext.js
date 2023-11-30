import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { NotificationContext } from "../NotificationsContext/NotificationsContext";
import Cookies from "js-cookie";
import ShowDeactivationPromptToActivate from "../../components/auth/ShowDeactivationPromptToActivate";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true); // Add loading state
  const [allTweets, setAllTweets] = useState([]);
  const [infoLoader, setInfoLoader] = useState(true);
  const [followingTweet, setFollowingTweet] = useState([]);
  const [show_deactivation_prompt_to_activate, ,] = useState(false);
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [, setAllNotification] = useContext(NotificationContext);

  const getAllTweets = async () => {
    try {
      axios
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

  const getAllTweetsFromFollowingUsers = async () => {
    try {
      // setInfoLoader(true);
      axios
        .get(
          `${backendURL}/tweetaction/getTweetfromfollowinguser/${userData?._id}`
        )
        .then((data) => {
          const tweets = data.data.tweets; // Reverse the order of tweets
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
    if (userData?._id) {
      const getAllTweets = async () => {
        try {
          axios
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
      getAllTweets();
    }
  }, [allTweets?.length, userData?._id, backendURL]);
  useEffect(() => {
    if (Cookies.get("xid")) {
      const id = Cookies.get("xid");
      const toRemoveString = id;
      const stringWithoutQuotes = toRemoveString.replace(/^"(.*)"$/, "$1");
      const fetchUser = async (id) => {
        try {
          await axios
            .get(`${backendURL}/user/auth/getUser/${id}`)
            .then((data) => {
              const allData = data.data;
              if (allData.status === 1) {
                if (allData.data.flag) {
                  Cookies.remove("xid");
                  window.location = "/";
                }
                setUserData(allData.data);
                const getAllNotifications = allData.data.allNotifications;
                setAllNotification(
                  getAllNotifications?.sort(function (a, b) {
                    return new Date(b.date) - new Date(a.date);
                  })
                );
              }
              setLoading(false); // Set loading to false when data is fetched
            });
        } catch (error) {
          setLoading(false); // Set loading to false in case of an error
        }
      };
      fetchUser(stringWithoutQuotes);
    } else {
      setLoading(false); // Set loading to false when no user data is available
    }
  }, [backendURL, setAllNotification]);
  useEffect(() => {
    if (userData?._id) {
      const getAllTweetsFromFollowingUsers = async () => {
        try {
          // setInfoLoader(true);
          axios
            .get(
              `${backendURL}/tweetaction/getTweetfromfollowinguser/${userData?._id}`
            )
            .then((data) => {
              const tweets = data.data.tweets; // Reverse the order of tweets
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
      getAllTweetsFromFollowingUsers();
    }
  }, [userData?._id, userData?.following?.length, backendURL]);
  if (show_deactivation_prompt_to_activate) {
    return <ShowDeactivationPromptToActivate />;
  }
  const values = [
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
  ];
  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
