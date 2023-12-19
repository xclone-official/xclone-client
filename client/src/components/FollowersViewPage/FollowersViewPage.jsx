import React, { useEffect, useState } from "react";
import "./followerviewpage.css";
import axios from "axios";
import FollowersFollowingCard from "../FollowersFollowingCard/FollowersFollowingCard";
import { useParams } from "react-router-dom";
import PeopleSkeleton from "../PeopleSkeleton/PeopleSkeleton";
export default function FollowersViewPage() {
  const [allFollowers, setallFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    setLoading(true);
    async function fetchAllFollowers() {
      try {
        const allFollowers = await axios.get(
          `${backendURL}/getPeople/getFollowersFromUserId/${username}`
        );
        if (allFollowers.data.status === 1) {
          setallFollowers(allFollowers.data.followers);
          setLoading(false);
        }
      } catch (error) {
        setLoading(true);
      }
    }
    fetchAllFollowers();
    // eslint-disable-next-line
  }, [username]);
  return (
    <div className="follower_following_card_container">
      {loading ? (
        <PeopleSkeleton />
      ) : (
        <div className="follower_following_card_midContainer">
          {allFollowers?.length > 0 ? (
            allFollowers?.map((e) => (
              <FollowersFollowingCard key={e} data={e} />
            ))
          ) : (
            <div className="msg_following">
              <div>
                <p>When someone follows this account</p> <p>It appears here.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
