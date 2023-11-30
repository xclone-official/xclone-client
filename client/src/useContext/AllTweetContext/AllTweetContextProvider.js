import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AllTweetContext = createContext();

const AllTweetContextProvider = ({ children }) => {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [allTweets, setAllTweets] = useState([]);
  async function getAllTweet() {
    const fetchData = await axios.get(`${backendURL}/tweetaction/getalltweets`);
    if (fetchData.data.status === 1) {
      return setAllTweets(fetchData.data.tweet);
    } else return alert("Error: Fetching tweets");
  }
  useEffect(() => {
    async function getAllTweet() {
      const fetchData = await axios.get(
        `${backendURL}/tweetaction/getalltweets`
      );
      if (fetchData.data.status === 1) {
        return setAllTweets(fetchData.data.tweet);
      } else return alert("Error: Fetching tweets");
    }
    getAllTweet();
  }, [backendURL]);

  const allValues = [allTweets, setAllTweets, getAllTweet];
  return (
    <AllTweetContext.Provider value={allValues}>
      {children}
    </AllTweetContext.Provider>
  );
};
export default AllTweetContextProvider;
