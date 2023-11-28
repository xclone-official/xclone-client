import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoLoader from "../Loader/InfoLoader";
import TweetPageCard from "./TweetPageCard";
import axios from "axios";
export default function Tweetpage({ socket }) {
  const [loader, setLoader] = useState(true);
  const [filterdata, setFilterdata] = useState([]);
  const { tweetId } = useParams();
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const getTweet = async () => {
      try {
        const getTweetWithId = await axios.get(
          `${backendURL}/tweetaction/gettweetwithid/${tweetId}`
        );
        if (getTweetWithId?.data?.status === 1) {
          setFilterdata(getTweetWithId?.data?.tweet);
          setLoader(false);
        } else {
        }
      } catch (error) {}
    };
    getTweet();
  }, [tweetId, backendURL]);
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
