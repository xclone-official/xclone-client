import React, { useContext, useEffect, useState } from "react";
import "./following.css";
import TweetCard from "../../../TweetCard/TweetCard";
import { AuthContext } from "../../../useContext/AuthContext/AuthContext";
import InfoLoader from "../../Loader/InfoLoader";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Following({ socket }) {
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
    followingTweet,
    setFollowingTweet,
  ] = useContext(AuthContext);

  const [initialPageCount, setInitialPageCount] = useState(15);
  const [loader, setLoader] = useState(false);
  const [showInitialArrayOfData, setShowInitialArrayOfData] = useState([]);

  useEffect(() => {
    // Initialize the initial data to show
    setShowInitialArrayOfData(followingTweet.slice(0, initialPageCount));
  }, [followingTweet]); // Add followingTweet as a dependency

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
        <InfoLoader />
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
