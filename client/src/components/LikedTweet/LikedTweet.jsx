import React, { useEffect, useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import InfoLoader from "../Loader/InfoLoader";
import LikedCard from "./LikedCard";
export default function LikedTweet({ profileData }) {
  const [initialData, setInitialData] = useState(5);
  const [initialLikedArray, setInitialLikedArray] = useState();
  useEffect(() => {
    setInitialLikedArray(profileData?.likedTweet?.slice(0, initialData));
  }, [profileData]);
  const fetchMoreData = () => {
    if (profileData?.likedTweet) {
      // Calculate the next index based on the current length of initialLikedArray
      const nextIndex = initialLikedArray.length + 2;
      // Get the next 2 liked tweets
      const nextLikedTweets = profileData.likedTweet.slice(
        nextIndex - 2,
        nextIndex
      );

      // Update the initialLikedArray with the nextLikedTweets
      setInitialLikedArray((prevLikedArray) => [
        ...prevLikedArray,
        ...nextLikedTweets,
      ]);
    }
  };
  return (
    <div>
      {initialLikedArray?.length > 0 ? (
        <InfiniteScroll
          className="scrollbar_hide"
          dataLength={initialLikedArray?.length}
          next={fetchMoreData}
          hasMore={initialLikedArray?.length < profileData?.likedTweet?.length}
          loader={<InfoLoader />}
          height="90vh"
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
          <div>
            {initialLikedArray.map((data, index) => {
              return <LikedCard tweets={data?.tweet} key={index} />;
            })}
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
          <br />
          When you like a tweet,
          <br />
          It will show up here.
        </div>
      )}
    </div>
  );
}
