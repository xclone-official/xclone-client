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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NotificationContextProvider>
      <AuthContextProvider>
        <LikedContextProvider>
          <SpecificTweetProvider>
            <TweetContextProvider>
              <MessageContextProvider>
                <App />
              </MessageContextProvider>
            </TweetContextProvider>
          </SpecificTweetProvider>
        </LikedContextProvider>
      </AuthContextProvider>
    </NotificationContextProvider>
  </React.StrictMode>
);
