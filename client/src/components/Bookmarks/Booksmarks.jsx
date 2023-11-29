import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
import CardSkeleton from "../TweetFields/Foryou/CardSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import TweetCard from "../../TweetCard/TweetCard";
import axios from "axios";
import InfoLoader from "../Loader/InfoLoader";
import TopComponent from "../TopComponent/TopComponent";
export default function Bookmarks({ socket }) {
  const [, , , , userData, , , , , , , , , , , ,] = useContext(AuthContext);
  const [initialPageCount, setInitialPageCount] = useState(15);
  const [loader, setLoader] = useState(true);
  const [getAllBookMark, setGetAllBookMark] = useState([]);
  const [showInitialArrayOfData, setShowInitialArrayOfData] = useState([]);
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    async function getAllBookMarkByID() {
      try {
        const allBookmark = await axios.get(
          `${backendURL}/getPeople/getAllBookmarkById/${userData._id}`
        );
        const res = allBookmark.data;
        console.log(res.allBookmark.slice(0, initialPageCount));
        if (res.status === 1) {
          setGetAllBookMark(res.allBookmark);
          setShowInitialArrayOfData(res.allBookmark.slice(0, initialPageCount));
          setTimeout(() => {
            setLoader(false); // Disable the loader after updating data
          }, 200);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getAllBookMarkByID();
  }, [backendURL, userData?._id]);

  const fetchMoreData = () => {
    setLoader(true);
    const newPageCount = initialPageCount + 2;
    const newTweets = getAllBookMark.slice(
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
      <TopComponent title="Bookmarks" />
      {loader ? (
        <CardSkeleton />
      ) : getAllBookMark.length > 0 ? (
        <InfiniteScroll
          dataLength={showInitialArrayOfData.length}
          next={fetchMoreData}
          hasMore={showInitialArrayOfData.length < getAllBookMark.length}
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
