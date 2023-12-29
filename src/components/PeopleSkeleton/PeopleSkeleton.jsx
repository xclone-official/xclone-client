import React from "react";
import "../TweetFields/Foryou/TweetCardSkeleton.css";

const PeopleSkeleton = () => {
  return [1, 2, 3, 4, 5].map((e) => (
    <div key={e} className="border_bottom_skeleton">
      <div className="tweetcard-skeleton">
        <div className="skeleton-user-profile"></div>
        <div className="skeleton-other-content">
          <div className="skeleton-user-details">
            <div className="username_skeleton">
              <div className="skeleton-username"></div>
              <div
                className="skeleton-username"
                style={{ width: "70px" }}
              ></div>
            </div>
            <div className="skeleton-options-icon"></div>
          </div>
          <div
            className="skeleton-tweet-content"
            style={{ width: "90%" }}
          ></div>
          <div
            className="skeleton-tweet-content"
            style={{ width: "50%" }}
          ></div>
        </div>
      </div>
    </div>
  ));
};

export default PeopleSkeleton;
