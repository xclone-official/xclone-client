import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthContextProvider from "./useContext/AuthContext/AuthContext";
import TweetContextProvider from "./useContext/TweetContext/TweetContext";
import SpecificTweetProvider from "./useContext/SpecificTweet/SpecificTweet";
import LikedContextProvider from "./useContext/LikedContext/LikedContext";
import NotificationContextProvider from "./useContext/NotificationsContext/NotificationsContext";
import MessageContextProvider from "./useContext/MessageContext/MessageContext";
import FollowersTweetContextProvider from "./useContext/FollowersTweetContext/FollowersTweetContext";
import AllTweetContextProvider from "./useContext/AllTweetContext/AllTweetContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NotificationContextProvider>
      <AllTweetContextProvider>
        <AuthContextProvider>
          <LikedContextProvider>
            <SpecificTweetProvider>
              <FollowersTweetContextProvider>
                <TweetContextProvider>
                  <MessageContextProvider>
                    <App />
                  </MessageContextProvider>
                </TweetContextProvider>
              </FollowersTweetContextProvider>
            </SpecificTweetProvider>
          </LikedContextProvider>
        </AuthContextProvider>
      </AllTweetContextProvider>
    </NotificationContextProvider>
  </React.StrictMode>
);
