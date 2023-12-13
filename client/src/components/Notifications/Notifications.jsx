import React, { useContext, useEffect } from "react";
import "./Notifications.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { NotificationContext } from "../../useContext/NotificationsContext/NotificationsContext";
import { customTimeFormat } from "../customTime/customTime";
import RemoveUnnecessaryTag from "../../TweetCard/RemoveUnnecessaryTag";
import { AuthContext } from "../Layout/Import";
export default function Lists() {
  const [, , , , userData, , , , , , , , , , , ,] = useContext(AuthContext);
  const navigate = useNavigate();
  const [allNotification, setAllNotification] = useContext(NotificationContext);
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const makeAllNotificationToSeenTrue = async () => {
      try {
        await axios.post(
          `${backendURL}/update/allNotification/${userData?._id}`
        );
      } catch (error) {
        console.log(error);
      }
    };
    makeAllNotificationToSeenTrue();
  }, [backendURL, userData?._id, allNotification?.length]);
  useEffect(() => {
    document.title = `${
      allNotification.filter((notification) => !notification.isSeen)?.length > 0
        ? +allNotification.filter((notification) => !notification.isSeen)
            ?.length + "🔴"
        : ""
    } Xclone / Notifications`;

    // Create a copy of the notifications array with updated 'isSeen' property
    const updatedNotifications = allNotification.map((notification) => ({
      ...notification,
      isSeen: true,
    }));

    // Update the state with the new array
    const timeOutId = setTimeout(async () => {
      setAllNotification(updatedNotifications);
      document.title = "Xclone / Notifications";
    }, 3000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [allNotification.length, allNotification, setAllNotification]);

  const goBackToPreviousPage = () => {
    navigate(-1);
  };

  return (
    <div>
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
          <p>Notifications</p>
        </div>
      </div>
      <div className="allNotifications">
        <div className="">
          {allNotification?.length > 0 ? (
            allNotification.map((notification, i) =>
              notification?.type === "follow" ? (
                <div
                  key={i}
                  className={`single_notification ${
                    !notification?.isSeen && "single_notification_is_not_seen"
                  }`}
                >
                  <div className="notification_svg">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <g>
                        <path
                          fill="var(--theme-color)"
                          d="M17.863 13.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44zM12 2C9.791 2 8 3.79 8 6s1.791 4 4 4 4-1.79 4-4-1.791-4-4-4z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <div className="notification_profile_name">
                    <div className="notification_profile">
                      <img
                        src={`${backendURL}/${notification?.authorProfile}`}
                        alt=""
                      />
                    </div>
                    <div className="notification_name_details">
                      <Link to={`/p/${notification?.authorUsername}`}>
                        {notification?.authorName}
                      </Link>
                      <span>followed you</span>
                    </div>
                  </div>
                </div>
              ) : notification?.type === "liketweet" ? (
                <div
                  key={i}
                  className={`single_notification ${
                    !notification?.isSeen && "single_notification_is_not_seen"
                  }`}
                >
                  <div className="notification_svg">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <g>
                        <path
                          fill="var(--theme-color)"
                          d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <div className="notification_profile_name">
                    <div className="notification_profile">
                      <img
                        src={`${backendURL}/${notification?.authorProfile}`}
                        alt=""
                      />
                    </div>
                    <div className="notification_name_details">
                      <Link to={`/p/${notification?.authorUsername}`}>
                        {notification?.authorName}
                      </Link>
                      <span>liked your tweet.</span>
                    </div>
                    <div className="like_tweet_text">
                      <Link
                        to={`/${notification?.tweet.authorUsername}/tweet/${notification?.tweet?._id}`}
                      >
                        <p style={{ marginTop: "7px" }}>
                          <RemoveUnnecessaryTag
                            htmlContent={notification?.tweet?.tweetContent}
                          />
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key={i}
                  className={`single_notification ${
                    !notification?.isSeen && "single_notification_is_not_seen"
                  }`}
                >
                  <div className="notification_profile">
                    <img
                      className="reply_notification"
                      src={`${backendURL}/${notification?.authorProfile}`}
                      alt=""
                    />
                  </div>
                  <div className="notification_profile_name">
                    <div className="notification_name_details">
                      <Link to={`/p/${notification?.authorUsername}`}>
                        {notification?.authorName}
                      </Link>
                      <span className="reply_username_notification">
                        @{notification?.authorUsername} ·
                      </span>

                      <span className="reply_username_notification">
                        {customTimeFormat(notification?.date)}
                      </span>
                    </div>
                    <div className="reply_tweet_text">
                      <p className="reply_username_notification_">
                        Replying to{" "}
                        <span>
                          <Link to={`/p/${notification?.authorUsername}`}>
                            @{notification?.tweet?.authorUsername}
                          </Link>
                        </span>
                      </p>
                      <Link
                        to={`/${notification?.authorUsername}/tweet/${notification?.tweet?._id}`}
                      >
                        <p>
                          <RemoveUnnecessaryTag
                            htmlContent={notification?.commentText}
                          />
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            )
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "100px 0",
              }}
            >
              <p>No new notification</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
