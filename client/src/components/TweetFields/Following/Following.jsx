import React, { useContext, useEffect, useState } from "react";
import "./following.css";
import TweetCard from "../../../TweetCard/TweetCard.1";
import { AuthContext } from "../../../useContext/AuthContext/AuthContext";
import InfoLoader from "../../Loader/InfoLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import CardSkeleton from "../Foryou/CardSkeleton";

export default function Following({ socket }) {
  const [, , , , , , , , , , , , followingTweet] = useContext(AuthContext);

  const [initialPageCount, setInitialPageCount] = useState(15);
  const [loader, setLoader] = useState(true);
  const [showInitialArrayOfData, setShowInitialArrayOfData] = useState([]);

  useEffect(() => {
    // Initialize the initial data to show
    setShowInitialArrayOfData(followingTweet.slice(0, initialPageCount));
    setTimeout(() => {
      setLoader(false); // Disable the loader after updating data
    }, 200);
  }, [followingTweet, initialPageCount]); // Add followingTweet as a dependency

  const fetchMoreData = () => {
    setLoader(true);
    const newPageCount = initialPageCount + 2;
    const newTweets = followingTweet.slice(
      initialPageCount,
      initialPageCount + 2
    );

    if (newTweets.length > 0) {
      // Concatenate the new tweets to the existing data
      setShowInitialArrayOfData((data) => [...data, ...newTweets]);
      setInitialPageCount(newPageCount);
    }

    setLoader(false); // Disable the loader after updating data
  };

  return (
    <>
      {loader ? (
        <CardSkeleton />
      ) : followingTweet.length > 0 ? (
        <InfiniteScroll
          dataLength={showInitialArrayOfData.length}
          next={fetchMoreData}
          hasMore={showInitialArrayOfData.length < followingTweet.length}
          loader={<InfoLoader />}
          height="640px"
          endMessage={
            <div
              style={{
                textAlign: "center",
                margin: "5px",
                paddingBottom: "200px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <p>No more tweet.</p>
            </div>
          }
        >
          <div className="">
            {showInitialArrayOfData.map((tweet, index) => (
              <TweetCard socket={socket} tweets={tweet} key={index} />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <div
          style={{
            textAlign: "center",
            margin: "5px",
            padding: "200px 0",
            display: "flex",
            justifyContent: "center",
            fontSize: "14px",
          }}
        >
          No Tweets Found.
        </div>
      )}
    </>
  );
}
