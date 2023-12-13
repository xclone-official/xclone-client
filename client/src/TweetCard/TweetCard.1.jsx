import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../useContext/AuthContext/AuthContext";
import { TweetContext } from "../useContext/TweetContext/TweetContext";
import { customTimeFormat } from "../components/customTime/customTime";
import RemoveUnnecessaryTag from "./RemoveUnnecessaryTag";
import axios from "axios";
import { UnlikeBtn, Likebtn, VerifiedAcccount } from "./TweetCard";

export default function TweetCard({ tweets, socket }) {
  const [, , , , userData, , , , , , , , , ,] = useContext(AuthContext);
  const [, , , , , , likeTweet, unlikeTweet] = useContext(TweetContext);
  const [likeBtn, setLikeBtn] = useState(<UnlikeBtn />);
  const [tweet_data, setTweet_data] = useState({});
  const navigate = useNavigate();
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const getFollowedSign = () => {
      const IsAlreadyLiked = tweets?.likes?.some((e) => e.id === userData?._id);
      if (IsAlreadyLiked) {
        setLikeBtn(<Likebtn />);
      } else {
        setLikeBtn(<UnlikeBtn />);
      }
    };

    getFollowedSign();
  }, [tweets?.likes, userData?._id]);
  useEffect(() => {
    function getTweetWithID(tweetId) {
      try {
        axios
          .get(`${backendURL}/tweetaction/gettweetwithid/${tweetId}`)
          .then((data) => {
            if (data.data.status === 1) {
              setTweet_data(data.data.tweet);
            }
          })
          .catch((err) => {
            console.log("err");
          });
      } catch (error) {
        console.log(error);
      }
    }
    getTweetWithID(tweets?._id);
  }, [tweets?._id]);

  const toggleFunction = () => {
    const checkIsAlreadyLiked = tweets?.likes?.some(
      (e) => e.id === userData?._id
    );
    if (!checkIsAlreadyLiked) {
      likeTweet(tweets?._id, userData?._id);
      setLikeBtn(<Likebtn />);
      tweets.authorId !== userData?._id &&
        socket?.emit("sendLikeNotification", {
          senderUsername: userData?.username,
          receiverUsername: tweets?.authorUsername,
          type: "liketweet",
          tweet: tweets,
          tweetId: tweets?._id,
        });
    } else {
      unlikeTweet(tweets?._id, userData?._id);
      setLikeBtn(<UnlikeBtn />);
    }
  };

  return (
    <>
      <div className="tweetcard_container ">
        <div className="tweetcard_content">
          <div className="tweetcard_user_profile">
            <Link to={`/p/${tweet_data?.authorUsername}`}>
              <img src={backendURL + "/" + tweet_data?.authorProfile} alt="" />
            </Link>
          </div>
          <div className="tweetcard_other_content">
            <div className="user_details_options">
              <div className="tweetcard_userdetails">
                <Link to={`/p/${tweet_data?.authorUsername}`}>
                  <div className="user_name">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      <span>{tweet_data?.authorName}</span>
                      <p
                        title="Verified"
                        style={{ width: "15px", marginBottom: "-3px" }}
                      >
                        <VerifiedAcccount />
                      </p>
                    </div>
                  </div>
                </Link>
                <div>
                  <div className="username">
                    <span>@{tweet_data?.authorUsername}</span>
                    <span>• {customTimeFormat(tweet_data?.createdAt)} </span>
                  </div>
                </div>
              </div>
              <div className="option_icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path
                      fill="var(--theme-color)"
                      d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
            <div className="tweet_content">
              <div
                onClick={() =>
                  navigate(
                    `/${tweet_data?.authorUsername}/tweet/${tweet_data?._id}`
                  )
                }
              >
                {/* <span
              className="tweet_text"
              dangerouslySetInnerHTML={{ __html: tweet_data?.tweetContent }}
            ></span> */}
                <RemoveUnnecessaryTag htmlContent={tweet_data?.tweetContent} />
              </div>
              <div className="tweet_media">
                {tweet_data?.video?.length > 0 ? (
                  <video
                    className="imglast-child video"
                    controls
                    src={`${backendURL}/${tweet_data?.video[0]}`}
                    alt=""
                  />
                ) : tweet_data?.photos?.length > 0 ? (
                  tweet_data?.photos?.length > 1 ? (
                    tweet_data?.photos?.map((e) => (
                      <img
                        key={e}
                        className="imgfirst-child"
                        src={`${backendURL}/${e}`}
                        alt=""
                      />
                    ))
                  ) : (
                    <img
                      className="imglast-child"
                      src={`${backendURL}/${tweet_data?.photos[0]}`}
                      alt=""
                    />
                  )
                ) : (
                  ""
                )}
              </div>
              {/* Tweet Interactions */}
              <div className="tweet_interactions_options ">
                <div className="tweet_comments svg_width">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
                    </g>
                  </svg>
                  {tweet_data?.comments?.length > 0 && (
                    <p>{tweet_data?.comments?.length}</p>
                  )}
                </div>
                <div className="retweet_tweet svg_width">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
                    </g>
                  </svg>
                </div>

                <div className="like_tweet svg_width" onClick={toggleFunction}>
                  {likeBtn}
                  {tweet_data?.likes?.length > 0 && (
                    <p>{tweet_data?.likes?.length}</p>
                  )}
                </div>

                <div className="tweet_share svg_width">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"></path>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
