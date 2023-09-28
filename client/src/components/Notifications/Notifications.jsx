import React, { useContext } from "react";
import "./Notifications.css";
import { Link, useNavigate } from "react-router-dom";
import { NotificationContext } from "../../useContext/NotificationsContext/NotificationsContext";
export default function Lists() {
  const navigate = useNavigate();
  const [allNotification, setAllNotification] = useContext(NotificationContext);
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  React.useEffect(() => {
    document.title = `${
      allNotification.filter((notification) => !notification.isSeen)?.length > 0
        ? +allNotification.filter((notification) => !notification.isSeen)
            ?.length + "🔴"
        : ""
    } X / Notifications`;

    // Create a copy of the notifications array with updated 'isSeen' property
    const updatedNotifications = allNotification.map((notification) => ({
      ...notification,
      isSeen: true,
    }));

    // Update the state with the new array
    const timeOutId = setTimeout(() => {
      setAllNotification(updatedNotifications);
      document.title = "X / Notifications";
    }, 3000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [allNotification.length]);

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
            allNotification.map((notification, i) => (
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
            ))
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
