import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
import { useParams } from "react-router-dom";
import InfoLoader from "../Loader/InfoLoader";
import TweetPageCard from "./TweetPageCard";
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
  const getTweet = async () => {
    try {
      // setLoader(true);
      const getTweetWithId = allTweets.filter((e) => e._id === tweetId);
      if (getTweetWithId?.length > 0) {
        setFilterdata(getTweetWithId);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getTweet();
  }, [tweetId]);
  return (
    <div>
      {loader ? (
        <InfoLoader />
      ) : (
        <TweetPageCard socket={socket} tweetdata={filterdata[0]} />
      )}
    </div>
  );
}
