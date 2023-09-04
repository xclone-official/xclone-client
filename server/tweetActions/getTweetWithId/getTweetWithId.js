const TweetModel = require("../../Models/TweetModel/TweetModel");
const mongoose = require("mongoose");
const Router = require("express").Router();

Router.get("/", (req, res) => {
  res.send({
    msg: "Success",
  });
});

Router.get("/:tweetId", async (req, res) => {
  try {
    const { tweetId } = req.params;
    if (tweetId) {
      const isValidObjectId = mongoose.Types.ObjectId.isValid(tweetId);
      if (isValidObjectId) {
        const getTweetById = await TweetModel.findById(tweetId);
        if (getTweetById) {
          res.status(200).send({
            status: 1,
            msg: "Tweet found successfully.",
            tweet: getTweetById,
          });
        } else {
          res.status(200).send({
            status: 2,
            msg: "We couldn't find the specific tweet. Maybe the id is incorrect or the tweet is deleted by the author.",
          });
        }
      } else {
        res.status(400).send({
          status: 3,
          msg: "Invalid tweet ID format.",
        });
      }
    } else {
      res.status(400).send({
        status: 3,
        msg: "Tweet ID can't be empty.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: 4,
      msg: "Internal server error.",
    });
  }
});

module.exports = Router;
