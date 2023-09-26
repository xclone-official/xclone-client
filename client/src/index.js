import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthContextProvider from "./useContext/AuthContext/AuthContext";
import TweetContextProvider from "./useContext/TweetContext/TweetContext";
import { SpecificTweetProvider } from "./useContext/SpecificTweet/SpecificTweetProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TweetContextProvider>
        <SpecificTweetProvider>

        <App />
        </SpecificTweetProvider>
      </TweetContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
