const Router = require("express").Router();
const UserModel = require("../../Models/UserModel/UserModel");

Router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (userId) {
      const getUser = await UserModel.findById(userId);
      if (getUser) {
        return res.status(200).send({
          status: 0,
          msg: "User retrieved success",
          data: getUser,
        });
      }
      return res.status(200).send({
        status: 2,
        msg: "UserId or user doesn't existss",
        data: getUser,
      });
    }
    return res.status(200).send({
      status: 2,
      msg: "UserId or user doesn't existss",
      data: getUser,
    });
  } catch (error) {
    res.status(200).send({
      status: 4,
      msg: "Server error. Please try again later.",
    });
  }
});
module.exports = Router;
