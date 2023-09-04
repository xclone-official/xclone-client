const Router = require("express").Router();

Router.get("/", (req, res) => {
  res.send({
    msg: "Success",
  });
});

Router.use("/createtweet", require("./createTweet/createTweet"));
Router.use("/deletetweet", require("./deleteTweet/deleteTweet"));
Router.use("/getalltweet", require("./loadTweet/loadTweet"));
Router.use("/gettweetwithid", require("./getTweetWithId/getTweetWithId"));
Router.use("/updatetweet", require("./updateTweet/updateTweet"));

module.exports = Router;
