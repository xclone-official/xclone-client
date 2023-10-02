import React, { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Rightbar from "../Rightbar/Rightbar";
import "./home.css";
import Messages from "../Messages/Messages";

export default function Home({ children, socket }) {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home");
      document.title = "X / Home";
    }
  }, []);

  return (
    <div className="main_content">
      <div className="three_grid">
        <div className="sidebar">
          <div className="column">
            <Sidebar socket={socket} />
          </div>
        </div>
        <div className="tweetfields">
          <div className="column">{children}</div>
        </div>
        <div className="rightbar">
          <div className="column">
            {userId ? (
              <Messages userId={userId} />
            ) : location.pathname === "/messages" ? (
              <Messages />
            ) : (
              <Rightbar />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
