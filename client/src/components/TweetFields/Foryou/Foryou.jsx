import React, { useContext, useEffect, useState } from "react";
import "./foryou.css";
import TweetCard from "../../../TweetCard/TweetCard";
import { AuthContext } from "../../../useContext/AuthContext/AuthContext";
import InfoLoader from "../../Loader/InfoLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import PostField from "../../PostField/PostField";

export default function Foryou() {
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

  const [initialPageCount, setInitialPageCount] = useState(2);
  const [showInitialArrayOfData, setShowInitialArrayOfData] = useState(
    allTweets.slice(0, initialPageCount)
  );

  useEffect(() => {
    allTweets.slice(0, initialPageCount);
    setShowInitialArrayOfData(allTweets.slice(0, initialPageCount));
  }, [allTweets.length]);

  const fetchMoreData = () => {
    const newPageCount = initialPageCount + 2;
    const newTweets = allTweets.slice(initialPageCount, newPageCount);
    // Concatenate the new tweets to the existing data
    setShowInitialArrayOfData((data) => [...data, ...newTweets]);
    setInitialPageCount(newPageCount);
  };

  return (
    <>
      {allTweets.length === 0 && (
        <div className="hide_in_phone">
          <PostField />
        </div>
      )}
      {infoLoader ? (
        <InfoLoader />
      ) : allTweets.length > 0 ? (
        <InfiniteScroll
          dataLength={showInitialArrayOfData.length}
          next={fetchMoreData}
          hasMore={showInitialArrayOfData.length < allTweets.length}
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
          <div className="hide_in_phone">
            <PostField />
          </div>
          <div className="">
            {showInitialArrayOfData.map((tweet, index) => (
              <TweetCard tweets={tweet} key={index} />
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
          No Tweets Found. <br /> Please try refreshing.
        </div>
      )}
    </>
  );
}
