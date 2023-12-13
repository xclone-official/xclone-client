import React, { useContext, useEffect, useState } from "react";
import TweetCard from "../../../TweetCard/TweetCard.1";
import InfoLoader from "../../Loader/InfoLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import { FollowersTweetContext } from "../../../useContext/FollowersTweetContext/FollowersTweetContext";
import CardSkeleton from "../Foryou/CardSkeleton";

export default function Followers({ socket }) {
  const [followersTweet] = useContext(FollowersTweetContext);

  const [initialPageCount, setInitialPageCount] = useState(15);
  const [loader, setLoader] = useState(true);
  const [showInitialArrayOfData, setShowInitialArrayOfData] = useState([]);

  useEffect(() => {
    // Initialize the initial data to show
    setShowInitialArrayOfData(followersTweet.slice(0, initialPageCount));
    setTimeout(() => {
      setLoader(false); // Disable the loader after updating data
    }, 200);
  }, [followersTweet, initialPageCount]); // Add followersTweet as a dependency

  const fetchMoreData = () => {
    setLoader(true);
    const newPageCount = initialPageCount + 2;
    const newTweets = followersTweet.slice(
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
      ) : followersTweet.length > 0 ? (
        <InfiniteScroll
          dataLength={showInitialArrayOfData.length}
          next={fetchMoreData}
          hasMore={showInitialArrayOfData.length < followersTweet.length}
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
