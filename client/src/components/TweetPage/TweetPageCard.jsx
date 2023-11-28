import React, { useContext, useEffect, useState } from "react";
import "./tweetpage.css";
import PostField from "../PostField/PostField";
import { Link, useNavigate } from "react-router-dom";
import { convertDate } from "../CovertDateTime/ConvertDateTime";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
import { TweetContext } from "../../useContext/TweetContext/TweetContext";
import Loader from "../Loader/InfoLoader";
import { SpecificTweets } from "../../useContext/SpecificTweet/SpecificTweet";
import { customTimeFormat } from "../customTime/customTime";
import RemoveUnnecessaryTag from "../../TweetCard/RemoveUnnecessaryTag";
import { Likebtn, UnlikeBtn } from "../../all-constant/Button";
import AllComments from "./AllComments";
import { BookMark, BookMarked } from "../../all-constant/Bookmark";
import { addBookMark, removeBookMark } from "./allFunctions";
export default function TweetPageCard({ tweetdata, socket }) {
  const navigate = useNavigate();
  const [bookmarkSign, setBookmarkSign] = useState(<BookMark />);
  const [likeBtn, setLikeBtn] = useState(<UnlikeBtn />);
  const goBackToPreviousPage = () => {
    navigate(-1);
  };
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [, , , , userData, setUserData, , , , , , , , , , ,] =
    useContext(AuthContext);

  const [, , , , , , likeTweet, unlikeTweet] = useContext(TweetContext);
  const [showShare, setShowShare] = useState(false);
  const [specifictweetPage, setSpecifictweetPage] = useContext(SpecificTweets);

  useEffect(() => {
    if (tweetdata) {
      setSpecifictweetPage(tweetdata);
    }
  }, [
    tweetdata.authorId,
    tweetdata,
    tweetdata?.authorUsername,
    setSpecifictweetPage,
  ]);
  useEffect(() => {
    if (tweetdata?.tweetContent) {
      // Create a temporary DOM element
      const tempDiv = document.createElement("div");

      // Set the HTML content
      tempDiv.innerHTML = tweetdata.tweetContent;

      // Get the plain text content
      const plainTextContent = tempDiv.textContent;

      // Set the document title with the parsed plain text
      document.title = `${tweetdata.authorName} on X: "${plainTextContent}"`;
    }
  }, [tweetdata]);
  useEffect(() => {
    const getFollowedSign = () => {
      const IsAlreadyLiked = tweetdata?.likes?.some(
        (e) => e.id === userData?._id
      );
      if (IsAlreadyLiked) {
        setLikeBtn(<Likebtn />);
      } else {
        setLikeBtn(<UnlikeBtn />);
      }
    };
    getFollowedSign();
  }, [tweetdata.authorId, tweetdata, tweetdata?.authorUsername, userData?._id]);

  useEffect(() => {
    const getBookMarkSign = () => {
      const IsAlreadyBookMarked = userData?.bookmark?.some(
        (e) => e.tweetId === tweetdata?._id
      );
      if (IsAlreadyBookMarked) {
        setBookmarkSign(<BookMarked />);
      } else {
        setBookmarkSign(<BookMark />);
      }
    };
    getBookMarkSign();
  }, [userData?.bookmark, tweetdata, tweetdata?._id]);
  const toggleFunction = () => {
    const checkIsAlreadyLiked = specifictweetPage?.likes?.some(
      (e) => e.id === userData?._id
    );
    if (!checkIsAlreadyLiked) {
      likeTweet(specifictweetPage?._id, userData?._id);
      setLikeBtn(<Likebtn />);
      socket?.emit("sendLikeNotification", {
        senderUsername: userData?.username,
        receiverUsername: specifictweetPage?.authorUsername,
        type: "liketweet",
        tweet: specifictweetPage,
        tweetId: specifictweetPage?._id,
      });
    } else {
      unlikeTweet(specifictweetPage?._id, userData?._id);
      setLikeBtn(<UnlikeBtn />);
    }
  };
  const handleBookMark = async () => {
    const tweetId = tweetdata?._id;
    const userId = userData?._id;
    const IsAlreadyBookMarked = userData?.bookmark?.some(
      (e) => e.tweetId === tweetId
    );
    if (IsAlreadyBookMarked) {
      const res = await removeBookMark(tweetId, userId);
      if (res.status === 1) {
        setUserData(res.user);
        setSpecifictweetPage(res.tweet);
        setBookmarkSign(<BookMark />);
      }
    } else {
      const res = await addBookMark(tweetId, userId);
      if (res.status === 1) {
        setUserData(res.user);
        setSpecifictweetPage(res.tweet);
        setBookmarkSign(<BookMarked />);
      }
    }
  };
  return (
    <>
      {!specifictweetPage || !specifictweetPage?.length === 0 ? (
        <>
          <br />
          <br />
          <br />
          <Loader />
        </>
      ) : (
        <div className="tweet_container">
          <div
            className="profile_top"
            style={{ display: "flex", alignItems: "center" }}
          >
            <svg
              onClick={goBackToPreviousPage}
              fill="var(--theme-color)"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <g>
                <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
              </g>
            </svg>
            <div className="top_tweetname">
              <p>Post</p>
            </div>
          </div>
          <div className="overflow_scrolll">
            <div className="tweet_posted_user padding_wrap">
              <div className="tweet_user_profile_name">
                <div className="tweet_user_pf">
                  <img
                    src={backendURL + "/" + specifictweetPage.authorProfile}
                    alt=""
                  />
                </div>
                <div className="profile_user_name margin_top_1">
                  <Link to={`/p/${specifictweetPage?.authorUsername}`}>
                    <p>{specifictweetPage.authorName}</p>
                  </Link>
                  <span>@{specifictweetPage.authorUsername}</span>
                </div>
              </div>
              <div className="tweet_user_more_btn">
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
            <div className="tweet_content_text padding_wrap">
              <p>
                <RemoveUnnecessaryTag
                  htmlContent={specifictweetPage?.tweetContent}
                />

                {/* {specifictweetPage?.tweetContent} */}
              </p>
            </div>
            <div className="tweet_media padding_wrap">
              {specifictweetPage.video?.length > 0 ? (
                <video
                  className="border"
                  controls
                  src={`${backendURL}/${specifictweetPage.video[0]}`}
                  alt=""
                />
              ) : specifictweetPage.photos?.length > 0 ? (
                specifictweetPage.photos?.length > 1 ? (
                  specifictweetPage.photos?.map((e, i) => (
                    <img
                      key={i}
                      className="imgfirst-child"
                      src={`${backendURL}/${e}`}
                      alt=""
                    />
                  ))
                ) : (
                  <img
                    className="imglast-child"
                    src={`${backendURL}/${specifictweetPage.photos[0]}`}
                    alt=""
                  />
                )
              ) : (
                ""
              )}
            </div>

            <div className="time_views padding_wrap">
              <p>
                {convertDate(specifictweetPage?.createdAt)} · <span>0</span>{" "}
                views
              </p>
            </div>
            {specifictweetPage?.likes?.length > 0 && (
              <div className="view_engagement padding_wrap">
                {
                  <Link
                    to={`/${specifictweetPage?.authorUsername}/tweet/${specifictweetPage?._id}/likes`}
                    style={{ display: "flex", gap: "5px" }}
                  >
                    <p>{specifictweetPage?.likes?.length}</p>

                    <span>Likes</span>
                  </Link>
                }
              </div>
            )}

            <div className="view_engagement">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"></path>
                </g>
              </svg>
              <p>View engagement</p>
            </div>
            <div className="tweet_interactions_options break">
              <div className="tweet_comments svg_width">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
                  </g>
                </svg>
                {specifictweetPage?.comments?.length > 0 && (
                  <p>{specifictweetPage?.comments?.length}</p>
                )}
              </div>
              <div className="retweet_tweet svg_width">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
                  </g>
                </svg>
                {specifictweetPage?.retweet?.length > 0 && (
                  <p>{specifictweetPage?.retweet?.length}</p>
                )}
              </div>

              <div className="like_tweet svg_width" onClick={toggleFunction}>
                {likeBtn}
                {specifictweetPage?.likes?.length > 0 && (
                  <p>{specifictweetPage?.likes?.length}</p>
                )}
              </div>

              <div className=" svg_width" onClick={handleBookMark}>
                {bookmarkSign}
                {specifictweetPage?.bookmark?.length > 0 && (
                  <p>{specifictweetPage?.bookmark?.length}</p>
                )}
              </div>

              <div className="tweet_share svg_width">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  onClick={() => setShowShare(!showShare)}
                >
                  <g>
                    <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"></path>
                  </g>
                </svg>
                {showShare && (
                  <div id="share_tweet">
                    <button>Delete</button>
                    <button>Copy link</button>
                  </div>
                )}
              </div>
            </div>
            <PostField
              tweetId={tweetdata?._id}
              receiverUsername={tweetdata?.authorUsername}
              comment={true}
              tweetdata={tweetdata}
              socket={socket}
            />

            {/* Comment Section */}
            <AllComments
              specifictweetPage={specifictweetPage}
              backendURL={backendURL}
              Link={Link}
              customTimeFormat={customTimeFormat}
              tweetdata={tweetdata}
              RemoveUnnecessaryTag={RemoveUnnecessaryTag}
            />
          </div>
          <div className="margin_top_100"></div>
        </div>
      )}
    </>
  );
}
