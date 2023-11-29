import { AllTweetContext } from "../../useContext/AllTweetContext/AllTweetContextProvider";
import ForgotPass from "../ForgotPass/ForgotPass";
import ProfilePost from "../ProfilePost/ProfilePost";
import {
  React,
  useContext,
  useState,
  useEffect,
  Home,
  YourAccount,
  Accountinfo,
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
  UpdateBirthDate,
  UpdateCountry,
  UpdateEmail,
  UpdateGender,
  UpdateLanguage,
  UpdateName,
  UpdateProtectedTweets,
  DeactivateAcc,
  UpdateUserName,
} from "./Import";

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
  deactivateAcc,
  forgotPass,
}) {
  const [, , , , userData, , loading, , , , , ,] = useContext(AuthContext);
  const [allTweets] = useContext(AllTweetContext);
  const [, , specificUserProfile, setSpecificUserProfile] =
    useContext(TweetContext);
  const [profileData, setprofileData] = useState();
  const [isloading, setLoader] = useState(false);
  const [isUserExist, setIsUserExist] = useState(true);
  const [is_deactivated, setIs_deactivated] = useState(true);
  const { username } = useParams();
  const backendURL = process.env.REACT_APP_BACKEND_URL;

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
    ) {
      const getSpecificUser = () => {
        setLoader(true);
        document.title = "Loading...";
        try {
          axios
            .get(`${backendURL}/user/auth/getUser/${username}`)
            .then((data) => {
              if (data.data.status === 1) {
                const user = data.data.data;
                setprofileData(user);
                setSpecificUserProfile(user);
                setIsUserExist(true);
                setTimeout(() => {
                  setLoader(false);
                }, 1000);
                document.title = `${user?.fullname} (@${user?.username}) / X`;
                if (user.flag) {
                  return setIs_deactivated(true);
                } else return setIs_deactivated(false);
              } else {
                setIsUserExist(false);
                setLoader(false);
              }
            });
        } catch (error) {}
      };
      getSpecificUser();
    }
    setIsUserExist(true);
    setIs_deactivated(false);
  }, [
    username,
    edit_profile,
    followers,
    following,
    highlights,
    likes,
    media,
    profile,
    showTweet,
    with_replies,
    backendURL,
    setSpecificUserProfile,
  ]);
  return (
    <Home
      composetweet={composetweet}
      messages={messages}
      showMessage={showMessage}
      settings={settings}
      changePassword={changePassword}
      forgotPass={forgotPass}
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
      deactivateAcc={deactivateAcc}
    >
      {tweetFields && <TweetFields socket={socket} />}

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
      {(profile ||
        edit_profile ||
        with_replies ||
        highlights ||
        media ||
        likes) && (
        <ProfileLayout
          is_deactivated={is_deactivated}
          socket={socket}
          isloading={isloading}
          userData={userData}
          profileData={profileData}
          allTweets={allTweets}
          likes={likes}
          isUserExist={isUserExist}
        >
          {profile && !loading && !is_deactivated && (
            <ProfilePost
              scrollbarhide={true}
              profileId={specificUserProfile}
              myAllTweets={true}
              socket={socket}
            />
          )}
          {edit_profile && <Editprofile socket={socket} />}
          {with_replies && <p>With Replies</p>}
          {highlights && <p>With highlights</p>}
          {media && <p>media</p>}
          {likes && <LikedTweet socket={socket} profileData={profileData} />}
        </ProfileLayout>
      )}

      {replies && <Replies socket={socket} />}
      {tweetLike && <LikedUser />}
      {!isUserExist && <ErrorPage />}
      {settings && <YourAccount />}
      {changePassword && <ForgotPassword />}
      {tweetPrivacy && <>tweetPrivacy</>}
      {account_info && <Accountinfo />}
      {forgotPass && <ForgotPass />}
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
      {deactivateAcc && <DeactivateAcc />}
    </Home>
  );
}
