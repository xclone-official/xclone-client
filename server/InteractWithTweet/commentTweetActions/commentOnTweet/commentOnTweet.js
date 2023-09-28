const Router = require("express").Router();
const TweetModel = require("../../../Models/TweetModel/TweetModel");
const UserModel = require("../../../Models/UserModel/UserModel");

Router.post("/:tweetId", async (req, res) => {
  try {
    const { tweetId } = req.params;
    const { commentText, commentUserId } = req.body;
    console.log(tweetId);
    console.log(commentText, commentUserId);
    if (!commentUserId) {
      return res.status(200).send({
        status: 2,
        msg: "Username or Id is required.",
      });
    }

    if (!commentText) {
      return res.status(200).send({
        status: 4,
        msg: "Comment Text is required.",
      });
    }

    // To check if user id exist
    const isUserExist = await UserModel.findById(commentUserId);
    if (!isUserExist) {
      return res.status(200).send({
        satus: 5,
        msg: "User doesn't exist.",
      });
    }

    const commentUsername = await isUserExist.username;
    const commentUserProfile = await isUserExist.profilepicture;

    // Check if Tweet Id exist
    const isTweetExist = await TweetModel.findById(tweetId);
    if (!isUserExist || !isTweetExist) {
      return res.status(200).send({
        satus: 5,
        msg: "User or Tweet doesn't exist.",
      });
    }

    // Save the tweet
    const tweetData = {
      commentUsername: commentUsername,
      commentText: commentText,
      commentUserId: commentUserId,
      commentUserProfile: commentUserProfile,
      commentName: isUserExist.fullname,
      commenttime: Date.now(),
    };

    // const tweetCommentID = isTweetExist.comments.push(tweetData);
    isTweetExist.comments.push(tweetData);
    await isTweetExist.save();
    const allTweets = await TweetModel.find();
    res.status(200).send({
      status: 1,
      msg: "Comment saved success",
      isTweetExist: isTweetExist,
      allTweets: allTweets,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 3,
      msg: "Internal Server error",
    });
  }
});

module.exports = Router;
