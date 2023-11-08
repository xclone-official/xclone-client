import React from "react";
import "./youracc.css";
import { Link, useNavigate } from "react-router-dom";
const options = [
  {
    title: "Account Information",
    link: "/account/settings/account_info",
    desc: "See your account information like your phone number and email address.",
    svg: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <g>
          <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path>
        </g>
      </svg>
    ),
  },
  {
    title: "Change password",
    link: "/account/settings/change-password",
    desc: "Change your password at any time.",
    svg: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <g>
          <path d="M13 9.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zm9.14 1.77l-5.83 5.84-4-1L6.41 22H2v-4.41l5.89-5.9-1-4 5.84-5.83 7.06 2.35 2.35 7.06zm-12.03 1.04L4 18.41V20h1.59l6.1-6.11 4 1 4.17-4.16-1.65-4.94-4.94-1.65-4.16 4.17 1 4z"></path>
        </g>
      </svg>
    ),
  },
  {
    title: "Deactivate Account",
    link: "/account/settings/deactivate-account",
    desc: "Find out how you can deactivate your account.",
    svg: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <g>
          <path d="M21.398 6.52c-.887-1.79-2.647-2.91-4.601-3.01-1.65-.09-3.367.56-4.796 2.01-1.43-1.45-3.147-2.1-4.798-2.01-1.954.1-3.714 1.22-4.601 3.01-.896 1.81-.846 4.17.514 6.67 1.353 2.48 4.003 5.12 8.382 7.67l.504.3.503-.3c4.378-2.55 7.028-5.19 8.379-7.67 1.36-2.5 1.41-4.86.514-6.67zm-2.27 5.71c-1.074 1.97-3.256 4.27-7.126 6.61-3.872-2.34-6.055-4.64-7.129-6.61-1.112-2.04-1.031-3.7-.479-4.82.561-1.13 1.667-1.84 2.91-1.91 1.077-.05 2.338.38 3.452 1.61L8.588 10.3l4.009 2.5-1.428 2.15 1.665 1.1 2.569-3.85-3.991-2.5 1.405-2.06c1.21-1.63 2.662-2.2 3.88-2.14 1.242.07 2.347.78 2.908 1.91.553 1.12.634 2.78-.477 4.82z"></path>
        </g>
      </svg>
    ),
  },
];

export default function YourAccount() {
  const navigate = useNavigate();
  const goBackToPreviousPage = () => {
    navigate(-1);
  };
  return (
    <div className="Your_acc_container">
      <div className="your_acc_mid_container">
        <div className="profile_top">
          <svg
            onClick={goBackToPreviousPage}
            fill="var(--theme-color)"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <g>
              <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
            </g>
          </svg>
          <div
            className="top_tweetname"
            style={{ display: "flex", alignItems: "center" }}
          >
            <p>Your Account</p>
          </div>
        </div>
        <div className="your_acc_descrription">
          <p>
            See information about your account, download an archive of your
            data, or learn about your account deactivation options
          </p>
        </div>
        <div className="settings_midcontainer">
          <br />
          {options.map((e, index) => (
            <Link to={e.link} key={index}>
              <div className="setting_card" style={{ padding: "18px" }}>
                <div style={{ display: "flex", gap: "25px" }}>
                  {e.svg}
                  <div>
                    <p className="setting_title_name">{e.title}</p>
                    <span className="your_acc_descrriptionn">{e.desc}</span>
                  </div>
                </div>
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
    </div>
  );
}
