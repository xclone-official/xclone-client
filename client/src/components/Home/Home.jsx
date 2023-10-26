import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Rightbar from "../Rightbar/Rightbar";
import "./home.css";
import Messages from "../Messages/Messages";
import PostField from "../PostField/PostField";
import Settings from "../Settings/Settings";

export default function Home({
  children,
  socket,
  composetweet,
  messages,
  showMessage,
  settings,
  changePassword,
  tweetPrivacy,
}) {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [widthOfWindow, setWidthOfWindow] = useState("");

  useEffect(() => {
    // Function to update the width when the window is resized
    const handleWindowResize = () => {
      const newWidth = window.innerWidth;
      setWidthOfWindow(newWidth);
    };

    // Initial window width
    const initialWidth = window.innerWidth;
    setWidthOfWindow(initialWidth);

    // Attach the resize event listener
    window.addEventListener("resize", handleWindowResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const goBackToPreviousPage = () => {
    navigate(-1);
  };
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home");
      document.title = "X / Home";
    }
  }, []);
  return (
    <div className="main_content">
      {location.pathname === "/home/compose/tweet" && (
        <div className="post_field_in_phone_and_pc">
          <div className="real_post_div">
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
                <p>Tweets</p>
              </div>
            </div>
            <br />
            <PostField />
          </div>
        </div>
      )}

      <div className="three_grid">
        <div className="sidebar">
          <div className="column">
            <Sidebar socket={socket} />
          </div>
        </div>
        {messages ? (
          <>
            <div className="rightbar">
              <div className="column">
                {userId ? (
                  <Messages />
                ) : location.pathname === "/messages" ? (
                  <Messages />
                ) : (
                  <Rightbar />
                )}
              </div>
            </div>
            <div className="tweetfields">
              <div className="column">{children}</div>
              {/* Tweet btn */}

              {!showMessage && !messages && (
                <div
                  onClick={() => {
                    location.pathname === "/home/compose/tweet"
                      ? navigate(`/home`)
                      : navigate(`/home/compose/tweet`);
                  }}
                  className="tweet_btn_on_phone"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path>
                    </g>
                  </svg>
                </div>
              )}
            </div>
          </>
        ) : settings || changePassword || tweetPrivacy ? (
          <>
            <div
              className={` ${
                widthOfWindow <= 820 ? "tweetfields" : "rightbar"
              } `}
            >
              <div className="column">
                {settings || changePassword || tweetPrivacy ? (
                  <Settings />
                ) : (
                  <Rightbar />
                )}
              </div>
            </div>
            <div
              className={` ${
                widthOfWindow <= 820 ? "rightbar" : "tweetfields"
              } `}
            >
              <div className="column">{children}</div>
              {/* Tweet btn */}

              {!showMessage && !messages && (
                <div
                  onClick={() => {
                    location.pathname === "/home/compose/tweet"
                      ? navigate(`/home`)
                      : navigate(`/home/compose/tweet`);
                  }}
                  className="tweet_btn_on_phone"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path>
                    </g>
                  </svg>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="tweetfields">
              <div className="column">{children}</div>
              {/* Tweet btn */}

              {!showMessage && !messages && (
                <div
                  onClick={() => {
                    location.pathname === "/home/compose/tweet"
                      ? navigate(`/home`)
                      : navigate(`/home/compose/tweet`);
                  }}
                  className="tweet_btn_on_phone"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path>
                    </g>
                  </svg>
                </div>
              )}
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
          </>
        )}
      </div>
    </div>
  );
}
