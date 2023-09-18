const UserModel = require("../../Models/UserModel/UserModel");
const Router = require("express").Router();
// took 2 hours to debug this follow api
Router.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params; // other user id
    const { id } = req.body; //myid
    // console.log(id);
    if (!userId || !id) {
      return res.status(200).send({
        status: 2,
        msg: "UserId and ID can't be empty",
      });
    }

    const otherUserData = await UserModel.findById(userId);
    if (!otherUserData) {
      return res.status(200).send({
        status: 4,
        msg: "Other profile doesn't exists",
      });
    }
    const otherUserNecessaryData = {
      name: otherUserData.fullname,
      bio: otherUserData.bio,
      profile: otherUserData.profilepicture,
      username: otherUserData.username,
      id: otherUserData._id,
    };
    // console.log(otherUserData);
    const myProfile = await UserModel.findById(id);

    if (!myProfile) {
      return res.status(200).send({
        status: 4,
        msg: "My profile doesn't exists",
      });
    }

    const myProfileNecessaryData = {
      name: myProfile.fullname,
      bio: myProfile.bio,
      profile: myProfile.profilepicture,
      username: myProfile.username,
      id: myProfile._id,
    };
    // To follow
    const alreadyFollowingUsers = otherUserData.followers.filter(
      (e) => e.id === id
    );
    if (alreadyFollowingUsers.length === 0) {
      // User is not already following
      // Add the user to the following list

      otherUserData.followers.push(myProfileNecessaryData);
      await otherUserData.save();

      myProfile.following.push(otherUserNecessaryData);
      await myProfile.save();
      res.status(200).send({
        status: 1,
        msg: "Account followed successfully.",
        data: myProfile.following,
        data2: otherUserData.followers,
      });
    } else {
      // User is already following
      return res.status(200).send({
        status: 0,
        msg: "You are already following this user.",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 3,
      msg: "Internal server error.",
    });
  }
});

module.exports = Router;
