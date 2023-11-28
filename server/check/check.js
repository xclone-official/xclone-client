const Router = require("express").Router();

Router.use("/password", require("./password/password"));

module.exports = Router;
