import React from "react";
import "./skeleton.css";
import { Link } from "react-router-dom";
export default function ProfileSkeleton({
  with_replies,
  highlights,
  media,
  likes,
}) {
  return (
    <div>
      <div className={"profile_container "}>
        {/* Profile Top */}
        <div className="profile_top ">
          <svg fill="var(--theme-color)" viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
            </g>
          </svg>
          <div className="top_tweetname">
            <p className="skeleton"></p>
            <span className="skeleton_1"></span>
          </div>
        </div>
        {/* Profile content */}
        <div
          className={` " profile_content"
          } `}
        >
          <div className="profile_media">
            <div className="user_cover">
              <p className="User_cover"></p>
            </div>
            <div className="user_profile_edit_btn">
              <div className="user_profile">
                <p className="User_profile"></p>
              </div>
              <div className="edit_btn">
                <button className="skeleton_w_btn"></button>
              </div>
            </div>
          </div>
          {/* name username */}
          <div className="profile_data">
            <div className="name_username">
              <p className="skeleton_w"></p>
              <span className="skeleton_1"></span>
            </div>

            <div className="profile_bio skeleton_bio">
              <p className="skeleton_w"></p>
              <p className="skeleton_w"></p>
              <p className="skeleton_w"></p>
              <p className="skeleton_w"></p>
            </div>

            <div className="other_info">
              <div className="other_information location">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z"></path>
                  </g>
                </svg>
                <p className="skeleton_1"></p>
              </div>

              <div className="other_information website">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M18.36 5.64c-1.95-1.96-5.11-1.96-7.07 0L9.88 7.05 8.46 5.64l1.42-1.42c2.73-2.73 7.16-2.73 9.9 0 2.73 2.74 2.73 7.17 0 9.9l-1.42 1.42-1.41-1.42 1.41-1.41c1.96-1.96 1.96-5.12 0-7.07zm-2.12 3.53l-7.07 7.07-1.41-1.41 7.07-7.07 1.41 1.41zm-12.02.71l1.42-1.42 1.41 1.42-1.41 1.41c-1.96 1.96-1.96 5.12 0 7.07 1.95 1.96 5.11 1.96 7.07 0l1.41-1.41 1.42 1.41-1.42 1.42c-2.73 2.73-7.16 2.73-9.9 0-2.73-2.74-2.73-7.17 0-9.9z"></path>
                  </g>
                </svg>
                <p id="link" className="skeleton_1"></p>
              </div>

              <div className="other_information dob_user">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M8 10c0-2.21 1.79-4 4-4v2c-1.1 0-2 .9-2 2H8zm12 1c0 4.27-2.69 8.01-6.44 8.83L15 22H9l1.45-2.17C6.7 19.01 4 15.27 4 11c0-4.84 3.46-9 8-9s8 4.16 8 9zm-8 7c3.19 0 6-3 6-7s-2.81-7-6-7-6 3-6 7 2.81 7 6 7z"></path>
                  </g>
                </svg>
                <p className="skeleton_w"></p>
              </div>

              <div className="other_information joined_date">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z"></path>
                  </g>
                </svg>
                <p className="skeleton_w"></p>
              </div>
            </div>

            <div className="follower_following_details">
              <div className="userFollowing">
                <p className="skeleton_w"></p>
                {/* <span></span> */}
              </div>
              <div className="userfolllowers">
                <p className="skeleton_w"></p>
              </div>
            </div>
          </div>

          {/* Profile tabs */}

          <div className="profile_tabs">
            <div
              className={`tab_btn ${
                !(with_replies || highlights || media || likes)
                  ? "active_tabs"
                  : ""
              } posts_tab`}
            >
              <div>
                <button>Posts</button>
              </div>
            </div>
            <div
              className={`tab_btn ${
                with_replies ? "active_tabs" : ""
              } replies_tab`}
            >
              <div>
                <button>Replies</button>
              </div>
            </div>
            <div
              className={`tab_btn ${
                highlights ? "active_tabs" : ""
              } highlights_tab`}
            >
              <div>
                <button>Highlights</button>
              </div>
            </div>
            <div className={`tab_btn ${media ? "active_tabs" : ""} media_tab`}>
              <div>
                <button>Media</button>
              </div>
            </div>
            <div className={`tab_btn ${likes ? "active_tabs" : ""} likes_tab`}>
              <div>
                <button>Likes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
