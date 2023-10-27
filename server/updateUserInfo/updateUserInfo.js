const Router = require("express").Router();

Router.use("/email", require("./updateEmail/updateEmail"));

Router.use("/name", require("./updateName/updateName"));

Router.use("/password", require("./updatePassword/updatePassword"));

Router.use("/username", require("./updateUsername/updateUsername"));

module.exports = Router;
