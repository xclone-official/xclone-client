import React, { useContext, useEffect, useState } from "react";
import {
  Home,
  YourAccount,
  Account_info,
  ForgotPassword,
  TweetFields,
  ProfileLayout,
  Explore,
  Notifications,
  Lists,
  PageNotFound,
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
} from "./Import";
import UpdateUserName from "../AllSettings/UpdateUserName/UpdateUserName";
import UpdateEmail from "../AllSettings/UpdateEmail/UpdateEmail";
import Updatephone from "../AllSettings/Updatephone/Updatephone";
import UpdateProtectedTweets from "../AllSettings/UpdateProtectedTweets/UpdateProtectedTweets";
import UpdateCountry from "../AllSettings/UpdateCountry/UpdateCountry";
import UpdateLanguage from "../AllSettings/UpdateLanguage/UpdateLanguage";
import UpdateGender from "../AllSettings/UpdateGender/UpdateGender";
import UpdateBirthDate from "../AllSettings/UpdateBirthDate/UpdateBirthDate";
import UpdateName from "../AllSettings/UpdateName/UpdateName";

export default function Layout({
  tweetFields,
  profile,
  explore,
  notifications,
  account_info,
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
  pageNotFound,
  update_username,
  update_phone,
  update_email,
  update_protected_posts,
  update_country,
  update_languages,
  update_gender,
  update_dob,
  name,
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
    setIsUserExist(true);
    try {
      axios.get(`${backendURL}/user/auth/getUser/${username}`).then((data) => {
        if (data.data.status === 1) {
          const user = data.data.data;
          setprofileData(user);
          setSpecificUserProfile(user);
          setIsUserExist(true);
          setTimeout(() => {
            setLoader(false);
          }, 1000);
          document.title = `${user?.fullname} (@${user?.username}) / X`;
        } else {
          setIsUserExist(false);
          setLoader(false);
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
    setIsUserExist(true);
  }, [username]);

  return (
    <Home
      composetweet={composetweet}
      messages={messages}
      showMessage={showMessage}
      settings={settings}
      changePassword={changePassword}
      tweetPrivacy={tweetPrivacy}
      account_info={account_info}
      update_username={update_username}
      update_phone={update_phone}
      update_email={update_email}
      update_protected_posts={update_protected_posts}
      update_country={update_country}
      update_languages={update_languages}
      update_gender={update_gender}
      update_dob={update_dob}
      name={name}
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
      {settings && <YourAccount />}
      {changePassword && <ForgotPassword />}
      {tweetPrivacy && <>tweetPrivacy</>}
      {account_info && <Account_info />}
      {pageNotFound && <PageNotFound />}
      {update_username && <UpdateUserName />}
      {update_phone && <h2>We are working</h2>}
      {name && <UpdateName />}
      {update_email && <UpdateEmail />}
      {update_protected_posts && <UpdateProtectedTweets />}
      {update_country && <UpdateCountry />}
      {update_languages && <UpdateLanguage />}
      {update_gender && <UpdateGender />}
      {update_dob && <UpdateBirthDate />}
    </Home>
  );
}
