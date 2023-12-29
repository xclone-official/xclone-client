import React from "react";
import "./communities.css";
import { useNavigate } from "react-router-dom";
export default function Lists() {
  const navigate = useNavigate();
  React.useEffect(() => {
    document.title = "Xclone / Communities";
  }, []);
  const goBackToPreviousPage = () => {
    navigate(-1);
  };
  return (
    <div>
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
          <p>Communities</p>
        </div>
      </div>
    </div>
  );
}
