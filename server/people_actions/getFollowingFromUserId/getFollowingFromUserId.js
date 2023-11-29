const UserModel = require("../../Models/UserModel/UserModel");

const Router = require("express").Router();
Router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(200).send({
        msg: "username is empty!",
        status: 2,
      });
    }
    const isUserExist = await UserModel.findOne({ username: username });
    if (!isUserExist) {
      return res.status(200).send({
        msg: "User is empty!",
        status: 2,
      });
    }
    let allFollowings = [];
    await isUserExist.following.forEach((e) => allFollowings.push(e));
    return res.status(200).send({
      msg: "Following retrieved success",
      status: 1,
      following: allFollowings,
    });
  } catch (error) {
    return res.status(500).send({
      status: 3,
      msg: "Internal server error!",
    });
  }
});
module.exports = Router;
