import React, { useContext, useEffect } from "react";
import "./editprofile.css";
import { useNavigate, useParams } from "react-router-dom";
import { TweetContext } from "../../useContext/TweetContext/TweetContext";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
export default function Editprofile() {
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
  const navigate = useNavigate();
  const { username } = useParams();
  useEffect(() => {
    document.title = `${userData.fullname} / Edit Profile - Xclone`;
  }, []);
  const goBackToPreviousPage = () => {
    navigate(-1);
  };
  const [myTweets, setMyTweets] = useContext(TweetContext);
  useEffect(() => {
    if (username) {
      if (username !== userData.username) {
        navigate("/home");
      }
    }
  }, []);
  return (
    <div className="edit_profile_container">
      <div className="edit_profile_mid_container">
        <div
          onClick={() => {
            navigate(`/p/${userData.username}`);
          }}
          className="width_30_per"
        ></div>
        <div className="profile_edit_container">
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
                {myTweets.length > 1
                  ? myTweets.length + " tweets"
                  : myTweets.length + " tweet"}
              </span>
            </div>
          </div>
          {/* 
            Users can edit:
              1) Cover picture
              2) Profile picture
              3) Given Name
              4) Bio
              5) Date of birth
              6) Country
              7) Website
          */}
        </div>
        <div
          className="width_30_per"
          onClick={() => {
            navigate(`/p/${userData.username}`);
          }}
        ></div>
      </div>
    </div>
  );
}
