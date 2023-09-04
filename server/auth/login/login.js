const Router = require("express").Router();
const bcrypt = require("bcryptjs");
const UserModel = require("../../Models/UserModel/UserModel");
Router.get("/", (req, res) => {
  res.send({
    msg: "Success",
  });
});

Router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    // console.log(username, password);
    const isUserExist = await UserModel.findOne({ username: username });
    if (isUserExist) {
      const isAccountActivated = await isUserExist.isActivated;
      if (isAccountActivated) {
        const userPassword = await isUserExist.password;
        const isPasswordMatched = await bcrypt.compare(password, userPassword);
        if (isPasswordMatched) {
          res.status(200).send({
            status: 1,
            msg: "Login Success.",
          });
        } else {
          res.status(302).send({
            status: 3,
            msg: "Invalid Credentials.",
          });
        }
      } else {
        res.status(302).send({
          status: 3,
          msg: "Your account is not activated. Please activate it before continuing.",
        });
      }
    } else {
      res.status(302).send({
        status: 3,
        msg: "Invalid Credentials.",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 3,
      msg: "Server error. Please try again later.",
    });
  }
});

module.exports = Router;
