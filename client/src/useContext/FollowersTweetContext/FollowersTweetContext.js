import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import axios from "axios";
export const FollowersTweetContext = createContext();

const FollowersTweetContextProvider = ({ children }) => {
  const [, , , , userData, , , , , , , , , , , ,] = useContext(AuthContext);
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
      const getAllTweetsFromFollowers = async () => {
        try {
          axios
            .get(
              `${backendURL}/tweetaction/getTweetFromFollowers/${userData?._id}`
            )
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
      getAllTweetsFromFollowers();
    }
  }, [userData, backendURL]);
  return (
    <FollowersTweetContext.Provider
      value={[followersTweet, setFollowersTweet, getAllTweetsFromFollowers]}
    >
      {children}
    </FollowersTweetContext.Provider>
  );
};
export default FollowersTweetContextProvider;
