import "./Messages.css";
import React from "react";
import SearchInput from "../SearchInput/SearchInput";
import MessageComponent from "./MessageComponent";
export default function Lists() {
  React.useEffect(() => {
    document.title = "X / Messages";
  }, []);
  return (
    <div>
      <div className="profile_top" style={{ padding: "9.9px" }}>
        <div
          className="top_tweetname"
          style={{ display: "flex", alignItems: "center" }}
        >
          <p>All Messages</p>
        </div>
      </div>
      <div className="msg_search_input">
        <SearchInput message={true} />
      </div>
      <div className="messages_container">
        <div className="messages_mid_container">
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 11, 14, 13, 15, 16, 17, 18, 19, 20,
          ].map((e) => (
            <MessageComponent key={e} />
          ))}
        </div>
      </div>
    </div>
  );
}
