import React from "react";
import Home from "../Home/Home";
import TweetFields from "../TweetFields/TweetFields";
import Profile from "../Profile/Profile";
import Explore from "../Explore/Explore";
import Notifications from "../Notifications/Notifications";
import Messages from "../Messages/Messages";
import Lists from "../Lists/Lists";
import Bookmarks from "../Bookmarks/Booksmarks";
import Communities from "../Communities/Communities";
import Hashtag from "../Hashtag/Hashtag";
import Tweetpage from "../TweetPage/Tweetpage";
export default function App({
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
}) {
  return (
    <div>
      <Home>
        {tweetFields && <TweetFields />}
        {profile && <Profile />}
        {explore && <Explore />}
        {notifications && <Notifications />}
        {messages && <Messages />}
        {lists && <Lists />}
        {bookmarks && <Bookmarks />}
        {communities && <Communities />}
        {hashtag && <Hashtag />}
        {showTweet && <Tweetpage />}
      </Home>
    </div>
  );
}
