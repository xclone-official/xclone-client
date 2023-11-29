import React from "react";
import "./FollowersFollowingCard.css";
import { NavLink, useNavigate } from "react-router-dom";
export default function FollowersFollowingCard({ data }) {
  const navigate = useNavigate();
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  return (
    <div
      className="follower_following_single_card"
      onClick={() => {
        navigate(`/p/${data?.username}`);
      }}
    >
      <NavLink
        to={`/p/${data?.username}`}
        className="follower_following_card_image"
      >
        <img src={backendURL + `/${data?.profile}`} alt="profile" />
      </NavLink>
      <div className="following_follower_card_details">
        <div className="following_follower_btns_name">
          <div className="following_follower_name">
            <p>{data?.name}</p>
            <p>
              @{data?.username}
              {/* <span>Follows you</span> */}
            </p>
          </div>
          {/* <div className="following_follower_btns">
            <button>Following</button>
            <p>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                </g>
              </svg>
            </p>
          </div> */}
        </div>
        <div className="following_follower_bio">
          <p>{data?.bio}</p>
        </div>
      </div>
    </div>
  );
}
