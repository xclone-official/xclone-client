import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
import { useParams } from "react-router-dom";
import InfoLoader from "../Loader/InfoLoader";
import TweetPageCard from "./TweetPageCard";
import axios from "axios";
export default function Tweetpage({ socket }) {
  const [loader, setLoader] = useState(true);
  const [filterdata, setFilterdata] = useState([]);
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
  ] = useContext(AuthContext);
  const { tweetId } = useParams();
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const getTweet = async () => {
    try {
      const getTweetWithId = await axios.get(
        `${backendURL}/tweetaction/gettweetwithid/${tweetId}`
      );
      console.log(getTweetWithId?.data);
      if (getTweetWithId?.data?.status === 1) {
        setFilterdata(getTweetWithId?.data?.tweet);
        setLoader(false);
      } else {
        console.log("Nothing found");
      }
    } catch (error) {
      // setLoader(false);
    }
  };
  useEffect(() => {
    getTweet();
  }, [tweetId]);
  return (
    <div>
      {loader ? (
        <>
          <br />
          <InfoLoader />
        </>
      ) : (
        <TweetPageCard socket={socket} tweetdata={filterdata} />
      )}
    </div>
  );
}
