import React, { useContext, useEffect, useState } from "react";
import Home from "../Home/Home";
import TweetFields from "../TweetFields/TweetFields";
import ProfileLayout from "../Profile/ProfileLayout";
import Explore from "../Explore/Explore";
import Notifications from "../Notifications/Notifications";
import Messages from "../Messages/Messages";
import Lists from "../Lists/Lists";
import Bookmarks from "../Bookmarks/Booksmarks";
import Communities from "../Communities/Communities";
import Hashtag from "../Hashtag/Hashtag";
import Tweetpage from "../TweetPage/Tweetpage";
import Following from "../Following/Following";
import { useParams } from "react-router-dom";
import Foryou from "../TweetFields/Foryou/Foryou";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
import axios from "axios";
import ErrorPage from "../ErrorPage/ErrorPage";
import Editprofile from "../Editprofile/Editprofile";
import { TweetContext } from "../../useContext/TweetContext/TweetContext";
export default function Layout({
  tweetFields,
  profile,
  explore,
  notifications,
  messages,
  lists,
  bookmarks,
  communities,
  hashtag,
  showTweet,
  following,
  followers,
  with_replies,
  highlights,
  media,
  likes,
  edit_profile,
}) {
  const [
    showLogin,
    setShowLogin,
    showRegister,
    setShowRegister,
    userData,
    setUserData,
    loading,
    setLoading,
    allTweets,
    setAllTweets,
    infoLoader,
    setInfoLoader,
  ] = useContext(AuthContext);
  const [myTweets, setMyTweets, specificUserProfile, setSpecificUserProfile] =
    useContext(TweetContext);
  const [profileData, setprofileData] = useState();
  const [isloading, setLoader] = useState(false);
  const [isUserExist, setIsUserExist] = useState(true);
  const { username } = useParams();
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const getSpecificUser = () => {
    setLoader(true);
    document.title = "Loading...";
    console.log("Loading");
    try {
      axios.get(`${backendURL}/user/auth/getUser/${username}`).then((data) => {
        if (data.data.status === 1) {
          const user = data.data.data;
          setprofileData(user);
          setSpecificUserProfile(user);
          setLoader(false);
          document.title = `${user?.fullname} (@${user?.username}) / X`;
        } else {
          setIsUserExist(false);
        }
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (profile || followers || following || edit_profile) getSpecificUser();
  }, [username]);
  if (!isUserExist) {
    return <ErrorPage />;
  }
  return (
    <Home>
      {tweetFields && <TweetFields />}
      {profile && (
        <ProfileLayout
          isloading={isloading}
          profileData={specificUserProfile}
          allTweets={allTweets}
        >
          {!loading && (
            <Foryou
              scrollbarhide={true}
              profileId={profileData}
              myAllTweets={true}
            />
          )}
        </ProfileLayout>
      )}
      {explore && <Explore />}
      {notifications && <Notifications />}
      {messages && <Messages />}
      {lists && <Lists />}
      {bookmarks && <Bookmarks />}
      {communities && <Communities />}
      {hashtag && <Hashtag />}
      {showTweet && <Tweetpage />}
      {following && (
        <Following
          isloading={isloading}
          userData={userData}
          profileData={profileData}
          allTweets={allTweets}
          with_replies={true}
          following={true}
        />
      )}
      {followers && (
        <Following
          isloading={isloading}
          userData={userData}
          profileData={profileData}
          allTweets={allTweets}
          with_replies={true}
          follower={true}
        />
      )}
      {with_replies && (
        <ProfileLayout
          isloading={isloading}
          userData={userData}
          profileData={profileData}
          allTweets={allTweets}
          with_replies={true}
        >
          <p>With Replies</p>
        </ProfileLayout>
      )}
      {highlights && (
        <ProfileLayout
          isloading={isloading}
          userData={userData}
          profileData={profileData}
          allTweets={allTweets}
          highlights={highlights}
        >
          <p>With highlights</p>
        </ProfileLayout>
      )}
      {media && (
        <ProfileLayout
          isloading={isloading}
          userData={userData}
          profileData={profileData}
          allTweets={allTweets}
          media={media}
        >
          <p>media</p>
        </ProfileLayout>
      )}
      {likes && (
        <ProfileLayout
          isloading={isloading}
          userData={userData}
          profileData={profileData}
          allTweets={allTweets}
          likes={likes}
        >
          <p>likes</p>
        </ProfileLayout>
      )}
      {edit_profile && <Editprofile />}
    </Home>
  );
}
