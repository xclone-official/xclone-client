const mongoose = require("mongoose");
const TweetModel = require("../../Models/TweetModel/TweetModel");
const UserModel = require("../../Models/UserModel/UserModel");
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

    // Like Tweet

    const isLikeExist = isTweetExist.likes.filter((e) => e.id === userId);
    if (isLikeExist.length === 1) {
      const toUnlike = isTweetExist.likes.filter((e) => e.id !== userId);
      isTweetExist.likes = toUnlike;
      await isTweetExist.save();

      const toRemoveLikedTweet = isUserExist.likedTweet.filter(
        (e) => e.tweetId !== tweetId
      );
      console.log("userId", userId);
      isUserExist.likedTweet = toRemoveLikedTweet;
      await isUserExist.save();

      return res.status(200).send({
        status: 1,
        msg: "Tweet Unliked Success",
        tweet: isTweetExist,
      });
    } else {
      return res.status(200).send({
        status: 5,
        msg: "Tweet Already Unlike",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 3,
      msg: "Internal server error.",
    });
  }
});

module.exports = Router;
