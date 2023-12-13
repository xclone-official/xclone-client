import React, { useEffect, useState } from "react";
import "./explore.css";
import TopComponent from "../TopComponent/TopComponent";
import SearchComponent from "../SearchComponent/SearchComponent";
import TrendingComponent from "../TrendingComponent/TrendingComponent";
export default function Explore() {
  const [searchQuery, setSearchQuery] = useState();
  useEffect(() => {
    document.title = "Xclone / Explore";
  }, []);
  return (
    <div className="explore_container">
      <TopComponent title="Explore" />
      <div style={{ padding: "5px" }}>
        <div className="right_searchbar">
          <input
            type="text"
            placeholder="Search X"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="border_bottom"></div>
      <div className="explore_page_search_element">
        <div className="search_term_container">
          <SearchComponent searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
}
