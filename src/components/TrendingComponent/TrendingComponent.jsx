import axios from "axios";
import React, { useEffect } from "react";
export default function TrendingComponent() {
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  return (
    <div className="trends_rightbar">
      <h1 className="head_rightbar" style={{ paddingTop: "15px" }}>
        Trends for you
      </h1>
      <div className="trending_content">
        <div className="trending_name">
          <p className="trending_category">This page is in development.</p>
          {/* <p className="trending_topic">{e.trending_topic}</p>
            <p className="tweets_num">{e.tweets_count}</p> */}
        </div>
        <div className="more_options">
          {/* <svg viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path
                fill="var(--theme-color)"
                d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
              ></path>
            </g>
          </svg> */}
        </div>
      </div>
    </div>
  );
}
