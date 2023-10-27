const Router = require("express").Router();
const UserModel = require("../../Models/UserModel/UserModel");
const bcrypt = require("bcryptjs");
Router.put("/:userId/:password", async (req, res) => {
  try {
    const { password, userId } = req.params;
    if (!password || !userId) {
      return res.status(300).send({
        status: 2,
        msg: "can't be blanks",
      });
    }
    const findUser = await UserModel.findById(userId);
    if (!findUser) {
      return res.status(301).send({
        status: 2,
        msg: "User doesn't exist",
      });
    }
    // Hash the password before updating
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.findByIdAndUpdate(
      { _id: userId },
      { password: hashedPassword }
    );
    const findUserAfterUpdate = await UserModel.findById(userId);
    return res.status(200).send({
      status: 1,
      msg: "Password updated successfully",
      data: findUserAfterUpdate,
    });
  } catch (error) {
    return res.status(500).send({
      status: 5,
      msg: "Internal server error",
    });
  }
});

module.exports = Router;
