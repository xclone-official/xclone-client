import React, { useContext, useEffect, useState } from "react";
import Auth from "./components/auth/Auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { AuthContext } from "./useContext/AuthContext/AuthContext";
import Home from "./components/Home/Home";
import Loader from "./components/Loader/Loader";
import Layout from "./components/Layout/Layout";
import { io } from "socket.io-client";
import { NotificationContext } from "./useContext/NotificationsContext/NotificationsContext";
import { MessageContext } from "./useContext/MessageContext/MessageContext";
import Cookies from "js-cookie";

export default function App() {
  const [, , , , userData, , loading] = useContext(AuthContext);
  const [allNotification, setAllNotification] = useContext(NotificationContext);
  const [allMessages, setAllMessages] = useContext(MessageContext);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(
      io("http://localhost:5000", {
        withCredentials: true,
      })
    );
  }, []);
  useEffect(() => {
    socket?.emit("newUser", userData?.username);
  }, [userData, socket]);
  // Follow socket
  useEffect(() => {
    const handleFollowed = (data) => {
      console.log(data);
      if (
        !allNotification.some(
          (notification) =>
            notification?.authorUsername === data.authorUsername &&
            notification.type === data.type
        )
      ) {
        setAllNotification((prev) => [data, ...prev]);
      }
    };

    socket?.on("followed", handleFollowed);

    // Cleanup the event listener when the component unmounts
    return () => {
      socket?.off("followed", handleFollowed);
    };
  }, [socket, allNotification?.length, allNotification]);
  // Like socket
  useEffect(() => {
    const handleLiked = (data) => {
      // console.log("handleLike", data);
      if (
        !allNotification.some(
          (notification) =>
            notification.authorUsername === data.authorUsername &&
            notification.type === data.type &&
            notification?.tweet?._id === data?.tweetId
        )
      ) {
        setAllNotification((prev) => [data, ...prev]);
      }
    };

    socket?.on("likedtweet", handleLiked);

    // Cleanup the event listener when the component unmounts
    return () => {
      socket?.off("likedtweet", handleLiked);
    };
  }, [socket, allNotification?.length, allNotification]);

  // allMsg
  useEffect(() => {
    const handleAllMsg = (data) => {
      // console.log("allMsg", data);
      data?.length > 0 && setAllMessages(data);
    };

    socket?.on("setAllMsg", handleAllMsg);

    // Cleanup the event listener when the component unmounts
    return () => {
      socket?.off("setAllMsg", handleAllMsg);
    };
  }, [socket]);

  // Add msg
  useEffect(() => {
    const handleAllMsg = (data) => {
      // console.log("sendAddMsg", data);

      data?.length > 0 && setAllMessages(data);
    };

    socket?.on("sendAddMsg", handleAllMsg);

    // Cleanup the event listener when the component unmounts
    return () => {
      socket?.off("sendAddMsg", handleAllMsg);
    };
  }, [socket]);

  // reply socket
  useEffect(() => {
    const handleLiked = (data) => {
      setAllNotification((prev) => [data, ...prev]);
    };

    socket?.on("replytweet", handleLiked);

    // Cleanup the event listener when the component unmounts
    return () => {
      socket?.off("replytweet", handleLiked);
    };
  }, [socket, allNotification?.length, allNotification]);

  if (Cookies.get("xid")) {
    loading && <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={userData ? <Home socket={socket} /> : <Auth />}
        />
        <Route
          path="/flow/login"
          exact
          element={userData ? <Home socket={socket} /> : <Login />}
        />
        <Route
          path="/flow/register"
          exact
          element={userData ? <Home socket={socket} /> : <Register />}
        />
        <Route
          path="/home"
          exact
          element={
            userData ? <Layout socket={socket} tweetFields={true} /> : <Auth />
          }
        />
        <Route
          path="/home/compose/tweet"
          exact
          element={
            userData ? <Layout socket={socket} composetweet={true} /> : <Auth />
          }
        />
        <Route
          path="/p/:username"
          exact
          element={
            userData ? <Layout socket={socket} profile={true} /> : <Auth />
          }
        />
        <Route
          path="/p/:username/following"
          exact
          element={
            userData ? <Layout socket={socket} following={true} /> : <Auth />
          }
        />

        {/* /p/${userData.username}/with_replies */}
        <Route
          path="/p/:username/with_replies"
          exact
          element={
            userData ? <Layout socket={socket} with_replies={true} /> : <Auth />
          }
        />
        {/* /p/${userData.username}/with_replies */}
        <Route
          path="/p/:username/highlights"
          exact
          element={
            userData ? <Layout socket={socket} highlights={true} /> : <Auth />
          }
        />

        <Route
          path="/p/:username/media"
          exact
          element={
            userData ? <Layout socket={socket} media={true} /> : <Auth />
          }
        />

        <Route
          path="/p/:username/likes"
          exact
          element={
            userData ? <Layout socket={socket} likes={true} /> : <Auth />
          }
        />
        <Route
          path="/p/:username/followers"
          exact
          element={
            userData ? <Layout socket={socket} followers={true} /> : <Auth />
          }
        />

        <Route
          path="/p/:username/edit_profile"
          exact
          element={
            userData ? <Layout socket={socket} edit_profile={true} /> : <Auth />
          }
        />

        <Route
          path="/explore"
          exact
          element={
            userData ? <Layout socket={socket} explore={true} /> : <Auth />
          }
        />
        <Route
          path="/notifications"
          exact
          element={
            userData ? (
              <Layout socket={socket} notifications={true} />
            ) : (
              <Auth />
            )
          }
        />
        <Route
          path="/messages"
          exact
          element={
            userData ? <Layout socket={socket} messages={true} /> : <Auth />
          }
        />
        <Route
          path="/messages/:userId"
          exact
          element={
            userData ? <Layout socket={socket} showMessage={true} /> : <Auth />
          }
        />
        <Route
          path="/lists/:username"
          exact
          element={
            userData ? <Layout socket={socket} lists={true} /> : <Auth />
          }
        />
        <Route
          path="/bookmarks"
          exact
          element={
            userData ? <Layout socket={socket} bookmarks={true} /> : <Auth />
          }
        />
        <Route
          path="/communities"
          exact
          element={
            userData ? <Layout socket={socket} communities={true} /> : <Auth />
          }
        />
        <Route
          path="/hashtag/:hashtag"
          exact
          element={
            userData ? <Layout socket={socket} hashtag={true} /> : <Auth />
          }
        />
        <Route
          path="/:username/tweet/:tweetId"
          exact
          element={
            userData ? <Layout socket={socket} showTweet={true} /> : <Auth />
          }
        />
        <Route
          path="/:username/tweet/:tweetId/likes"
          exact
          element={
            userData ? <Layout socket={socket} tweetLike={true} /> : <Auth />
          }
        />
        <Route
          path="/:username/tweet/:tweetId/replies/:commentId"
          exact
          element={
            userData ? <Layout socket={socket} replies={true} /> : <Auth />
          }
        />
        {/* Setting Route */}
        <Route
          path="/account/settings"
          exact
          element={
            userData ? <Layout socket={socket} settings={true} /> : <Auth />
          }
        />
        <Route
          path="/account/settings/account_info"
          exact
          element={
            userData ? <Layout socket={socket} account_info={true} /> : <Auth />
          }
        />
        <Route
          path="/settings"
          exact
          element={
            userData ? <Layout socket={socket} settings={true} /> : <Auth />
          }
        />
        <Route
          path="/account/settings/change-password"
          exact
          element={
            userData ? (
              <Layout socket={socket} changePassword={true} />
            ) : (
              <Auth />
            )
          }
        />
        <Route
          path="/account/settings/tweet-privacy"
          exact
          element={
            userData ? <Layout socket={socket} tweetPrivacy={true} /> : <Auth />
          }
        />
        <Route
          path="/*"
          exact
          element={
            userData ? <Layout socket={socket} pageNotFound={true} /> : <Auth />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
