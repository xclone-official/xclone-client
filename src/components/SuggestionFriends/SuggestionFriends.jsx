import React, { useContext, useEffect, useState } from "react";
import "./SuggestionFriends.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
export default function SuggestionFriends() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [, , , , userData, , , , , , , , , , ,] = useContext(AuthContext);
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [allPeople, setAllPeople] = useState([]);
  const [, setLoader] = useState(true);

  useEffect(() => {
    async function getRelevantPeople() {
      setLoader(true);
      try {
        await axios
          .get(
            `${backendURL}/relevantpeople/${
              username ? username : userData?._id
            }`
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
          .catch((err) => {});
      } catch (error) {
        alert("Some error occured");
      }
    }
    getRelevantPeople();
  }, [username, backendURL, userData?._id]);
  return (
    <div className="friend_suggestion_container">
      <div className="friend_suggestion_mid_container">
        <p className="whotofollow">Your Followers</p>
        {userData?.following?.length > 0 ? (
          userData?.following?.map((e) => (
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
        {userData?.following?.length > 0 && (
          <div className="show_more_friend">
            <p>Show more</p>
          </div>
        )}
      </div>
    </div>
  );
}
