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

export default function App() {
  const [, , , , userData, , loading] = useContext(AuthContext);
  const [allNotification, setAllNotification] = useContext(NotificationContext);
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
  if (loading) {
    return <Loader />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={userData ? <Home socket={socket} /> : <Auth />}
        />
        <Route
          path="/flow/login"
          element={userData ? <Home socket={socket} /> : <Login />}
        />
        <Route
          path="/flow/register"
          element={userData ? <Home socket={socket} /> : <Register />}
        />
        <Route
          path="/home"
          element={
            userData ? <Layout socket={socket} tweetFields={true} /> : <Auth />
          }
        />
        <Route
          path="/p/:username"
          element={
            userData ? <Layout socket={socket} profile={true} /> : <Auth />
          }
        />
        <Route
          path="/p/:username/following"
          element={
            userData ? <Layout socket={socket} following={true} /> : <Auth />
          }
        />
        {/* /p/${userData.username}/with_replies */}
        <Route
          path="/p/:username/with_replies"
          element={
            userData ? <Layout socket={socket} with_replies={true} /> : <Auth />
          }
        />
        {/* /p/${userData.username}/with_replies */}
        <Route
          path="/p/:username/highlights"
          element={
            userData ? <Layout socket={socket} highlights={true} /> : <Auth />
          }
        />

        <Route
          path="/p/:username/media"
          element={
            userData ? <Layout socket={socket} media={true} /> : <Auth />
          }
        />

        <Route
          path="/p/:username/likes"
          element={
            userData ? <Layout socket={socket} likes={true} /> : <Auth />
          }
        />
        <Route
          path="/p/:username/followers"
          element={
            userData ? <Layout socket={socket} followers={true} /> : <Auth />
          }
        />

        <Route
          path="/p/:username/edit_profile"
          element={
            userData ? <Layout socket={socket} edit_profile={true} /> : <Auth />
          }
        />

        <Route
          path="/explore"
          element={
            userData ? <Layout socket={socket} explore={true} /> : <Auth />
          }
        />
        <Route
          path="/notifications"
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
          element={
            userData ? <Layout socket={socket} messages={true} /> : <Auth />
          }
        />
        <Route
          path="/lists/:username"
          element={
            userData ? <Layout socket={socket} lists={true} /> : <Auth />
          }
        />
        <Route
          path="/bookmarks"
          element={
            userData ? <Layout socket={socket} bookmarks={true} /> : <Auth />
          }
        />
        <Route
          path="/communities"
          element={
            userData ? <Layout socket={socket} communities={true} /> : <Auth />
          }
        />
        <Route
          path="/hashtag/:hashtag"
          element={
            userData ? <Layout socket={socket} hashtag={true} /> : <Auth />
          }
        />
        <Route
          path="/:username/tweet/:tweetId"
          element={
            userData ? <Layout socket={socket} showTweet={true} /> : <Auth />
          }
        />
        <Route
          path="/:username/tweet/:tweetId/replies/:commentId"
          element={
            userData ? <Layout socket={socket} replies={true} /> : <Auth />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
