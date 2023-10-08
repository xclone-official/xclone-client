const Router = require("express").Router();
const UserModel = require("../../Models/UserModel/UserModel");
const TweetModel = require("../../Models/TweetModel/TweetModel");
Router.post("/:tweetId/:userId", async (req, res) => {
  try {
    const { tweetId, userId } = req.params;
    console.log("tweetId, userId", tweetId, userId);
    if (!tweetId || !userId) {
      return res.status(200).send({
        status: "2",
        msg: "UserId or TweetId is undefined",
      });
    }
    const isUserExist = await UserModel.findById(userId);
    const isTweetExist = await TweetModel.findById(tweetId);
    if (!isTweetExist || !isUserExist) {
      return res.status(200).send({
        status: "2",
        msg: "User or Tweet is undefinded",
      });
    }
    const isTweetBookMarkAlreadyExist = isUserExist.bookmark.some(
      (e) => e?._id === tweetId
    );
    isUserExist.bookmark.forEach((e) => {
      console.log(e);
      console.log(e === tweetId);
    });

    if (!isTweetBookMarkAlreadyExist) {
      await isUserExist.bookmark.push(isTweetExist);
      await isUserExist.save();
      return res.status(200).send({
        status: "1",
        msg: "Tweet saved successfully.",
      });
    }
    return res.status(200).send({
      status: "1",
      msg: "Tweet already saved.",
    });
  } catch (error) {
    res.status(500).send({
      status: 3,
      msg: "Internal server error.",
    });
    console.log(error);
  }
});
module.exports = Router;
