const Router = require("express").Router();

Router.use(
  "/getFollowingFromUserId",
  require("./getFollowingFromUserId/getFollowingFromUserId")
);
Router.use(
  "/getFollowersFromUserId",
  require("./getFollowersFromUserId/getFollowersFromUserId")
);

Router.use("/getAllBookmarkById", require("./getAllBookmark/getAllBookmark"));
module.exports = Router;
