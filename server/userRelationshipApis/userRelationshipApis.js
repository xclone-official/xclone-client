const Router = require("express").Router();

Router.use("/follow", require("./followUser/followUser"));
Router.use("/unfollow", require("./unfollowUser/unfollowUser"));

module.exports = Router;
