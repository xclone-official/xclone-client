import React from "react";
import "./profile.css";
import ProfileSkeleton from "./ProfileSkeleton";
export default function DeactivateProfileAcc({ children, isloading }) {
  return (
    <>
      {isloading ? (
        <ProfileSkeleton />
      ) : (
        <div className={"profile_container"}>
          {/* View Profile in fulll */}
          {/* Profile Top */}
          <div className="profile_top">
            <svg
              fill="var(--theme-color)"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <g>
                <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
              </g>
            </svg>
            <div className="top_tweetname">
              <p>User not found!</p>
              <span>0 tweet</span>
            </div>
          </div>
          {/* Profile content */}
          <div className={`profile_content`}>
            <div className="profile_media">
              <div className="user_cover">
                <img src="/cover.png" alt="cover" />
              </div>
              <div className="user_profile_edit_btn">
                <div className="user_profile">
                  <img src="/xlogo.png" alt="profile" />
                </div>
              </div>
            </div>
            {/* name? username */}
            <div className="profile_data">
              <div className="name_username">
                <p>User Not Found</p>
                <span>@usernotfound</span>
              </div>
            </div>
            <div className="bio" style={{ padding: "0px 20px" }}>
              <p>This user has deactivated their profile.</p>
            </div>
            <br />
            <div className="border"></div>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
