import React, { useContext, useEffect, useState } from "react";
import "./sidebar.css";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BiSolidSearch, BiSolidUser, BiUser } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import {
  AiFillBook,
  AiFillHome,
  AiFillMessage,
  AiFillNotification,
  AiFillSetting,
  AiOutlineBook,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineMessage,
  AiOutlineNotification,
  AiOutlineSearch,
  AiOutlineSetting,
} from "react-icons/ai";
import { NotificationContext } from "../../useContext/NotificationsContext/NotificationsContext";
import Cookies from "js-cookie";

export default function Sidebar({ showMessage }) {
  const [showLogoutBtn, setShowLogoutBtn] = useState(false);
  const location = useLocation();
  const [widthOfScreen, setWidthOfScreen] = useState(window.screen.width);
  const navigate = useNavigate();
  const [, , , , userData, , , , , , , , , , getAllTweets, ,] =
    useContext(AuthContext);
  const [allNotification] = useContext(NotificationContext);

  const Links = [
    {
      name: "Home",
      logo: <AiOutlineHome />,
      activeLogo: <AiFillHome />,
      href: `/home`,
    },
    {
      name: "Explore",
      logo: <AiOutlineSearch />,
      activeLogo: <BiSolidSearch />,
      href: `/explore`,
    },
    {
      name: "Notifications",
      logo: <AiOutlineNotification />,
      activeLogo: <AiFillNotification />,
      href: "/notifications",
      msg: (
        <>
          {allNotification.filter((notification) => !notification.isSeen)
            ?.length > 0 && (
            <p id="new_notifications">
              {
                allNotification.filter((notification) => !notification.isSeen)
                  .length
              }
            </p>
          )}
        </>
      ),
    },
    {
      name: "Messages",
      logo: <AiOutlineMessage />,
      activeLogo: <AiFillMessage />,
      href: "/messages",
    },
    {
      className: "hide_in_phone",
      name: "Bookmarks",
      logo: <AiOutlineBook />,
      activeLogo: <AiFillBook />,
      href: "/bookmarks",
    },
    {
      className: "hide_in_phone",
      name: "Profile",
      activeLogo: <BiSolidUser />,
      href: `/p/${userData.username}`,
      logo: <BiUser />,
    },
    {
      className: "hide_in_phone",
      name: "Setting",
      activeLogo: <AiFillSetting />,
      href: `/settings`,
      logo: <AiOutlineSetting />,
    },
  ];
  const getInputAndFocus = () => {
    navigate("/home/compose/tweet");
  };
  useEffect(() => {
    setWidthOfScreen(window.innerWidth);
    window.addEventListener("resize", () => {
      setWidthOfScreen(window.innerWidth);
    });
  }, [window.innerWidth]);
  return showMessage ? (
    showMessage && widthOfScreen >= 450 && (
      <div className="sidebar_content">
        <div className="sidebar_logo">
          <Link to="/home">
            <img
              onClick={() => {
                getAllTweets();
              }}
              src="/xlogo-removebg-preview.png"
              alt=""
              className="sidebar_logoo"
              style={{
                borderRadius: "30px",
                width: "50px",
                padding: "10px",
                marginLeft: "0px",
                height: "50px",
                cursor: "pointer",
              }}
            />
          </Link>
          <div className="sidebar_links">
            {Links.map((e, index) => {
              return e.href ? (
                <NavLink key={index} to={e.href}>
                  <div className={`sidebar_home ${e.className}`}>
                    {e.msg}
                    <p>
                      {location.pathname.startsWith(e.href)
                        ? e.activeLogo
                        : e.logo}
                    </p>
                    <span className="hide_name_1000px">{e.name}</span>
                  </div>
                </NavLink>
              ) : (
                <div className="sidebar_home hide_in_phone" key={index}>
                  <p>{e.logo}</p>
                  <span className="hide_name_1000px">{e.name}</span>
                </div>
              );
            })}
            <button
              onClick={getInputAndFocus}
              className="hide_name_1000px"
              id="post_btn"
            >
              Post
            </button>
          </div>
          <div
            className="sidebar_logout hide_in_phone"
            onClick={() => {
              setShowLogoutBtn(!showLogoutBtn);
            }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              <div className="pfp_logout_img">
                <img src={`${userData?.profilepicture}`} alt="" />
              </div>
              <div className="username_name hide_name_1000px">
                <p>{userData?.fullname}</p>
                <span>@{userData?.username}</span>
              </div>
            </div>
            <div className="more_icon hide_name_1000px hide_in_phone">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="">
                <g>
                  <path
                    fill="white"
                    d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
          {showLogoutBtn && (
            <div
              className="sidebar_logout showLogout_btn hide_in_phone"
              onClick={() => {
                Cookies.remove("xid");
                window.location.reload();
              }}
            >
              <p className="logout_btn">Logout</p>
              <div className="more_icon hide_name_1000px hide_in_phone">
                <AiOutlineLogout className="logout_icon" />
              </div>
            </div>
          )}
        </div>
      </div>
    )
  ) : (
    <div className="sidebar_content">
      <div className="sidebar_logo">
        <Link to="/home">
          <img
            onClick={() => {
              getAllTweets();
            }}
            src="/xlogo-removebg-preview.png"
            alt=""
            className="sidebar_logoo"
            style={{
              borderRadius: "30px",
              width: "50px",
              padding: "10px",
              marginLeft: "0px",
              height: "50px",
              cursor: "pointer",
            }}
          />
        </Link>
        <div className="sidebar_links">
          {Links.map((e, index) => {
            return e.href ? (
              <NavLink key={index} to={e.href}>
                <div className={`sidebar_home ${e.className}`}>
                  {e.msg}
                  <p>
                    {location.pathname.startsWith(e.href)
                      ? e.activeLogo
                      : e.logo}
                  </p>
                  <span className="hide_name_1000px">{e.name}</span>
                </div>
              </NavLink>
            ) : (
              <div className="sidebar_home hide_in_phone" key={index}>
                <p>{e.logo}</p>
                <span className="hide_name_1000px">{e.name}</span>
              </div>
            );
          })}
          <button
            onClick={getInputAndFocus}
            className="hide_name_1000px"
            id="post_btn"
          >
            Post
          </button>
        </div>
        <div
          className="sidebar_logout hide_in_phone"
          onClick={() => {
            setShowLogoutBtn(!showLogoutBtn);
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            <div className="pfp_logout_img">
              <img src={`${userData?.profilepicture}`} alt="" />
            </div>
            <div className="username_name hide_name_1000px">
              <p>{userData?.fullname}</p>
              <span>@{userData?.username}</span>
            </div>
          </div>
          <div className="more_icon hide_name_1000px hide_in_phone">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="">
              <g>
                <path
                  fill="white"
                  d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
                ></path>
              </g>
            </svg>
          </div>
        </div>
        {showLogoutBtn && (
          <div
            className="sidebar_logout showLogout_btn hide_in_phone"
            onClick={() => {
              Cookies.remove("xid");
              window.location.reload();
            }}
          >
            <p className="logout_btn">Logout</p>
            <div className="more_icon hide_name_1000px hide_in_phone">
              <AiOutlineLogout className="logout_icon" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
