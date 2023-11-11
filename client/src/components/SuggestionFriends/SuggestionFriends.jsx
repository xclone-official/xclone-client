import React, { useContext, useEffect, useState } from "react";
import "./SuggestionFriends.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
export default function SuggestionFriends() {
  const navigate = useNavigate();
  const { username } = useParams();
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
  const [allPeople, setAllPeople] = useState([]);
  const [loader, setLoader] = useState(true);
  async function getRelevantPeople() {
    setLoader(true);
    try {
      await axios
        .get(
          `${backendURL}/relevantpeople/${username ? username : userData?._id}`
        )
        .then((data) => {
          if (data.data.status === 1) {
            return setAllPeople(data.data.tweets);
          }
          return;
        })
        .then(() => {
          setLoader(false);
        })
        .catch((err) => {
          console.log("first", err);
        });
    } catch (error) {
      alert("Some error occured");
    }
  }
  useEffect(() => {
    getRelevantPeople();
  }, [username]);
  return (
    <div className="friend_suggestion_container">
      <div className="friend_suggestion_mid_container">
        <p className="whotofollow">Relevant people</p>
        {allPeople.length > 0 ? (
          allPeople?.map((e) => (
            <div
              key={e?._id}
              className="friend_suggestion_card"
              onClick={() => navigate(`/p/${e?.username}`)}
            >
              <div className="friend_suggestion_image">
                <img src={backendURL + `/${e?.profile}`} alt="" />
                <div className="friend_suggestion_credentials">
                  <p>{e?.name}</p>
                  <p className="friend_suggestion_username">@{e?.username}</p>
                </div>
              </div>

              <div className="friend_suggestion_follow_btn">
                <button>View</button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: "0 10px 15px 10px" }}>
            <div>Can't find user at the moment.</div>
          </div>
        )}
        {allPeople.length > 0 && (
          <div className="show_more_friend">
            <p>Show more</p>
          </div>
        )}
      </div>
    </div>
  );
}
