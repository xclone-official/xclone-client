import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./tweets.css";
import Foryou from "./Foryou/Foryou";
import Following from "./Following/Following";
import Followers from "./Followers/Followers";

export default function TweetFields({ socket }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  let activeTab = searchParams.get("type");

  // Default to "for-you" if activeTab is not set
  if (!activeTab) {
    activeTab = "for-you";
  }

  const [isActive1, setIsActive1] = useState(activeTab === "for-you");
  const [isActive2, setIsActive2] = useState(activeTab === "following");
  const [active3, setActive3] = useState(activeTab === "followers");

  const handleTabClick = (tabType) => {
    setIsActive1(tabType === "for-you");
    setIsActive2(tabType === "following");
    setActive3(tabType === "followers");
    setSearchParams({ type: tabType });
  };

  useEffect(() => {
    if (!activeTab) {
      setSearchParams({ type: "for-you" });
    }
  }, [activeTab, setSearchParams]);

  return (
    <div className="margin_bottom_200px">
      <div className="profile_top_flex">
        <h3 className="home_btn">Home</h3>
        <div className="profile_image">
          <img src="/pfp.png" alt="" />
        </div>
      </div>
      <div className="two_tab">
        <div
          className={`for_you ${isActive1 ? "active1" : ""}`}
          onClick={() => handleTabClick("for-you")}
        >
          <p>For you</p>
        </div>
        <div
          className={`following_tab ${isActive2 ? "active1" : ""}`}
          onClick={() => handleTabClick("following")}
        >
          <p>Following</p>
        </div>
        <div
          className={`following_tab ${active3 ? "active1" : ""}`}
          onClick={() => handleTabClick("followers")}
        >
          <p>Followers</p>
        </div>
      </div>

      {isActive1 && <Foryou socket={socket} />}
      {isActive2 && <Following socket={socket} />}
      {active3 && <Followers socket={socket} />}
    </div>
  );
}
