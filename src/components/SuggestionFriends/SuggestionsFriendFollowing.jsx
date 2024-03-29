import React, { useContext, useEffect, useState } from "react";
import "./SuggestionFriends.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
export default function SuggestionsFriendFollowing() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [, , , , userData, , , , , , , , , , ,] = useContext(AuthContext);
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  // eslint-disable-next-line
  const [allPeople, setAllPeople] = useState([]);
  const [, setLoader] = useState(true);

  useEffect(() => {
    async function getRelevantPeople() {
      setLoader(true);
      try {
        await axios
          .get(
            `${backendURL}/peopleaction/getFollowingFromUserId/${userData?._id}`
          )
          .then((data) => {
            if (data.data.status === 1) {
              return setAllPeople(data.data.following);
            }
          })
          .then(() => {
            setLoader(false);
          })
          .catch((err) => {});
      } catch (error) {}
    }
    getRelevantPeople();
  }, [username, backendURL, userData?._id, userData?.following?.length]);
  return (
    <div className="friend_suggestion_container">
      <div className="friend_suggestion_mid_container">
        <p className="whotofollow">Following People</p>
        {allPeople?.length > 0 ? (
          allPeople.slice(0, 5)?.map((e) => (
            <div
              key={e?._id}
              className="friend_suggestion_card"
              onClick={() => navigate(`/p/${e?.username}`)}
            >
              <div className="friend_suggestion_image">
                <img src={`${e?.profilepicture}`} alt="" />
                <div className="friend_suggestion_credentials">
                  <p>{e?.fullname}</p>
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
        {allPeople?.length > 0 && (
          <div
            onClick={() => {
              navigate(`/p/${userData?.username}/following`);
            }}
            className="show_more_friend"
          >
            <p>Show more</p>
          </div>
        )}
      </div>
    </div>
  );
}
