const mongoose = require("mongoose");
const TweetModel = require("../../Models/TweetModel/TweetModel");
const UserModel = require("../../Models/UserModel/UserModel");
const { users } = require("../../userStore");
const Router = require("express").Router();

Router.get("/", async (req, res) => {
  res.send({
    status: 3,
    msg: "Like Tweet Success",
  });
});

Router.put("/:tweetId/:userId", async (req, res) => {
  try {
    const { tweetId, userId } = req.params;
    // console.log("users", users);
    // users?.forEach((e) => {
    //   console.log("userdata", e);
    // });

    if (!tweetId || !userId) {
      return res.status(200).send({
        status: 2,
        msg: "TweetId or userID is empty.",
      });
    }

    // check if the object id is valid
    const isValidObjectId = mongoose.Types.ObjectId.isValid(tweetId);
    const isValidObjectIdUserId = mongoose.Types.ObjectId.isValid(userId);
    if (!isValidObjectId || !isValidObjectIdUserId) {
      return res.status(200).send({
        status: 6,
        msg: "UserId or TweetId is not valid.",
      });
    }

    // Check if user exist

    const isUserExist = await UserModel.findById(userId);
    if (!isUserExist) {
      return res.status(200).send({
        status: 4,
        msg: "We can't find the user.",
      });
    }

    const isTweetExist = await TweetModel.findById(tweetId);
    if (!isTweetExist) {
      return res.status(200).send({
        status: 4,
        msg: "We can't find the tweet.",
      });
    }

    // User required fields
    const likeJSON = {
      id: isUserExist._id,
    };
    // Like Tweet

    const tweetDetails = {
      authorId: isUserExist._id,
      tweetId: tweetId,
    };

    const isLikeExist = isTweetExist.likes.filter((e) => e.id === userId);
    if (isLikeExist.length === 0) {
      isTweetExist.likes.push(likeJSON);
      await isTweetExist.save();

      isUserExist?.likedTweet.push(tweetDetails);
      await isUserExist.save();
      return res.status(200).send({
        status: 1,
        msg: "Tweet Liked Success",
        data: likeJSON,
        tweet: isTweetExist,
      });
    } else {
      return res.status(200).send({
        status: 5,
        msg: "Tweet Already Liked",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 3,
      msg: "Internal server error.",
    });
  }
});

module.exports = Router;
