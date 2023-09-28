import React, { useEffect, useState } from "react";
import "./tweets.css";
import Foryou from "./Foryou/Foryou";
import Following from "./Following/Following";
export default function TweetFields({ socket }) {
  const [isActive1, setIsActive1] = useState(true);
  const [isActive2, setIsActive2] = useState(false);
  return (
    <div className="margin_bottom_200px">
      <h3 className="home_btn">Home</h3>
      <div className="two_tab">
        <div
          className={`for_you ${isActive1 ? "active1" : ""}`}
          onClick={() => {
            setIsActive1(true);
            setIsActive2(false);
          }}
        >
          <p>For you</p>
        </div>
        <div
          className={`following_tab ${isActive2 ? "active1" : ""}`}
          onClick={() => {
            setIsActive2(true);
            setIsActive1(false);
          }}
        >
          <p>Following</p>
        </div>
      </div>

      {isActive1 && <Foryou socket={socket} />}
      {isActive2 && <Following socket={socket} />}
    </div>
  );
}
