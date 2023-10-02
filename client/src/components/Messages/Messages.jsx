import "./Messages.css";
import React, { useContext } from "react";
import SearchInput from "../SearchInput/SearchInput";
import MessageComponent from "./MessageComponent";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
export default function Lists() {
  React.useEffect(() => {
    document.title = "X / Messages";
  }, []);
  const [
    showLogin,
    setShowLogin,
    showRegister,
    setShowRegister,
    userData,
    setUserData,
    loading,
    setLoading,
    allTweets,
    setAllTweets,
    infoLoader,
    setInfoLoader,
    followingTweet,
    setFollowingTweet,
    getAllTweets,
    getAllTweetsFromFollowingUsers,
  ] = useContext(AuthContext);
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
          {userData?.userHasChatted?.length > 0 ? (
            userData?.userHasChatted?.map((e) => (
              <MessageComponent key={e._id} e={e} />
            ))
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10vh",
                fontWeight: "600",
              }}
            >
              <p>Search a user to chat</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
