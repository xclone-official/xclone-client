import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
import "./profile.css";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import Foryou from "../TweetFields/Foryou/Foryou";
import { TweetContext } from "../../useContext/TweetContext/TweetContext";
import axios from "axios";
import ProfileSkeleton from "./ProfileSkeleton";
export default function Profile({ with_replies, highlights, media, likes }) {
  const navigate = useNavigate();
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
  ] = useContext(AuthContext);
  const [myTweets, setMyTweets] = useContext(TweetContext);
  const [showMedia, setShowMedia] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profileData, setprofileData] = useState();
  const [isloading, setLoader] = useState(false);
  const [isUserExist, setIsUserExist] = useState(true);
  const { username } = useParams();
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const getSpecificUser = () => {
    setLoader(true);
    document.title = "Loading...";
    try {
      axios.get(`${backendURL}/user/auth/getUser/${username}`).then((data) => {
        if (data.data.status === 1) {
          const user = data.data.data;
          setprofileData(user);
          setLoader(false);
          document.title = `${user?.fullname} (@${user?.username}) / X`;
        } else {
          setIsUserExist(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  if (!isUserExist) {
    <>
      <p>User doesn't exists.</p>
    </>;
  }
  useEffect(() => {
    if (profileData?.username !== username) getSpecificUser();
    else setprofileData(profileData);
  }, [username]);

  const goBackToPreviousPage = () => {
    navigate(-1);
  };
  const showImage = () => {
    setShowMedia(!showMedia);
    setShowLogin(showMedia ? true : false);
  };
  const setShowProfilePic = () => {
    setShowProfile(!showProfile);
  };
  return (
    <>
      {isloading ? (
        <ProfileSkeleton />
      ) : (
        <div className={"profile_container"}>
          {/* View Profile in full */}
          {showMedia && (
            <>
              <div className="view_profile">
                <img src="/cover.jpg" alt="" />
                <p onClick={showImage}>X</p>
              </div>
            </>
          )}
          {showProfile && (
            <>
              <div className="view_cover">
                <img src="/pfp.png" alt="" />
                <p onClick={setShowProfilePic}>X</p>
              </div>
            </>
          )}
          {/* Profile Top */}
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
              <p>{profileData?.fullname}</p>
              <span>
                {myTweets.length > 1
                  ? myTweets.length + " tweets"
                  : myTweets.length + " tweet"}
              </span>
            </div>
          </div>
          {/* Profile content */}
          <div
            className={` ${
              ((showMedia || showProfile) && "lock_ground") + " profile_content"
            } `}
          >
            <div className="profile_media">
              <div onClick={showImage} className="user_cover">
                <img src="/cover.jpg" alt="cover" />
              </div>
              <div className="user_profile_edit_btn">
                <div className="user_profile">
                  <img
                    onClick={setShowProfilePic}
                    src="/pfp.png"
                    alt="profile"
                  />
                </div>
                <div className="edit_btn">
                  {parseInt(profileData?._id) === parseInt(userData?._id) ? (
                    <button>Edit Profile</button>
                  ) : (
                    <button>Follow</button>
                  )}
                </div>
              </div>
            </div>
            {/* name username */}
            <div className="profile_data">
              <div className="name_username">
                <p>{profileData?.fullname}</p>
                <span>@{profileData?.username}</span>
              </div>

              <div className="profile_bio">
                <p>{profileData?.bio}</p>
              </div>

              <div className="other_info">
                <div className="other_information location">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z"></path>
                    </g>
                  </svg>
                  <p>Earth</p>
                </div>

                <div className="other_information website">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M18.36 5.64c-1.95-1.96-5.11-1.96-7.07 0L9.88 7.05 8.46 5.64l1.42-1.42c2.73-2.73 7.16-2.73 9.9 0 2.73 2.74 2.73 7.17 0 9.9l-1.42 1.42-1.41-1.42 1.41-1.41c1.96-1.96 1.96-5.12 0-7.07zm-2.12 3.53l-7.07 7.07-1.41-1.41 7.07-7.07 1.41 1.41zm-12.02.71l1.42-1.42 1.41 1.42-1.41 1.41c-1.96 1.96-1.96 5.12 0 7.07 1.95 1.96 5.11 1.96 7.07 0l1.41-1.41 1.42 1.41-1.42 1.42c-2.73 2.73-7.16 2.73-9.9 0-2.73-2.74-2.73-7.17 0-9.9z"></path>
                    </g>
                  </svg>
                  <p
                    id="link"
                    onClick={() => window.open(`${userData.website}`, "_blank")}
                  >
                    nirajchaurasiya.com
                  </p>
                </div>

                <div className="other_information dob_user">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M8 10c0-2.21 1.79-4 4-4v2c-1.1 0-2 .9-2 2H8zm12 1c0 4.27-2.69 8.01-6.44 8.83L15 22H9l1.45-2.17C6.7 19.01 4 15.27 4 11c0-4.84 3.46-9 8-9s8 4.16 8 9zm-8 7c3.19 0 6-3 6-7s-2.81-7-6-7-6 3-6 7 2.81 7 6 7z"></path>
                    </g>
                  </svg>
                  <p>Born April 22, 2004</p>
                </div>

                <div className="other_information joined_date">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z"></path>
                    </g>
                  </svg>
                  <p>Joined August 2023</p>
                </div>
              </div>

              <div className="follower_following_details">
                <NavLink
                  to={`/p/${userData.username}/following`}
                  className="userFollowing"
                >
                  <p>{userData.following.length}</p>
                  <span>Following</span>
                </NavLink>
                <NavLink
                  to={`/p/${userData.username}/followers`}
                  className="userfolllowers"
                >
                  <p>{userData.followers.length}</p>
                  <span>Followers</span>
                </NavLink>
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
                <Link to={`/p/${userData.username}`}>
                  <button>Posts</button>
                </Link>
              </div>
              <div
                className={`tab_btn ${
                  with_replies ? "active_tabs" : ""
                } replies_tab`}
              >
                <Link to={`/p/${userData.username}/with_replies`}>
                  <button>Replies</button>
                </Link>
              </div>
              <div
                className={`tab_btn ${
                  highlights ? "active_tabs" : ""
                } highlights_tab`}
              >
                <Link to={`/p/${userData.username}/highlights`}>
                  <button>Highlights</button>
                </Link>
              </div>
              <div
                className={`tab_btn ${media ? "active_tabs" : ""} media_tab`}
              >
                <Link to={`/p/${userData.username}/media`}>
                  <button>Media</button>
                </Link>
              </div>
              <div
                className={`tab_btn ${likes ? "active_tabs" : ""} likes_tab`}
              >
                <Link to={`/p/${userData.username}/likes`}>
                  <button>Likes</button>
                </Link>
              </div>
            </div>

            {with_replies && "with_replies"}
            {highlights && "highlights"}
            {media && "media"}
            {likes && "likes"}
            {!(with_replies || highlights || media || likes) && (
              <Foryou scrollbarhide={true} myAllTweets={true} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
