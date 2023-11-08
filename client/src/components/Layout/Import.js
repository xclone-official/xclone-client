import Home from "../Home/Home";
import TweetFields from "../TweetFields/TweetFields";
import ProfileLayout from "../Profile/ProfileLayout";
import Explore from "../Explore/Explore";
import Notifications from "../Notifications/Notifications";
import Lists from "../Lists/Lists";
import Bookmarks from "../Bookmarks/Booksmarks";
import Communities from "../Communities/Communities";
import Hashtag from "../Hashtag/Hashtag";
import PageNotFound from "../404/404";
import React, { useContext, useEffect, useState } from "react";
import Tweetpage from "../TweetPage/Tweetpage";
import Following from "../Following/Following";
import Foryou from "../TweetFields/Foryou/Foryou";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
import axios from "axios";
import ErrorPage from "../ErrorPage/ErrorPage";
import Editprofile from "../Editprofile/Editprofile";
import Replies from "../Replies/Replies";
import { TweetContext } from "../../useContext/TweetContext/TweetContext";
import LikedTweet from "../LikedTweet/LikedTweet";
import SingleMessagesBox from "../Messages/SingleMessagesBox";
import Messages from "../Messages/Messages";
import LikedUser from "../LikedUser/LikedUser";

import YourAccount from "../AllSettings/YourAccount";
import Account_info from "../AllSettings/Account_info/Account_info";
import ForgotPassword from "../AllSettings/ForgotPassword/ForgotPassword";
import UpdateUserName from "../AllSettings/UpdateUserName/UpdateUserName";
import UpdateEmail from "../AllSettings/UpdateEmail/UpdateEmail";
import UpdateProtectedTweets from "../AllSettings/UpdateProtectedTweets/UpdateProtectedTweets";
import UpdateCountry from "../AllSettings/UpdateCountry/UpdateCountry";
import UpdateLanguage from "../AllSettings/UpdateLanguage/UpdateLanguage";
import UpdateGender from "../AllSettings/UpdateGender/UpdateGender";
import UpdateBirthDate from "../AllSettings/UpdateBirthDate/UpdateBirthDate";
import UpdateName from "../AllSettings/UpdateName/UpdateName";
import DeactivateAcc from "../DeactivateAcc/DeactivateAcc";
export {
  React,
  useContext,
  useState,
  useEffect,
  UpdateBirthDate,
  UpdateCountry,
  UpdateEmail,
  UpdateGender,
  UpdateLanguage,
  UpdateName,
  UpdateProtectedTweets,
  DeactivateAcc,
  UpdateUserName,
  YourAccount,
  Account_info,
  ForgotPassword,
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
  PageNotFound,
};
