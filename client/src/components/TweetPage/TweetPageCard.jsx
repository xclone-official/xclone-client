import React from "react";
import "./tweetpage.css";
export default function TweetPageCard({ tweetdata }) {
  return (
    <div>
      <div>TweetPageCard</div>
      <div>{tweetdata.authorName}</div>
    </div>
  );
}
