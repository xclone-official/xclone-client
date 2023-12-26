import React, { useEffect, useState } from "react";
import "./followingviewpage.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import FollowersFollowingCard from "../FollowersFollowingCard/FollowersFollowingCard";
export default function FollowingViewPage() {
  const [allFollowing, setAllFollowing] = useState([]);
  const { username } = useParams();
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    async function fetchAllFollowings() {
      const allFollowing = await axios.get(
        `${backendURL}/getPeople/getallfollowings/${username}`
      );
      console.log(allFollowing.data);
      if (allFollowing.data.status === 1) {
        setAllFollowing(allFollowing.data.following);
      }
      try {
      } catch (error) {}
    }
    fetchAllFollowings();
    // eslint-disable-next-line
  }, [username]);
  return (
    <div className="follower_following_card_container">
      <div className="follower_following_card_midContainer">
        {allFollowing?.length > 0 ? (
          allFollowing?.map((e) => <FollowersFollowingCard key={e} data={e} />)
        ) : (
          <div className="msg_following">
            <div>
              <p>When this account follow someone</p> <p>It appears here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
