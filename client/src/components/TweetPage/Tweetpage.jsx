import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoLoader from "../Loader/InfoLoader";
import TweetPageCard from "./TweetPageCard";
import axios from "axios";
export default function Tweetpage({ socket }) {
  const [loader, setLoader] = useState(true);
  const [filterdata, setFilterdata] = useState([]);
  const [IsTweetExist, setIsTweetExist] = useState(true);
  const { tweetId } = useParams();
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    setIsTweetExist(true);
    const getTweet = async () => {
      try {
        const getTweetWithId = await axios.get(
          `${backendURL}/tweetaction/gettweetwithid/${tweetId}`
        );
        if (getTweetWithId?.data?.status === 1) {
          setFilterdata(getTweetWithId?.data?.tweet);
          setLoader(false);
        } else {
          setLoader(false);
          setIsTweetExist(false);
        }
      } catch (error) {
        setLoader(false);
        setIsTweetExist(false);
      }
    };
    getTweet();
  }, [tweetId, backendURL]);
  return (
    <div>
      {loader ? (
        <>
          <br />
          <br />
          <InfoLoader />
        </>
      ) : (
        !IsTweetExist && (
          <div style={{ width: "80%", padding: "30% 0 0 5%" }}>
            <p>
              Tweet couldn't be find, maybe the tweet has been removed by the
              author or the tweetId is incorrect!
            </p>
          </div>
        )
      )}
      {IsTweetExist && !loader && (
        <TweetPageCard socket={socket} tweetdata={filterdata} />
      )}
    </div>
  );
}
