import React, { useContext } from "react";
import "./SuggestionFriends.css";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
import { Link, useNavigate } from "react-router-dom";
export default function SuggestionFriends() {
  const Navigate = useNavigate();
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
    getAllTweets,
    getAllTweetsFromFollowingUsers,
  ] = useContext(AuthContext);
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  return (
    <div className="friend_suggestion_container">
      <div className="friend_suggestion_mid_container">
        <p className="whotofollow">Relevant people</p>
        {userData?.followers.length > 0 ? (
          userData?.followers?.map((e) => (
            <div key={e?._id} className="friend_suggestion_card">
              <Link to={`/p/${e?.username}`}>
                <div className="friend_suggestion_image">
                  <img src={backendURL + `/${e?.profile}`} alt="" />
                  <div className="friend_suggestion_credentials">
                    <p>{e?.name}</p>
                    <p className="friend_suggestion_username">@{e?.username}</p>
                  </div>
                </div>
              </Link>

              <div className="friend_suggestion_follow_btn">
                <button onClick={() => Navigate(`/p/${e?.username}`)}>
                  View
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>
            <div></div>
          </div>
        )}
        {userData?.followers.length > 0 && (
          <div className="show_more_friend">
            <p>Show more</p>
          </div>
        )}
      </div>
    </div>
  );
}
