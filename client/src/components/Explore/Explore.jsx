import React, { useEffect } from "react";
import "./explore.css";
import SearchInput from "../SearchInput/SearchInput";
import TrendingComponent from "../TrendingComponent/TrendingComponent";
import PremiumBox from "../PremiumBox/PremiumBox";
import { useNavigate } from "react-router-dom";
export default function Explore() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "X / Explore";
  }, []);
  const goBackToPreviousPage = () => {
    navigate(-1);
  };
  return (
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
        <div
          className="top_tweetname"
          style={{ display: "flex", alignItems: "center" }}
        >
          <p>Explore</p>
        </div>
      </div>
      <div style={{ padding: "5px" }}>
        <SearchInput />
        <div className="explore_component">
          <div className="premium_box">
            <PremiumBox />
          </div>
          <div className="trending_page">
            <TrendingComponent />
          </div>
        </div>
      </div>
    </>
  );
}
