import React, { useContext } from "react";
import Auth from "./components/auth/Auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { AuthContext } from "./useContext/AuthContext/AuthContext";
import Home from "./components/Home/Home";
import Loader from "./components/Loader/Loader";
import Layout from "./components/Layout/Layout";
export default function App() {
  const [, , , , userData, , loading] = useContext(AuthContext);
  // Show loader when loading is true
  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={userData ? <Home /> : <Auth />} />
        <Route path="/flow/login" element={userData ? <Home /> : <Login />} />
        <Route
          path="/flow/register"
          element={userData ? <Home /> : <Register />}
        />
        <Route
          path="/home"
          element={userData ? <Layout tweetFields={true} /> : <Auth />}
        />
        <Route
          path="/p/:username"
          element={userData ? <Layout profile={true} /> : <Auth />}
        />
        <Route
          path="/explore"
          element={userData ? <Layout explore={true} /> : <Auth />}
        />
        <Route
          path="/notifications"
          element={userData ? <Layout notifications={true} /> : <Auth />}
        />
        <Route
          path="/messages"
          element={userData ? <Layout messages={true} /> : <Auth />}
        />

        <Route
          path="/lists/:username"
          element={userData ? <Layout lists={true} /> : <Auth />}
        />

        <Route
          path="/bookmarks"
          element={userData ? <Layout bookmarks={true} /> : <Auth />}
        />
        <Route
          path="/communities"
          element={userData ? <Layout communities={true} /> : <Auth />}
        />

        <Route
          path="/hashtag/:hashtag"
          element={userData ? <Layout hashtag={true} /> : <Auth />}
        />
        <Route
          path="/:username/tweet/:tweetId"
          element={userData ? <Layout showTweet={true} /> : <Auth />}
        />
      </Routes>
    </BrowserRouter>
  );
}

// const [, , , , userData, ,] = useContext(AuthContext);
