import React, { useState, useEffect, createRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./tweets.css";
import Foryou from "./Foryou/Foryou";
import Following from "./Following/Following";
import Followers from "./Followers/Followers";
const menu = [
  {
    title: "Profile",
    svg: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <g>
          <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path>
        </g>
      </svg>
    ),
  },
  {
    title: "Bookmark",
    svg: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <g>
          <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path>
        </g>
      </svg>
    ),
  },
];
const DeactiveDownArrow = () => {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="white">
      <g>
        <path d="M3.543 8.96l1.414-1.42L12 14.59l7.043-7.05 1.414 1.42L12 17.41 3.543 8.96z"></path>
      </g>
    </svg>
  );
};
const ActiveDownArrow = () => {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="orange">
      <g>
        <path d="M3.543 8.96l1.414-1.42L12 14.59l7.043-7.05 1.414 1.42L12 17.41 3.543 8.96z"></path>
      </g>
    </svg>
  );
};
export default function TweetFields({ socket }) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [creatorAcc, setCreatorAcc] = useState(false);
  const [settingsShow, setSettingsShow] = useState(false);
  const [supportsShow, setSupportsShow] = useState(false);
  const [docsShow, setDocsShow] = useState(false);
  let activeTab = searchParams.get("type");

  // Default to "for-you" if activeTab is not set
  if (!activeTab) {
    activeTab = "for-you";
  }

  const [isActive1, setIsActive1] = useState(activeTab === "for-you");
  const [isActive2, setIsActive2] = useState(activeTab === "following");
  const [active3, setActive3] = useState(activeTab === "followers");

  const handleTabClick = (tabType) => {
    setIsActive1(tabType === "for-you");
    setIsActive2(tabType === "following");
    setActive3(tabType === "followers");
    setSearchParams({ type: tabType });
  };

  useEffect(() => {
    if (!activeTab) {
      setSearchParams({ type: "for-you" });
    }
  }, [activeTab, setSearchParams]);

  return (
    <>
      <div className="margin_bottom_200px">
        <div className="profile_top_flex">
          <h3 className="home_btn">Home</h3>
          <div className="profile_image">
            <img
              src="/pfp.png"
              alt=""
              onClick={() => {
                setShowMenu(!showMenu);
              }}
            />
          </div>
        </div>
        <div className="two_tab">
          <div
            className={`for_you ${isActive1 ? "active1" : ""}`}
            onClick={() => handleTabClick("for-you")}
          >
            <p>For you</p>
          </div>
          <div
            className={`following_tab ${isActive2 ? "active1" : ""}`}
            onClick={() => handleTabClick("following")}
          >
            <p>Following</p>
          </div>
          <div
            className={`following_tab ${active3 ? "active1" : ""}`}
            onClick={() => handleTabClick("followers")}
          >
            <p>Followers</p>
          </div>
        </div>

        {isActive1 && <Foryou socket={socket} />}
        {isActive2 && <Following socket={socket} />}
        {active3 && <Followers socket={socket} />}
      </div>

      <div
        className={`mobile_menu_container ${
          showMenu ? "showMenu" : "hideMenu"
        } `}
      >
        <div className="mobile_menu_mid_container">
          {/* Profile sidebar content */}
          <div className="profile_menu_top_container">
            <div className="mobile_menu_profile_three_line">
              <div className="mobile_menu_profile">
                <img src="/pfp.png" alt="" />
              </div>
              <div className="mobile_menu_three_line">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                  </g>
                </svg>
              </div>
            </div>
            <div className="mobile_menu_name_username">
              <p>Niraj Chaurasiya</p>
              <span>@loveforrobotics</span>
            </div>
            <div className="follower_following">
              <div className="following_link">
                <p>
                  2 <span>Following</span>
                </p>
              </div>
              <div className="follower_link">
                <p>
                  1 <span>Followers</span>
                </p>
              </div>
            </div>
          </div>
          <div className="mobile_menu_options">
            {menu.map((e, index) => (
              <div className="mobile_menu_option">
                <div key={index} className="mobile_menu_option_svg">
                  {e.svg}
                </div>
                <div className="mobile_menu_option_title">
                  <p>{e.title}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mobile_menu_options_border"></div>
          <div className="mobile_menu_other_settings">
            {/*  */}
            <div
              className="mobile_menu_other_setting"
              onClick={() => {
                setCreatorAcc(!creatorAcc);
              }}
            >
              <p>Creator Studio</p>
              <span>
                {!creatorAcc ? <DeactiveDownArrow /> : <ActiveDownArrow />}
              </span>
            </div>
            {creatorAcc && (
              <div className="mobile_menu_other_setting_inner">
                <span>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"></path>
                    </g>
                  </svg>
                </span>
                <p>Analytics</p>
              </div>
            )}
            {/*  */}
            <div
              className="mobile_menu_other_setting"
              onClick={() => {
                setSettingsShow(!settingsShow);
              }}
            >
              <p>Settings</p>
              <span>
                {!settingsShow ? <DeactiveDownArrow /> : <ActiveDownArrow />}
              </span>
            </div>
            {settingsShow && (
              <div className="mobile_menu_other_setting_inner">
                <span>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M10.54 1.75h2.92l1.57 2.36c.11.17.32.25.53.21l2.53-.59 2.17 2.17-.58 2.54c-.05.2.04.41.21.53l2.36 1.57v2.92l-2.36 1.57c-.17.12-.26.33-.21.53l.58 2.54-2.17 2.17-2.53-.59c-.21-.04-.42.04-.53.21l-1.57 2.36h-2.92l-1.58-2.36c-.11-.17-.32-.25-.52-.21l-2.54.59-2.17-2.17.58-2.54c.05-.2-.03-.41-.21-.53l-2.35-1.57v-2.92L4.1 8.97c.18-.12.26-.33.21-.53L3.73 5.9 5.9 3.73l2.54.59c.2.04.41-.04.52-.21l1.58-2.36zm1.07 2l-.98 1.47C10.05 6.08 9 6.5 7.99 6.27l-1.46-.34-.6.6.33 1.46c.24 1.01-.18 2.07-1.05 2.64l-1.46.98v.78l1.46.98c.87.57 1.29 1.63 1.05 2.64l-.33 1.46.6.6 1.46-.34c1.01-.23 2.06.19 2.64 1.05l.98 1.47h.78l.97-1.47c.58-.86 1.63-1.28 2.65-1.05l1.45.34.61-.6-.34-1.46c-.23-1.01.18-2.07 1.05-2.64l1.47-.98v-.78l-1.47-.98c-.87-.57-1.28-1.63-1.05-2.64l.34-1.46-.61-.6-1.45.34c-1.02.23-2.07-.19-2.65-1.05l-.97-1.47h-.78zM12 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5c.82 0 1.5-.67 1.5-1.5s-.68-1.5-1.5-1.5zM8.5 12c0-1.93 1.56-3.5 3.5-3.5 1.93 0 3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5c-1.94 0-3.5-1.57-3.5-3.5z"></path>
                    </g>
                  </svg>
                </span>
                <p>Settings</p>
              </div>
            )}
            {/*  */}
            <div
              className="mobile_menu_other_setting"
              onClick={() => {
                setSupportsShow(!supportsShow);
              }}
            >
              <p>Supports</p>
              <span>
                {!supportsShow ? <DeactiveDownArrow /> : <ActiveDownArrow />}
              </span>
            </div>
            {supportsShow && (
              <div className="mobile_menu_other_setting_inner">
                <span>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M11.57 11.96l.99-.79c.33-.26.56-.53.7-.8.15-.27.22-.57.22-.91 0-.41-.12-.74-.38-.97s-.62-.35-1.09-.35-.85.12-1.13.37c-.26.25-.4.59-.4 1.03 0 .2.03.42.08.65l-2.07-.15c-.06-.29-.09-.55-.09-.79 0-.84.33-1.51.98-2.01.67-.49 1.55-.74 2.66-.74 1.17 0 2.07.24 2.71.73.63.48.95 1.16.95 2.04 0 .98-.47 1.86-1.4 2.65l-.87.73c-.17.15-.29.28-.36.4-.06.11-.09.26-.09.45v.46h-2.1v-.67c0-.3.06-.55.17-.75.12-.2.29-.39.52-.58zm-.52 5.17c.24.25.56.37.93.37.39 0 .7-.12.94-.37.25-.25.37-.56.37-.94 0-.39-.12-.7-.37-.95-.24-.25-.55-.37-.94-.37-.37 0-.69.12-.93.37s-.36.56-.36.95c0 .38.12.69.36.94zM22.25 12c0 5.66-4.59 10.25-10.25 10.25S1.75 17.66 1.75 12 6.34 1.75 12 1.75 22.25 6.34 22.25 12zM12 20.25c4.56 0 8.25-3.69 8.25-8.25S16.56 3.75 12 3.75 3.75 7.44 3.75 12s3.69 8.25 8.25 8.25z"></path>
                    </g>
                  </svg>
                </span>
                <p>Help center</p>
              </div>
            )}
            {/*  */}
            {/*  */}
            <div
              className="mobile_menu_other_setting"
              onClick={() => {
                setDocsShow(!docsShow);
              }}
            >
              <p>Docs</p>
              <span>
                {!docsShow ? <DeactiveDownArrow /> : <ActiveDownArrow />}
              </span>
            </div>
            {docsShow && (
              <div className="mobile_menu_other_setting_inner">
                <span>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M11.57 11.96l.99-.79c.33-.26.56-.53.7-.8.15-.27.22-.57.22-.91 0-.41-.12-.74-.38-.97s-.62-.35-1.09-.35-.85.12-1.13.37c-.26.25-.4.59-.4 1.03 0 .2.03.42.08.65l-2.07-.15c-.06-.29-.09-.55-.09-.79 0-.84.33-1.51.98-2.01.67-.49 1.55-.74 2.66-.74 1.17 0 2.07.24 2.71.73.63.48.95 1.16.95 2.04 0 .98-.47 1.86-1.4 2.65l-.87.73c-.17.15-.29.28-.36.4-.06.11-.09.26-.09.45v.46h-2.1v-.67c0-.3.06-.55.17-.75.12-.2.29-.39.52-.58zm-.52 5.17c.24.25.56.37.93.37.39 0 .7-.12.94-.37.25-.25.37-.56.37-.94 0-.39-.12-.7-.37-.95-.24-.25-.55-.37-.94-.37-.37 0-.69.12-.93.37s-.36.56-.36.95c0 .38.12.69.36.94zM22.25 12c0 5.66-4.59 10.25-10.25 10.25S1.75 17.66 1.75 12 6.34 1.75 12 1.75 22.25 6.34 22.25 12zM12 20.25c4.56 0 8.25-3.69 8.25-8.25S16.56 3.75 12 3.75 3.75 7.44 3.75 12s3.69 8.25 8.25 8.25z"></path>
                    </g>
                  </svg>
                </span>
                <p>Docs xclone</p>
              </div>
            )}
            {/*  */}
            <div className="mobile_menu_options_border"></div>
            <div className="mobile_menu_other_setting">
              <p>Logout</p>
              <span>
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="white">
                  <g>
                    <path d="M4 4.5C4 3.12 5.12 2 6.5 2h11C18.88 2 20 3.12 20 4.5v15c0 1.38-1.12 2.5-2.5 2.5h-11C5.12 22 4 20.88 4 19.5V16h2v3.5c0 .28.22.5.5.5h11c.28 0 .5-.22.5-.5v-15c0-.28-.22-.5-.5-.5h-11c-.28 0-.5.22-.5.5V8H4V4.5zm6.95 3.04L15.42 12l-4.47 4.46-1.41-1.42L11.58 13H2v-2h9.58L9.54 8.96l1.41-1.42z"></path>
                  </g>
                </svg>
              </span>
            </div>
          </div>
        </div>
        {/* Other settings */}

        {showMenu && (
          <div
            className="mobile_menu_width_25"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          ></div>
        )}
      </div>
    </>
  );
}
