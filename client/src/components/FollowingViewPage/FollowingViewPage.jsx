import React, { useContext } from "react";
import "./followingviewpage.css";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
import FollowersFollowingCard from "../FollowersFollowingCard/FollowersFollowingCard";
export default function FollowingViewPage() {
  const [, , , , userData, , , , , , , , , , ,] = useContext(AuthContext);
  console.log(userData?.following);
  return (
    <div className="follower_following_card_container">
      <div className="follower_following_card_midContainer">
        {userData?.following?.length > 0 ? (
          userData?.following?.map((e) => (
            <FollowersFollowingCard key={e} data={e} />
          ))
        ) : (
          <div className="msg_following">
            <div>
              <p>When you follow someone</p> <p>It appears here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
