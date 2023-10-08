import React from "react";
import "./rightbar.css";
import TrendingComponent from "../TrendingComponent/TrendingComponent";
import SearchInput from "../SearchInput/SearchInput";
import PremiumBox from "../PremiumBox/PremiumBox";
import SuggestionFriends from "../SuggestionFriends/SuggestionFriends";
export default function Rightbar() {
  return (
    <div className="rightbar_container">
      <div className="rightbar_content">
        <SearchInput />
        <PremiumBox />
        <TrendingComponent />
        <SuggestionFriends />
      </div>
    </div>
  );
}
