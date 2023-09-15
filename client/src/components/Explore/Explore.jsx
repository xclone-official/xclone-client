import React, { useEffect } from "react";
import "./explore.css";
import SearchInput from "../SearchInput/SearchInput";
import TrendingComponent from "../TrendingComponent/TrendingComponent";
import PremiumBox from "../PremiumBox/PremiumBox";
export default function Explore() {
  useEffect(() => {
    document.title = "X / Explore";
  }, []);
  return (
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
  );
}
