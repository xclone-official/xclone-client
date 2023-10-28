const Router = require("express").Router();

Router.use("/email", require("./updateEmail/updateEmail"));

Router.use("/name", require("./updateName/updateName"));

Router.use("/password", require("./updatePassword/updatePassword"));

Router.use("/username", require("./updateUsername/updateUsername"));

Router.use("/phone", require("./updatePhone/updatePhone"));

Router.use(
  "/protected_tweets",
  require("./updateTweetsStatus/updateTweetsStatus")
);

module.exports = Router;
