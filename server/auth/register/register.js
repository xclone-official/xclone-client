const Router = require("express").Router();
const UserModel = require("../../Models/UserModel/UserModel");
const { sendEmail } = require("../../emailType/emailType");
const upload = require("../../multer/profilepic");
require("dotenv").config();
function generateRandomNumber() {
  const length = 30;
  let result = "";

  // Generate random digits until the desired length is reached
  for (let i = 0; i < length; i++) {
    const randomDigit = Math.floor(Math.random() * 10); // Generates a random digit from 0 to 9
    result += randomDigit;
  }

  return result;
}

// Example usage:
const randomNum = generateRandomNumber();

Router.get("/", (req, res) => {
  res.send({
    msg: "Success",
  });
});
Router.post("/", upload.single("profilepic"), async (req, res) => {
  try {
    console.log(req.body);
    const {
      email,
      username,
      password,
      fullname,
      bio,
      location,
      website,
      dob,
      gender,
      language,
    } = req.body;
    // Check if email or username already exist
    const isUserExist = await UserModel.findOne({
      $or: [{ email }, { username }],
    });
    if (!isUserExist) {
      const user = await UserModel.create({
        fullname: fullname,
        email: email,
        username: username,
        password: password,
        profilepicture: req.file.path || [],
        coverpic: req.body.coverpic || "",
        bio: bio,
        location: location,
        website: website,
        dob: dob,
        gender: gender,
        language: language,
        isActivated: false,
        activateToken: randomNum,
      });
      sendEmail("account_activation", email, user.activateToken);
      res.status(200).send({
        status: 1,
        msg: "Account created successfully.",
      });
    } else if (isUserExist.email === email) {
      res.status(200).send({
        status: 0,
        msg: "Email already exists.",
      });
    } else {
      res.status(200).send({
        status: 2,
        msg: "Username already exists.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: 3,
      msg: "Server error. Please try again later.",
    });
  }
});

module.exports = Router;
