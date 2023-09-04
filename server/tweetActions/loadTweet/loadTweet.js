const TweetModel = require("../../Models/TweetModel/TweetModel");
const Router = require("express").Router();

Router.get("/", async (req, res) => {
  try {
    const allTweets = await TweetModel.find();
    res.status(200).send({
      status: 1,
      msg: "Tweets retrieved successfully.",
      tweets: allTweets,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: 2,
      msg: "Internal server error.",
    });
  }
});

module.exports = Router;
