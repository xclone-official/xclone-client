const TweetModel = require("../../Models/TweetModel/TweetModel");
const Router = require("express").Router();

Router.get("/", async (req, res) => {
  try {
    const getAllTweet = await TweetModel.find();
    if (getAllTweet) {
      return res.status(200).send({
        status: 1,
        msg: "Tweets found successfully.",
        tweet: getAllTweet,
      });
    } else {
      return res.status(200).send({
        status: 2,
        msg: "Error in finding Tweets.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: 4,
      msg: "Internal server error.",
    });
  }
});

module.exports = Router;
