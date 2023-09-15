import React, { useContext, useEffect, useState } from "react";
import "./rightbar.css";
import TrendingComponent from "../TrendingComponent/TrendingComponent";
import SearchInput from "../SearchInput/SearchInput";
import PremiumBox from "../PremiumBox/PremiumBox";
import InfoLoader from "../Loader/InfoLoader";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
export default function Rightbar() {
  const [, , , , , , , , , , infoLoader, ,] = useContext(AuthContext);
  return (
    <div className="rightbar_container">
      <div className="rightbar_content">
        <SearchInput />
        <PremiumBox />
        {infoLoader ? <InfoLoader /> : <TrendingComponent />}
      </div>
    </div>
  );
}
