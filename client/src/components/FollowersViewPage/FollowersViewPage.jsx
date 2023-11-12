import React, { useContext } from "react";
import "./followerviewpage.css";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
import FollowersFollowingCard from "../FollowersFollowingCard/FollowersFollowingCard";
export default function FollowersViewPage() {
  const [, , , , userData, , , , , , , , , , , ,] = useContext(AuthContext);
  console.log(userData?.followers);
  return (
    <div className="follower_following_card_container">
      <div className="follower_following_card_midContainer">
        {userData?.followers?.length > 0 ? (
          userData?.followers?.map((e) => (
            <FollowersFollowingCard key={e} data={e} />
          ))
        ) : (
          <div className="msg_following">
            <div>
              <p>When someone follows you</p> <p>It appears here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
