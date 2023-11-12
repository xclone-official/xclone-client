import React, { useEffect, useState } from "react";
import "./LikedUser.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/InfoLoader";
export default function LikedUser() {
  const { username, tweetId } = useParams();
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const [likedUser, setLikedUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const goBackToPreviousPage = () => {
    navigate(-1);
  };
  useEffect(() => {
    const getLikeUserFromTweet = () => {
      setIsLoading(true);
      try {
        axios
          .get(`${backendURL}/tweetaction/getALlLikes/${tweetId}`)
          .then((data) => {
            if (data.data.status === 1) {
              const allLikes = data.data.like;
              setLikedUser(allLikes);
              console.log(allLikes);
              setIsLoading(false);
            }
          })
          .catch((err) => {
            console.log("err", err);
          });
      } catch (error) {
        console.log("error", error);
      }
    };
    getLikeUserFromTweet();
  }, [tweetId, username, backendURL]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="friend_suggestion_container">
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
          <p>Tweet</p>
        </div>
      </div>
      <div
        className="friend_suggestion_mid_container"
        style={{
          borderRadius: "0px",
          marginTop: "px",
          backgroundColor: "transparent",
        }}
      >
        <p className="whotofollow">User who Liked</p>
        {likedUser.length > 0 ? (
          likedUser?.map((e) => (
            <div key={e?._id} className="friend_suggestion_card">
              <Link to={`/p/${e?.username}`}>
                <div className="friend_suggestion_image">
                  <img src={backendURL + `/${e?.profile}`} alt="" />
                  <div className="friend_suggestion_credentials">
                    <p>{e?.name}</p>
                    <p className="friend_suggestion_username">@{e?.username}</p>
                  </div>
                </div>
                <p style={{ marginTop: "5px", marginLeft: "50px" }}>{e?.bio}</p>
              </Link>
              <div className="friend_suggestion_follow_btn">
                <button>Follow</button>
              </div>
            </div>
          ))
        ) : (
          <div>
            <div></div>
          </div>
        )}
      </div>
    </div>
  );
}
