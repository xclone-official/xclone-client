import React, { useContext, useEffect, useState } from "react";
import {
  Home,
  TweetFields,
  ProfileLayout,
  Explore,
  Notifications,
  Lists,
  Bookmarks,
  Communities,
  Hashtag,
  Tweetpage,
  Following,
  Foryou,
  useParams,
  AuthContext,
  axios,
  ErrorPage,
  Editprofile,
  Replies,
  TweetContext,
  LikedTweet,
  SingleMessagesBox,
  Messages,
  LikedUser,
  ShowSettings,
} from "./Import";

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
  composetweet,
  followers,
  with_replies,
  highlights,
  showMessage,
  media,
  replies,
  likes,
  edit_profile,
  socket,
  tweetLike,
  settings,

  changePassword,
  tweetPrivacy,
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
  return (
    <Home
      composetweet={composetweet}
      messages={messages}
      showMessage={showMessage}
      settings={settings}
      changePassword={changePassword}
      tweetPrivacy={tweetPrivacy}
    >
      {tweetFields && <TweetFields socket={socket} />}
      {profile && (
        <ProfileLayout
          isUserExist={isUserExist}
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
      {messages && (
        <>
          <div className="show_on_phone">
            <Messages />
          </div>
          <div className="hide_on_phone select_a_msg_to_show">
            Select a message to view
          </div>
        </>
      )}
      {showMessage && <SingleMessagesBox socket={socket} />}
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
      {tweetLike && <LikedUser />}
      {!isUserExist && <ErrorPage />}
      {(settings || tweetPrivacy || changePassword) && <ShowSettings />}
    </Home>
  );
}
