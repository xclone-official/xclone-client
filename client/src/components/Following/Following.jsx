import React, { useContext, useEffect, useState } from "react";
import "./following.css";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
import axios from "axios";
import Loader from "../Loader/InfoLoader";
export default function Following({ following, follower }) {
  const [, , , , userData, , , , allTweets, , , , , ,] =
    useContext(AuthContext);
  const [profileData, setprofileData] = useState([]);
  const navigate = useNavigate();
  const [isloading, setIsloading] = useState(true);
  const [UserExist, SetUserExist] = useState(true);
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const { username } = useParams();
  const goBackToPreviousPage = () => {
    navigate(-1);
  };
  const fetchUser = async () => {
    setIsloading(true);
    try {
      await axios
        .get(`${backendURL}/user/auth/getUser/${username}`)
        .then((data) => {
          if (data.data.status === 1) {
            setprofileData(data.data.data);
            setIsloading(false);
            SetUserExist(true);
          } else {
            SetUserExist(false);
          }
        });
    } catch (error) {
      setIsloading(false); // Set loading to false in case of an error
    }
  };
  useEffect(() => {
    if (username) {
      if (!profileData.length > 0) {
        fetchUser();
      }
    }
  }, [username]);
  if (!UserExist) {
    return (
      <div className="user_doesnt_find">
        <p>
          User doesn't exists.
          <br />
          <span>Maybe the account is deleted.</span>
        </p>
      </div>
    );
  }
  return (
    <div>
      {isloading ? (
        <Loader />
      ) : (
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
                {allTweets?.filter(
                  (e) => parseInt(e?.authorId) === parseInt(profileData?._id)
                ).length > 1
                  ? allTweets.filter(
                      (e) =>
                        parseInt(e?.authorId) === parseInt(profileData?._id)
                    ).length + " tweets"
                  : allTweets.filter(
                      (e) =>
                        parseInt(e?.authorId) === parseInt(profileData?._id)
                    ).length + " tweet"}
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
        </>
      )}
    </div>
  );
}
