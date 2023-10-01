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
import Replies from "../Replies/Replies";
import { TweetContext } from "../../useContext/TweetContext/TweetContext";
import LikedTweet from "../LikedTweet/LikedTweet";
import SingleMessagesBox from "../Messages/SingleMessagesBox";
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
  replies,
  likes,
  edit_profile,
  socket,
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
    try {
      axios.get(`${backendURL}/user/auth/getUser/${username}`).then((data) => {
        if (data.data.status === 1) {
          const user = data.data.data;
          setprofileData(user);
          setSpecificUserProfile(user);
          setTimeout(() => {
            setLoader(false);
          }, 1000);
          document.title = `${user?.fullname} (@${user?.username}) / X`;
        } else {
          setIsUserExist(false);
        }
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (
      profile ||
      followers ||
      following ||
      edit_profile ||
      with_replies ||
      media ||
      likes ||
      highlights ||
      showTweet
    )
      getSpecificUser();
  }, [username]);
  if (!isUserExist) {
    return <ErrorPage />;
  }
  return (
    <Home>
      {tweetFields && <TweetFields socket={socket} />}
      {profile && (
        <ProfileLayout
          isloading={isloading}
          userDataa={specificUserProfile}
          allTweets={allTweets}
          socket={socket}
        >
          {!loading && (
            <Foryou
              scrollbarhide={true}
              profileId={specificUserProfile}
              myAllTweets={true}
              socket={socket}
            />
          )}
        </ProfileLayout>
      )}
      {explore && <Explore socket={socket} />}
      {notifications && <Notifications socket={socket} />}
      {messages && <SingleMessagesBox socket={socket} />}
      {lists && <Lists socket={socket} />}
      {bookmarks && <Bookmarks socket={socket} />}
      {communities && <Communities socket={socket} />}
      {hashtag && <Hashtag socket={socket} />}
      {showTweet && <Tweetpage socket={socket} />}
      {following && (
        <Following
          isloading={isloading}
          userData={userData}
          profileData={profileData}
          allTweets={allTweets}
          with_replies={true}
          following={true}
          socket={socket}
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
          socket={socket}
        />
      )}
      {with_replies && (
        <ProfileLayout
          isloading={isloading}
          userData={userData}
          profileData={profileData}
          allTweets={allTweets}
          with_replies={true}
          socket={socket}
        >
          <p>With Replies</p>
        </ProfileLayout>
      )}
      {highlights && (
        <ProfileLayout
          socket={socket}
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
          socket={socket}
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
          socket={socket}
          isloading={isloading}
          userData={userData}
          profileData={profileData}
          allTweets={allTweets}
          likes={likes}
        >
          <LikedTweet socket={socket} profileData={profileData} />
        </ProfileLayout>
      )}
      {edit_profile && <Editprofile socket={socket} />}
      {replies && <Replies socket={socket} />}
    </Home>
  );
}
