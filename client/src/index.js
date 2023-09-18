import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthContextProvider from "./useContext/AuthContext/AuthContext";
import TweetContextProvider from "./useContext/TweetContext/TweetContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TweetContextProvider>
        <App />
      </TweetContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
