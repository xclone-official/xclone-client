import React, { useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Rightbar from "../Rightbar/Rightbar";
import "./home.css";
import { useLocation, useNavigate } from "react-router-dom";
export default function Home({ children }) {
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
            <Sidebar />
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
