import React, { useContext, useEffect } from "react";
import "./sidebar.css";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
import { Link, NavLink } from "react-router-dom";
import { BiSolidSearch, BiSolidUser, BiUser } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import {
  AiFillBook,
  AiFillHome,
  AiFillMessage,
  AiFillNotification,
  AiOutlineBook,
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlineNotification,
  AiOutlineSearch,
} from "react-icons/ai";
import { NotificationContext } from "../../useContext/NotificationsContext/NotificationsContext";

export default function Sidebar({ socket }) {
  const location = useLocation();
  const [, , , , userData, , ,] = useContext(AuthContext);
  const [allNotification, setAllNotification] = useContext(NotificationContext);

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
      name: "Lists",
      logo: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <g>
            <path
              fill="white"
              d="M3 4.5C3 3.12 4.12 2 5.5 2h13C19.88 2 21 3.12 21 4.5v15c0 1.38-1.12 2.5-2.5 2.5h-13C4.12 22 3 20.88 3 19.5v-15zM5.5 4c-.28 0-.5.22-.5.5v15c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-15c0-.28-.22-.5-.5-.5h-13zM16 10H8V8h8v2zm-8 2h8v2H8v-2z"
            ></path>
          </g>
        </svg>
      ),
      activeLogo: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <g>
            <path
              fill="white"
              d="M18.5 2h-13C4.12 2 3 3.12 3 4.5v15C3 20.88 4.12 22 5.5 22h13c1.38 0 2.5-1.12 2.5-2.5v-15C21 3.12 19.88 2 18.5 2zM16 14H8v-2h8v2zm0-4H8V8h8v2z"
            ></path>
          </g>
        </svg>
      ),
      href: `/lists/${userData?.username}`,
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
      name: "Communities",
      href: "/communities",
      activeLogo: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <g>
            <path
              fill="white"
              d="M7.471 21H.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977.963 0 1.95.212 2.87.672-1.608 1.732-2.762 4.389-2.869 8.248l-.03 1.083zM9.616 9.27C10.452 8.63 11 7.632 11 6.5 11 4.57 9.433 3 7.5 3S4 4.57 4 6.5c0 1.132.548 2.13 1.384 2.77.589.451 1.317.73 2.116.73s1.527-.279 2.116-.73zm6.884 1.726c-3.264 0-6.816 2.358-7 8.977L9.471 21h14.057l-.029-1.027c-.184-6.618-3.736-8.977-7-8.977zm2.116-1.726C19.452 8.63 20 7.632 20 6.5 20 4.57 18.433 3 16.5 3S13 4.57 13 6.5c0 1.132.548 2.13 1.384 2.77.589.451 1.317.73 2.116.73s1.527-.279 2.116-.73z"
            ></path>
          </g>
        </svg>
      ),
      logo: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <g>
            <path
              fill="white"
              d="M7.501 19.917L7.471 21H.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977.963 0 1.95.212 2.87.672-.444.478-.851 1.03-1.212 1.656-.507-.204-1.054-.329-1.658-.329-2.767 0-4.57 2.223-4.938 6.004H7.56c-.023.302-.05.599-.059.917zm15.998.056L23.528 21H9.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977s6.816 2.358 7 8.977zM21.437 19c-.367-3.781-2.17-6.004-4.938-6.004s-4.57 2.223-4.938 6.004h9.875zm-4.938-9c-.799 0-1.527-.279-2.116-.73-.836-.64-1.384-1.638-1.384-2.77 0-1.93 1.567-3.5 3.5-3.5s3.5 1.57 3.5 3.5c0 1.132-.548 2.13-1.384 2.77-.589.451-1.317.73-2.116.73zm-1.5-3.5c0 .827.673 1.5 1.5 1.5s1.5-.673 1.5-1.5-.673-1.5-1.5-1.5-1.5.673-1.5 1.5zM7.5 3C9.433 3 11 4.57 11 6.5S9.433 10 7.5 10 4 8.43 4 6.5 5.567 3 7.5 3zm0 2C6.673 5 6 5.673 6 6.5S6.673 8 7.5 8 9 7.327 9 6.5 8.327 5 7.5 5z"
            ></path>
          </g>
        </svg>
      ),
    },
    {
      className: "hide_in_phone",
      name: "Verified",
      logo: (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="r-vlxjld r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e"
        >
          <g>
            <path
              fill="white"
              d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            ></path>
          </g>
        </svg>
      ),
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
      name: "More",
      logo: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <g>
            <path
              fill="white"
              d="M3.75 12c0-4.56 3.69-8.25 8.25-8.25s8.25 3.69 8.25 8.25-3.69 8.25-8.25 8.25S3.75 16.56 3.75 12zM12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-4.75 11.5c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25S6 11.31 6 12s.56 1.25 1.25 1.25zm9.5 0c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25-1.25.56-1.25 1.25.56 1.25 1.25 1.25zM13.25 12c0 .69-.56 1.25-1.25 1.25s-1.25-.56-1.25-1.25.56-1.25 1.25-1.25 1.25.56 1.25 1.25z"
            ></path>
          </g>
        </svg>
      ),
    },
  ];
  const getInputAndFocus = () => {
    const postFieldInput = document?.querySelector("#post-tweet");
    if (postFieldInput) {
      // You can adjust the number of columns as needed.
      postFieldInput?.focus();
    }
  };
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  return (
    <div className="sidebar_content">
      <div className="sidebar_logo">
        <svg
          viewBox="0 0 24 24"
          className="sidebar_logoo"
          style={{
            height: "6%",
            width: "18%",
            borderRadius: "20px",
            padding: "5px",
          }}
          aria-hidden="true"
        >
          <g fill="white">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </g>
        </svg>
        <div className="sidebar_links">
          {Links.map((e, index) => {
            const isLocationMatched = location.pathname;
            return e.href ? (
              <NavLink key={index} to={e.href}>
                <div
                  className={`sidebar_home ${e.className}
                  }`}
                  key={index}
                >
                  {e.msg && e.msg}
                  <p>{isLocationMatched === e.href ? e.activeLogo : e.logo}</p>
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
        <div className="sidebar_logout hide_in_phone">
          <Link
            to={`/p/${userData?.username}`}
            style={{ display: "flex", gap: "10px" }}
          >
            <div className="pfp_logout_img">
              <img src={`${backendURL}/${userData?.profilepicture}`} alt="" />
            </div>
            <div className="username_name hide_name_1000px">
              <p>{userData?.fullname}</p>
              <span>@{userData?.username}</span>
            </div>
          </Link>
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
      </div>
    </div>
  );
}
