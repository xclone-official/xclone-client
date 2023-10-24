import React, { useContext, useEffect, useState } from "react";
import "./following.css";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
import FollowersViewPage from "../FollowersViewPage/FollowersViewPage";
import FollowingViewPage from "../FollowingViewPage/FollowingViewPage";
export default function Following({ following, follower, profileData }) {
  const [, , , , userData, , , , allTweets, , , , , ,] =
    useContext(AuthContext);
  const navigate = useNavigate();
  const goBackToPreviousPage = () => {
    navigate(-1);
  };
  return (
    <div>
      <>
        <div className="profile_top">
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
            <p>{userData?.fullname}</p>
            <span>
              {allTweets?.filter((e) => e?.authorId === profileData?._id)
                .length > 1
                ? allTweets?.filter((e) => e?.authorId === profileData?._id)
                    .length + " tweets"
                : allTweets?.filter((e) => e?.authorId === profileData?._id)
                    .length + " tweet"}
            </span>
          </div>
        </div>
        <div className="follower_following_tabs">
          <div
            onClick={() => {
              navigate(`/p/${profileData?.username}/followers`);
            }}
            className={`followers ${follower && "border__"}`}
          >
            <p>Followers</p>
          </div>
          <div
            onClick={() => {
              navigate(`/p/${profileData?.username}/following`);
            }}
            className={`following ${following && "border__"}`}
          >
            <p>Following</p>
          </div>
        </div>

        {follower && <FollowersViewPage />}
        {following && <FollowingViewPage />}
      </>
    </div>
  );
}
