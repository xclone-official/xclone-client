import React, { useEffect } from "react";
import "./Settings.css";
import { Link, useLocation } from "react-router-dom";
const options = [
  {
    title: "Your account",
    link: "/account/settings",
  },
  {
    title: "Change password",
    link: "/account/settings/change-password",
  },
  {
    title: "Tweet privacy",
    link: "/account/settings/tweet-privacy",
  },
];
export default function Settings() {
  useEffect(() => {
    document.title = `Settings / Xclone`;
  }, []);
  const location = useLocation();
  return (
    <div className="settings_container">
      <p className="settings">Settings</p>
      <div className="settings_midcontainer">
        {options.map((e, index) => (
          <Link to={e.link} key={index}>
            <div
              className={`setting_card ${
                location.pathname === e.link ? "setting_card_active" : ""
              }`}
            >
              <p className="setting_title_name">{e.title}</p>
              <p className="setting_title_svg">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path
                      fill="white"
                      d="M14.586 12L7.543 4.96l1.414-1.42L17.414 12l-8.457 8.46-1.414-1.42L14.586 12z"
                    ></path>
                  </g>
                </svg>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
