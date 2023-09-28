import React, { useContext, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Rightbar from "../Rightbar/Rightbar";
import "./home.css";
import { useLocation, useNavigate } from "react-router-dom";
import { NotificationContext } from "../../useContext/NotificationsContext/NotificationsContext";
export default function Home({ children, socket }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [allNotification, setAllNotification] = useContext(NotificationContext);
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
            <Rightbar />
          </div>
        </div>
      </div>
    </div>
  );
}
